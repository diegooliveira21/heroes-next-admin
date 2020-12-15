export function makeTimeNow(): string {
  const date = new Date();
  return date.toLocaleTimeString();
}
