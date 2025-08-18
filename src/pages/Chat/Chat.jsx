import React, { useEffect, useState } from "react";
import "./Chat.css";

const API = "https://chatify-api.up.railway.app";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const token = sessionStorage.getItem("jwt_token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API}/messages`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Misslyckades att hämta meddelanden");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;

    try {
      const res = await fetch(`${API}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, conversationId: null }),
      });
      if (!res.ok) throw new Error("Misslyckades att skicka meddelande");

      const data = await res.json();
      setMessages((prev) => [...prev, data.latestMessage]);
      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!id) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Misslyckades att ta bort meddelande");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">Chat</header>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <p className="message-text">{msg.text}</p>
              <button
                className="delete-btn"
                onClick={() => deleteMessage(msg.id)}
                disabled={deletingId === msg.id}
                aria-label="Ta bort meddelande"
              >
                {deletingId === msg.id ? "Raderar…" : "Radera"}
              </button>
            </div>
          ))}
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Skriv ett meddelande"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" disabled={!value.trim()}>
            Skicka
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
