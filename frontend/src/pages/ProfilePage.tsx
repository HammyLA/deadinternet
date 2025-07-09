import { useParams } from "react-router-dom";
import Header from "../blocks/Header";
import NavigationDrawer from "../blocks/NavigationDrawer";
import Profile from "../blocks/Profile";

function ProfilePage() {
  const { userId } = useParams();
  return (
    <>
      <Header />
      <div id="mainPage">
        <div className="navDrawer">
          <NavigationDrawer />
        </div>
        <div className="postFeed">
          <Profile userId={Number(userId)} />
        </div>
        <div />
      </div>
    </>
  );
}

export default ProfilePage;
