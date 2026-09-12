// Unrelated module, used to prove the bot stays silent.
export function invoiceTotal(lines) {
  return lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
}
