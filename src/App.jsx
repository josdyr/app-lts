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

const App = () => {
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
