import { useState, useCallback } from "react";

/**
 * useChat - simple hook to manage messages and send user prompts to a backend
 * that proxies requests to Gemini (do NOT call Google APIs directly from the client).
 *
 * Usage:
 * const { messages, sendMessage, isLoading, error } = useChat();
 * sendMessage("Hello");
 */
export default function useChat({ endpoint = "/api/gemini" } = {}) {
  const [messages, setMessages] = useState([]); // { id, sender: 'user'|'bot', text }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text?.trim();
      if (!trimmed) return;

      const userMsg = { id: Date.now(), sender: "user", text: trimmed };
      setMessages((m) => [...m, userMsg]);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: trimmed }),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Network response was not ok");
        }

        const data = await res.json();

        // Expect backend to return a JSON like: { reply: "..." }
        // or { reply: [{ text: "..." }, ...] }
        let replyText = "";
        if (typeof data.reply === "string") replyText = data.reply;
        else if (Array.isArray(data.reply))
          replyText = data.reply.map((r) => r.text ?? "").join("\n");
        else replyText = data.reply?.text ?? "";

        const botMsg = {
          id: Date.now() + 1,
          sender: "bot",
          text: replyText || "Sorry, I couldn't generate a response.",
        };
        setMessages((m) => [...m, botMsg]);
      } catch (err) {
        setError(err?.message || "Error sending message");
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 2,
            sender: "bot",
            text: "Sorry, something went wrong.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { messages, sendMessage, isLoading, error, setMessages };
}
