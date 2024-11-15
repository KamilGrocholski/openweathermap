const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function formatDate(date?: number | Date): string {
  if (!date) {
    return "";
  }
  return dateFormatter.format(date);
}
