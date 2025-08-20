import React, { useEffect, useState } from "react";
import "./Chat.css";

const API = "https://chatify-api.up.railway.app";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const token = sessionStorage.getItem("jwt_token");

  console.log("meddelanden", messages);

  const [fakeChat, setFakeChat] = useState([
    {
      text: "Hej! Hur mår du?",
      avatar: "https://i.pravatar.cc/100?img=1",
      username: "Johnny",
      conversationId: null,
      createdAt: "2025-08-18T10:00:00.000Z",
    },
  ]);

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
      setMessages((prev) => [
        ...prev,
        {
          ...data.latestMessage,
          createdAt: new Date().toISOString(),
        },
      ]);
      setValue("");

      setTimeout(() => {
        const johnnyReplies = [
          "Nejmen vad fint",
          "det låter bra",
          "jaha, okej",
          "intressant",
          "jaha, vad spännande",
          "det är ju kul",
          "jaha, det var ju intressant",
          "vet du vad? Jag hpller med",
          "det var aldeles för länge sedan vi träffades",
        ];

        const RandomReply =
          johnnyReplies[Math.floor(Math.random() * johnnyReplies.length)];
        const reply = {
          text: RandomReply,
          avatar: "https://i.pravatar.cc/100?img=14",
          username: "Johnny",
          conversationId: null,
          createdAt: new Date(Date.now() + 2000).toISOString(),
        };
        setFakeChat((prev) => [...prev, reply]);
      }, 1500);
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
  const preparedFakeChat = fakeChat.map((msg, i) => ({
    ...msg,
    createdAt:
      msg.createdAt ||
      new Date(Date.now() - (fakeChat.length - i) * 1000 * 60).toISOString(),
  }));

  const allMessages = [...messages, ...preparedFakeChat].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="chat-page">
      <header className="chat-header">Chat</header>
      <div className="chat-container">
        <div className="chat-messages">
          {allMessages.map((msg, index) => {
            const isJohnny = msg.username === "Johnny";

            return (
              <div
                key={msg.id || index}
                className={`msg ${isJohnny ? "from-johnny" : "is-mine"}`}
              >
                <div className="bubble">
                  <p className="bubble-text">{msg.text}</p>
                  <div className="bubble-meta">
                    {!isJohnny && (
                      <button
                        className="bubble-delete"
                        onClick={() => deleteMessage(msg.id)}
                        aria-label="Ta bort meddelande"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
