import { env } from "cloudflare:workers";

const inbox = "info@easydesigntech.com";
const defaultSender = "EasyDesignTech Website <website@easydesigntech.com>";

type EmailBindings = {
  RESEND_API_KEY?: string;
  NOTIFICATION_FROM_EMAIL?: string;
};

type OwnerNotification = {
  subject: string;
  text: string;
  idempotencyKey: string;
  replyTo?: string;
};

type Delivery = OwnerNotification & { to: string };

async function deliver({ to, subject, text, idempotencyKey, replyTo }: Delivery) {
  const bindings = env as unknown as EmailBindings;
  const key = bindings.RESEND_API_KEY?.trim();
  if (!key) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: bindings.NOTIFICATION_FROM_EMAIL?.trim() || defaultSender,
        to: [to],
        subject: subject.replace(/[\r\n]+/g, " ").slice(0, 180),
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("Website email notification rejected", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Website email notification failed", error instanceof Error ? error.name : "unknown error");
    return false;
  }
}

export async function sendOwnerNotification(notification: OwnerNotification) {
  return deliver({ ...notification, to: inbox });
}

export async function sendSupportReply({ to, name, body, threadId, messageId }: {
  to: string;
  name: string;
  body: string;
  threadId: number;
  messageId: number;
}) {
  return deliver({
    to,
    subject: `A reply from EasyDesignTech | Conversation #${threadId}`,
    text: `Hello ${name || "there"},\n\nOur team replied to your website chat:\n\n${body}\n\nYou can reply to this email to continue the conversation.\n\nEasyDesignTech\n${inbox}`,
    replyTo: inbox,
    idempotencyKey: `support-reply-${messageId}`,
  });
}

export async function sendCustomerAcknowledgement({ to, name, kind, idempotencyKey }: {
  to: string;
  name: string;
  kind: "enquiry" | "quote" | "chat";
  idempotencyKey: string;
}) {
  const subject = kind === "quote" ? "We received your quote request" : kind === "chat" ? "We received your chat details" : "We received your enquiry";
  const what = kind === "quote" ? "quote request" : kind === "chat" ? "chat and contact details" : "enquiry";
  return deliver({
    to,
    subject: `${subject} | EasyDesignTech`,
    text: `Hello ${name || "there"},\n\nThank you for contacting EasyDesignTech. We received your ${what}. Our team will review it and follow up using the details you provided.\n\nYou can reply to this email if you want to add anything else.\n\nEasyDesignTech\n${inbox}`,
    replyTo: inbox,
    idempotencyKey,
  });
}
