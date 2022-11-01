const convertDate = (date: string) => {
  return date.split("-").join("");
};

export const saveICS = (start: string, end?: string, summary?: string) => {
  let icsFile = null;
  var event =
    "BEGIN:VCALENDAR\n" +
    "CALSCALE:GREGORIAN\n" +
    "METHOD:PUBLISH\n" +
    "PRODID:-//Test Cal//EN\n" +
    "VERSION:2.0\n" +
    "BEGIN:VEVENT\n" +
    "UID:test-1\n" +
    "DTSTART;VALUE=DATE:" +
    convertDate(start) +
    "\n" +
    "DTEND;VALUE=DATE:" +
    (end && convertDate(end)) +
    "\n" +
    "SUMMARY:" +
    summary +
    "\n" +
    "DESCRIPTION:" +
    "\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  var data = new File([event], "event", { type: "text/plain" });

  if (icsFile !== null) {
    window.URL.revokeObjectURL(icsFile);
  }

  icsFile = window.URL.createObjectURL(data);

  return icsFile;
};
