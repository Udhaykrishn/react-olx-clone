import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import ItemDetails from "./pages/ItemDetails/Items"
import Login from "./pages/Login/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< Login />} />
        <Route path="/details" element={<ItemDetails />} />
      </Routes>
    </>
  )
}

export default App
