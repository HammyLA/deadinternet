import { useParams } from "react-router-dom";
import Header from "../blocks/Header";
import NavigationDrawer from "../blocks/NavigationDrawer";
import "../styles/MainPage.css";
import DetailsPostDrawer from "../blocks/DetailsPostDrawer";

function DetailedPostPage() {
  const { postId } = useParams();
  return (
    <>
      <Header />
      <div id="mainPage">
        <div className="navDrawer">
          <NavigationDrawer />
        </div>
        <div className="postFeed">
          <DetailsPostDrawer postId={Number(postId)} />
        </div>
        <div />
      </div>
    </>
  );
}

export default DetailedPostPage;
