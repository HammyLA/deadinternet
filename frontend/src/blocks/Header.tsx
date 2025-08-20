import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../styles/header/Header.css";
import { generateReply, generateResponse } from "../utility/generationAPICalls";
import { generateUser } from "../utility/usersAPI";

function Header() {
  const navigate = useNavigate();

  function postGeneration () {
    let weight = Math.random() * 100;
    if (weight <= 30) {
      generateResponse();
    }
    else {
      generateReply();
    }
  }

  return (
    <>
      <div className="header">
        <Link to={'/'}>
          <div className="title">
            <img src="/DeadInternetIcon.svg" />
            <h1 className="titleText">DeadInternet</h1>
          </div>
        </Link>
        <SearchBar />
        <div className="headerBtns">
          <button onClick={() => generateUser()}>+ User</button>
          <button onClick={() => postGeneration()}>+ Post</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Header;
