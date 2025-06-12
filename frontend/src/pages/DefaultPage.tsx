import Header from "../blocks/Header";
import NavigationDrawer from "../blocks/NavigationDrawer";
import PostFeed from "../blocks/PostFeed";

function DefaultPage() {
  return (
    <>
      <Header />
      <div id="mainPage">
        <div>
          <NavigationDrawer />
        </div>
        <div>
            <PostFeed />
        </div>
        <div />
      </div>
    </>
  );
}

export default DefaultPage;
