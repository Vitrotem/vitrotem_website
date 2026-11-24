"use client";

import { useState } from "react";

export default function ContactForm({
  submitLabel = "Send message",
  fields = ["name", "email", "message"],
  note = "This demo form opens your email client. On production it would submit to VitroTEM.",
}) {
  const [status, setStatus] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "I would like more information.";
    const subject = encodeURIComponent(`VitroTEM inquiry from ${name || email}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    setStatus("Opening your email client…");
    window.location.href = `mailto:bhardwaj@vitrotem.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="site-form" onSubmit={onSubmit}>
      {fields.includes("name") ? (
        <label>
          Your Name
          <input name="name" type="text" placeholder="Your Name" required />
        </label>
      ) : null}
      {fields.includes("email") ? (
        <label>
          Your E-mail
          <input name="email" type="email" placeholder="Your E-mail" required />
        </label>
      ) : null}
      {fields.includes("message") ? (
        <label>
          Message
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your project"
          />
        </label>
      ) : null}
      <button className="btn btn-primary" type="submit">
        {submitLabel}
      </button>
      {status ? <p className="form-status">{status}</p> : null}
      <p className="form-note">{note}</p>
    </form>
  );
}
