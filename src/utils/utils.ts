export function to_string_date(unix_time?: number): string {
  if (!unix_time) {
    return "";
  }

  const date = new Date(unix_time * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
