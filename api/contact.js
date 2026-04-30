module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email = "", message = "" } = req.body || {};

    if (!email.trim() || !message.trim()) {
      return res.status(400).json({ success: false, message: "Email and message are required." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "ignanaseelan04@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!resendApiKey) {
      return res.status(500).json({
        success: false,
        message: "Contact service is not configured yet.",
      });
    }

    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "New Portfolio Contact Form Message",
        reply_to: email.trim(),
        text: `From: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return res.status(502).json({
        success: false,
        message: data?.message || "Email provider request failed.",
      });
    }

    return res.status(200).json({ success: true, message: "Message sent." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while sending message." });
  }
};
