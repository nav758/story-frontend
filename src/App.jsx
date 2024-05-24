import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingedIn from "./pages/SingedIn";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddStory from "./pages/AddStory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/updateStory" element={<AddStory />}/>
        <Route path="/singedIn" element={<ProtectedRoute Component={SingedIn}/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
