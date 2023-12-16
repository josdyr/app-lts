import { useEffect, useState } from "react";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import WebSocket from "ws";

export const useWebSocket = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const hub = "pubsub";
    const service = new WebPubSubServiceClient(
      process.env.REACT_APP_WEBPUBSUB_CONNECTION_STRING,
      hub
    );

    const connectWebSocket = async () => {
      const token = await service.getClientAccessToken();
      const ws = new WebSocket(token.url);

      ws.on("open", () => console.log("connected"));
      ws.on("message", (data) => {
        console.log("Message received: %s", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      ws.on("close", () => console.log("disconnected"));

      return () => ws.close();
    };

    const cleanUp = connectWebSocket();

    return cleanUp; // This is the cleanup function in useEffect
  }, []);

  return messages;
};
