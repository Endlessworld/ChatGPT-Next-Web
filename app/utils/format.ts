export function prettyObject(msg: any) {
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ");
  }
  const prettyMsg = ["\n```json", msg, "\n```"].join("\n");
  return prettyMsg;
}
