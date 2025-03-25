import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./page/homepage/Home.page";
import { UserPost } from "./page/userPost/UserPost.page";
import CreateTodo from "./page/createTodo/CreateTodo.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPost />} />
        <Route path="/user/:userId/createTodo" element={<CreateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
