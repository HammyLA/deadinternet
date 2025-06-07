import "./App.css";
import Header from "./blocks/Header";
import PostsPage from "./pages/PostsPage";
import NavigationDrawer from "./blocks/NavigationDrawer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div id="mainPage">
        <div />
        <div>
          <NavigationDrawer />
        </div>
        <Routes>
          <Route path="/" element={<PostsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
