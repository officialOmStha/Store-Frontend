import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Login from "./components/Login";
import Protected from "./components/Protected";
import PrivateRout from "./components/PrivateRout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add"
            element={
              <PrivateRout>
                <Add />
              </PrivateRout>
            }
          />
          <Route
            path="/protected"
            element={
              <PrivateRout>
                <Protected />
              </PrivateRout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
