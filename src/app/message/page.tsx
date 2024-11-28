"use client";
import { useEffect, useState } from "react";

const MessagePage = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");
    eventSource.addEventListener("message", (event) =>
      setMessages(p=>[...p, JSON.parse(event.data).message])
    );
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="flex items-center justify-start flex-col w-full gap-3">
      <h1>Messages:</h1>
      {messages.map((i, idx) => (
        <div className="flex items-center justify-center gap-2" key={idx}>
          <span>{new Date().getTime()}</span>
          {i}
        </div>
      ))}
    </div>
  );
};

export default MessagePage;
