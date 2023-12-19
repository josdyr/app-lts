import React from "react";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    // debugger;
    // Instantiates the client object
    const client = new WebPubSubClient(
      "wss://wps-communication.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHMtY29tbXVuaWNhdGlvbi53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTcwMjkwMzYyNCwiZXhwIjoxNzAyOTkwMDI0fQ.cnFhErX7WQC9x95hSKTSjA9Ofb6xbM410UKeco-x3v8"
    );
    (async () => {
      // Starts the client connection with your Web PubSub resource
      await client.start();

      client.on("server-message", (e) => {
        console.log(`Received message: ${e.message.data}`);
        // fetch or receive a JSON and add dynamically to table
      });

      client.on("connected", (e) => {
        console.log(`Connection ${e.connectionId} is connected.`);
      });

      client.on("disconnected", (e) => {
        console.log(`Connection disconnected: ${e.message}`);
      });
    })();

    return () => {
      client.stop();
    };
  });

  return <div className="appContainer">Home</div>;
};
