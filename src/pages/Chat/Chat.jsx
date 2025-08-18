import React, { useEffect, useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("https://chatify-api.up.railway.app/messages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
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
  }, []);

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
        <input type="text" />
        <button type="submit">Send</button>
      </div>
    </div>
  );
};

export default Chat;
