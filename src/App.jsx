import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import TeslaCars from "./components/TeslaCars";
import CityCodes from "./components/CityCodes";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { ObjectDetail } from "./components/ObjectDetail";
import { Create } from "./components/Create";
import { CreateNew } from "./components/CreateNew";
import { LogIn } from "./components/LogIn";
import { LogOut } from "./components/LogOut";

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
        {/* <Route path="tesla-cars/:id" element={<ObjectDetail />} /> */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="create" element={<Create />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
