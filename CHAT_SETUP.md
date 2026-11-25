# Live website chat

The website chat runs Gemini 3.5 Flash Lite from the server. It answers from EasyDesignTech's published services, business descriptions, indicative prices and pricing FAQs. Unknown or individual questions, provider usage limits, and provider outages switch to the contact form. Form name, email and message are saved in the private Studio and never included in a Gemini request.

## Gemini secret

1. In Google AI Studio, revoke any API key that has been pasted into a chat, issue, repository or other shared place. Create a new Gemini API key for the website.
2. Set `GEMINI_API_KEY` as a secret in the deployed Site environment. Do not commit the key or put it in client code.
3. Deploy the latest saved Site version after updating the secret. A key alone does not prove the model and quota work; use the live checks below.

## Live checks

1. In a fresh browser session, ask the chat: "Can I combine website and branding services?" Confirm it answers from the published FAQ and remains open for another question.
2. Ask for a personal account detail or a firm custom quote. Confirm the chat offers the contact form with required name, email and message fields.
3. Submit the form from an email account you control. Confirm the details appear in the private Studio under both chats and incoming messages. Once Resend is configured, confirm `info@easydesigntech.com` receives the enquiry and the visitor receives an acknowledgement.
4. Reply in the Studio. Confirm the visitor gets the reply in the chat and by email when email delivery is configured.
5. Check Google AI Studio usage and limits after the test. Provider rate errors switch to the contact form.

The form route does not call Gemini. The chat also routes messages containing an email address or phone number to the form instead of sending them to Gemini. Avoid entering private details in ordinary chat questions.
