import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Add from "./components/Add"
import Login from "./components/Login"
import Protected from "./components/Protected"

function App() { 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
