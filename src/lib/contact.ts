export const CONTACT_EMAIL = "hello@spectrumtotalsolutions.com";

/** Optional Cal.com (or compatible) booking URL. Set via VITE_CAL_URL. */
export const CAL_URL = (import.meta.env.VITE_CAL_URL as string | undefined)?.trim() || "";

export function mailtoFor(type: "demo" | "appointment" | "enquiry", showcaseTitle?: string) {
  const subject =
    type === "enquiry"
      ? showcaseTitle
        ? `Enquiry — ${showcaseTitle}`
        : "Enquiry — Spectrum Total Solutions"
      : type === "demo"
        ? showcaseTitle
          ? `Demo request — ${showcaseTitle}`
          : "Demo request — Spectrum Total Solutions"
        : showcaseTitle
          ? `Appointment request — ${showcaseTitle}`
          : "Appointment request — Spectrum Total Solutions";

  const bodyLines =
    type === "enquiry"
      ? [
          "Hello Spectrum team,",
          "",
          `I have an enquiry${showcaseTitle ? ` related to: ${showcaseTitle}` : ""}.`,
          "",
          "Company:",
          "Name:",
          "Message:",
        ]
      : type === "demo"
        ? [
            "Hello Spectrum team,",
            "",
            `I would like to request a demo${showcaseTitle ? ` related to: ${showcaseTitle}` : ""}.`,
            "",
            "Company:",
            "Name:",
            "Preferred time:",
          ]
        : [
            "Hello Spectrum team,",
            "",
            `I would like to book an appointment${showcaseTitle ? ` related to: ${showcaseTitle}` : ""}.`,
            "",
            "Company:",
            "Name:",
            "Preferred date/time:",
            "Meeting preference (Hong Kong / online):",
          ];

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

export function bookingHref(showcaseTitle?: string) {
  if (CAL_URL) {
    const url = new URL(CAL_URL);
    if (showcaseTitle) url.searchParams.set("showcase", showcaseTitle);
    return url.toString();
  }
  return mailtoFor("appointment", showcaseTitle);
}
