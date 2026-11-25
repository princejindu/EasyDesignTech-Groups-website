# Website email setup

The contact and quote forms and the chat save messages in the private Studio. To also send owner notifications, visitor acknowledgements, and Studio replies by email, configure the transactional sending service below.

## Sending domain

1. Create a Resend account and add `easydesigntech.com` as a sending domain.
2. Copy the sending DNS records shown by Resend into the DNS zone that currently controls `easydesigntech.com`. If Namecheap manages DNS, use Domain List, Manage, Advanced DNS. If the domain uses other nameservers, update records at that DNS provider.
3. Verify the domain in Resend. Keep the existing Namecheap mailbox and its inbound MX records in place. Do not enable Resend receiving or replace the root domain MX record.
4. Create a Resend API key with sending permission. Keep the key private.

## Site secret

Set `RESEND_API_KEY` as a **secret** in the deployed Site environment, then deploy the latest saved Site version so the Worker receives it. Never commit this key to GitHub or paste it into a public issue.

The default sender is `EasyDesignTech Website <website@easydesigntech.com>`. Optionally set `NOTIFICATION_FROM_EMAIL` to another address on the verified sending domain, such as `EasyDesignTech <notifications@easydesigntech.com>`. The existing `info@easydesigntech.com` mailbox remains the owner inbox and reply address. A sending address does not require a second mailbox.

## Test

1. From an email account you control, submit one contact enquiry and one quote request. Confirm that `info@easydesigntech.com` receives both details and the sender receives one acknowledgement for each.
2. Open a fresh visitor chat, send a message, and leave an email address. Confirm the handoff and contact details arrive at `info@easydesigntech.com`, and the visitor gets an acknowledgement.
3. Reply to the chat in the private Studio. Confirm the visitor sees it in the chat and receives the same reply by email.
4. Check the Studio email status banner and the provider delivery log. The banner only confirms that a key is present. Actual delivery requires a verified domain, valid key, and a successful test.

If email delivery fails, enquiries and chats remain in the Studio. The public form says the request was received only after it has been stored, and does not claim an email was delivered.
