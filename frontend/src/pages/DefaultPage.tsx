import Header from "../blocks/Header";
import NavigationDrawer from "../blocks/NavigationDrawer";
import PostFeed from "../blocks/PostFeed";
import "../styles/MainPage.css";

function DefaultPage() {
  return (
    <>
      <Header />
      <div id="mainPage">
        <div className="navDrawer">
          <NavigationDrawer />
        </div>
        <div className="postFeed">
          <PostFeed />
        </div>
        <div />
      </div>
    </>
  );
}

export default DefaultPage;
