import React from "react";

const Chat = () => {
  return (
    <div className="chat-page">
      <header className="chat-header">Chat</header>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="message">Hello!</div>
          <div className="message">Hi there!</div>
        </div>
        <input type="text" />
        <button type="submit">Send</button>
      </div>
    </div>
  );
};

export default Chat;
