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

    const upstream = await fetch("https://formsubmit.co/ajax/ignanaseelan04@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        message: message.trim(),
        _subject: "New Portfolio Contact Form Message",
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await upstream.json().catch(() => ({}));

    const ok = upstream.ok && (data?.success === true || data?.success === "true");

    if (!ok) {
      return res.status(502).json({
        success: false,
        message: "Upstream form service failed.",
      });
    }

    return res.status(200).json({ success: true, message: "Message sent." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while sending message." });
  }
};
