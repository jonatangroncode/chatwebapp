import React, { useEffect, useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const token = sessionStorage.getItem("jwt_token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("https://chatify-api.up.railway.app/messages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Misslyckades att hämta meddelanden");
        }

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
    if (!value.trim()) return;

    try {
      const res = await fetch("https://chatify-api.up.railway.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: value }),
      });

      if (!res.ok) {
        throw new Error("Misslyckades att skicka meddelande");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data.latestMessage]);
      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(messages);
  return (
    <div className="chat-page">
      <header className="chat-header">Chat</header>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={sendMessage}>
          {" "}
          <input
            type="text"
            placeholder="Skriv ett meddelande"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Skicka</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
