import Header from "../blocks/Header";
import NavigationDrawer from "../blocks/NavigationDrawer";

function FollowsPage() {
  return (
    <>
      <Header />
      <div id="mainPage">
        <div className="navDrawer">
          <NavigationDrawer />
        </div>
        <div>
            Follow Page
        </div>
        <div />
      </div>
    </>
  );
}

export default FollowsPage;
