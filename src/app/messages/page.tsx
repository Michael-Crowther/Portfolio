"use client";
import { useState } from "react";

type MessageInterfaceType = {
  username: string;
};

export default function MessageInterface({ username }: MessageInterfaceType) {
  const [conversation, setConversation] = useState([
    { role: "system", content: "You are ChatGPT, a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Update conversation with user's message
    const newConversation = [...conversation, { role: "user", content: input }];
    setConversation(newConversation);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newConversation }),
      });
      const data = await res.json();
      if (data.reply) {
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: data.reply.content },
        ]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <p>Chatting with {username}</p>
      <div className="conversation">
        {conversation.map((msg, idx) => (
          <div key={idx} className={msg.role}>
            <strong>{msg.role === "user" ? "You" : "ChatGPT"}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
