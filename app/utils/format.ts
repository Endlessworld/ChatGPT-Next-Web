export function prettyObject(msg: any) {
  const prettyMsg = [
    "\n```json\n",
    JSON.stringify(msg, null, "  "),
    "\n```",
  ].join("");
  return prettyMsg;
}
