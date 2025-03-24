import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./page/homepage/Home.page";
import { UserPost } from "./page/userPost/UserPost.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
