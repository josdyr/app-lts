import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import TeslaCars from "./components/TeslaCars";
import CityCodes from "./components/CityCodes";
import Comment from "./components/Comment";
import { CommentDetail } from "./components/CommentDetail";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { ObjectDetail } from "./components/ObjectDetail";
import { CreateNew } from "./components/CreateNew";
import { CreateNewComment } from "./components/CreateNewComment";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // debugger;
    // Instantiates the client object
    const client = new WebPubSubClient(
      "wss://wps-communication.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly93cHMtY29tbXVuaWNhdGlvbi53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTcwMjk5NTA2NiwiZXhwIjoxNzAzMDgxNDY2fQ.gc_aP-2f4N9qXXySvR8eDsjbCs5rd1yroCpfHStP7j8"
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tesla-cars" element={<TeslaCars />} />
        <Route path="tesla-cars/:id" element={<ObjectDetail />} />
        <Route path="tesla-cars/create-new" element={<CreateNew />} />
        <Route path="cityitems" element={<CityCodes />} />
        <Route path="comment" element={<Comment />} />
        <Route path="comment/:id" element={<CommentDetail />} />
        <Route
          path="comment/create-new-comment"
          element={<CreateNewComment />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
