import { database } from "@/db/site-data";
import { serviceForPackage } from "@/lib/quote";
import { sendCustomerAcknowledgement, sendOwnerNotification } from "@/lib/email-notifications";

const allowedInterests = new Set(["Web and apps", "Branding and design", "Social media and content", "AI automation and data", "Easylink eSIM", "EasyLink Flex", "EasyProperties", "eChat", "Something else"]);

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin" }, { status: 403 });
    if (!(request.headers.get("content-type") || "").includes("application/json")) return Response.json({ error: "Invalid format" }, { status: 415 });
    const raw = await request.text();
    if (raw.length > 10000) return Response.json({ error: "Message is too long" }, { status: 413 });
    const data = JSON.parse(raw);
    if (data.website) return Response.json({ ok: true });
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();
    const interest = String(data.interest || "").trim();
    const message = String(data.message || "").trim();
    const quoteType = String(data.quoteType || "general");
    const packageName = String(data.packageName || "").trim();
    const timeline = String(data.timeline || "").trim();
    const budget = String(data.budget || "").trim();
    const packageInterest = packageName ? serviceForPackage(packageName) : undefined;
    if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 50 || !allowedInterests.has(interest) || message.length < 15 || message.length > 3800 || !["general", "tailored"].includes(quoteType) || (packageName && (quoteType !== "tailored" || !packageInterest || packageInterest !== interest)) || timeline.length > 100 || budget.length > 100 || data.consent !== true) {
      return Response.json({ error: "Please check the form and try again" }, { status: 400 });
    }
    const storedMessage = quoteType === "tailored"
      ? `TAILORED QUOTE REQUEST\nService: ${interest}${packageName ? `\nPackage: ${packageName}` : ""}${timeline ? `\nTimeline: ${timeline}` : ""}${budget ? `\nBudget: ${budget}` : ""}\n\n${message}`
      : message;
    const db = database();
    const recent = await db.prepare("SELECT id FROM enquiries WHERE email = ? AND created_at > datetime('now', '-2 minutes') LIMIT 1").bind(email).first();
    if (recent) return Response.json({ error: "Please wait a moment before sending another enquiry" }, { status: 429 });
    const saved = await db.prepare("INSERT INTO enquiries (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)").bind(name, email, phone, interest, storedMessage).run();
    const enquiryId = Number(saved.meta.last_row_id);
    await Promise.all([sendOwnerNotification({
      subject: `${quoteType === "tailored" ? "Quote request" : "New enquiry"}: ${interest}`,
      text: [
        `New EasyDesignTech website enquiry #${enquiryId}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone or WhatsApp: ${phone || "Not provided"}`,
        `Service or business: ${interest}`,
        `Request type: ${quoteType === "tailored" ? "Tailored quote" : "General enquiry"}`,
        "",
        "Message:",
        storedMessage,
        "",
        `Review in your private Studio: ${new URL("/studio", request.url)}`,
        `Reply to this email to contact ${email}.`,
      ].join("\n"),
      replyTo: email,
      idempotencyKey: `enquiry-${enquiryId}`,
    }), sendCustomerAcknowledgement({
      to: email,
      name,
      kind: quoteType === "tailored" ? "quote" : "enquiry",
      idempotencyKey: `enquiry-ack-${enquiryId}`,
    })]);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return Response.json({ error: "We could not save your message. Please try email or WhatsApp." }, { status: 503 });
  }
}
