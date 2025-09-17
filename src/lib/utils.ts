/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/telegram.ts
export async function sendTelegramMessage(
  text: string,
  reply_markup: any = {},
  chatId: number | string = -1002678298045,
) {
  const BOT_TOKEN = "8486418181:AAHoVP7pzdWvUuqld0o0YCfAn4ephqT0Mx0";

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_markup,
        parse_mode: "HTML",
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Telegram error: ${JSON.stringify(err)}`);
  }

  return res.json();
}
