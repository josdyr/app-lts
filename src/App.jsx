import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import TeslaCars from "./components/TeslaCars";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { ObjectDetail } from "./components/ObjectDetail";
import { Users } from "./components/Users";
import { UserDetails } from "./components/UserDetails";
import { Admin } from "./components/Admin";
import { Create } from "./components/Create";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="tesla-cars" element={<TeslaCars />} />
        <Route path="tesla-cars/:id" element={<ObjectDetail />} />
        <Route path="create" element={<Create />} />
        {/* <Route path="users" element={<Users />}>
          <Route path=":userId" element={<UserDetails />} />
          <Route path="admin" element={<Admin />} />
        </Route> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
