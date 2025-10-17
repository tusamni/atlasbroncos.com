import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { siteConfig } from "@/config";
import { cosmic } from "@/library/cosmic"

export const server = {
	contact: defineAction({
		accept: "form",
		input: z.object({
			name: z.string(),
			email: z.string().email(),
			phone: z.string().optional(),
			zip: z.string().optional(),
			message: z.string().optional(),
			path: z.string(),
			marketing: z.string().optional()
		}),
		handler: async (input) => {
			console.log("got into handler")

			// check for zip code honeypot
			if (input.zip) {
				throw new ActionError({
					code: "SPAM_ERROR",
					message: "There's been an error. Please try again later.",
				});
			}

			// get todays date
			// format for insert into Cosmic CMS
			let date = new Date();
			const dateOffset = date.getTimezoneOffset();
			date = new Date(date.getTime() - dateOffset * 60 * 1000);
			const dateFormat = date.toISOString().split("T")[0];

			// insert record to db
			try {
				await cosmic.objects.insertOne({
					type: "leads",
					title: input.name,
					metadata: {
						date: dateFormat,
						email: input.email,
						phone: input.phone,
						message: input.message,
						marketing: {
							path: input.path,
							query: input.marketing
						},
					},
				});
			} catch (error) {
				console.error(error);
			}

			// new instance of mailersend
			const mailerSend = new MailerSend({
				apiKey: import.meta.env.MAILERSEND_TOKEN,
			});
			const sentFrom = new Sender(siteConfig.email.base, siteConfig.name);

			// set personalization variables
			const leadSubject = `New Lead from atlasbroncos.com - ${input.name}`;
			const leadRecipients = [new Recipient(siteConfig.email.base, siteConfig.name)];
			const leadBcc = [new Recipient("erik@eriksolsen.com", "Erik Olsen")];
			const leadReplyTo = new Sender(input.email, input.name);
			const leadPersonalization = [
				{
					email: siteConfig.email.base,
					data: {
						name: input.name,
						email: input.email,
						phone: input.phone,
						message: input.message,
						path: input.path,
						marketing: input.marketing
					},
				},
			];
			const leadParams = new EmailParams().setFrom(sentFrom).setTo(leadRecipients).setBcc(leadBcc).setReplyTo(leadReplyTo).setSubject(leadSubject).setPersonalization(leadPersonalization).setTemplateId("3zxk54v15mz4jy6v");

			// send the contact email
			await mailerSend.email.send(leadParams).then((response) => console.log(response.body)).catch((error) => console.error(error));

			const thanksSubject = `Thanks ${input.name}, We've Received Your Message!`;
			const thanksRecipients = [new Recipient(input.email, input.name)];
			const thanksReplyTo = new Sender(siteConfig.email.base, siteConfig.name);
			const thanksPersonalization = [
				{
					email: input.email,
					data: {
						name: input.name
					}
				}
			]
			const thanksParams = new EmailParams().setFrom(sentFrom).setTo(thanksRecipients).setReplyTo(thanksReplyTo).setSubject(thanksSubject).setPersonalization(thanksPersonalization).setTemplateId("z3m5jgrym9d4dpyo");

			// send the thanks email
			try {
				await mailerSend.email.send(thanksParams);
				console.log("thanks email sent");
			} catch (error) {
				console.error(error);
			}
		}
	})
}