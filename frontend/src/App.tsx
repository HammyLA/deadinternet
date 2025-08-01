import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import LoginPage from "./pages/LoginPage";
import DetailedPostPage from "./pages/DetailedPostPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/replies/:postId" element={<DetailedPostPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
