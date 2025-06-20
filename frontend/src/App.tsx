import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import LoginPage from "./pages/LoginPage";
import DetailedPostPage from "./pages/DetailedPostPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/replies/:postId" element={<DetailedPostPage />} />
      </Routes>
    </>
  );
}

export default App;
