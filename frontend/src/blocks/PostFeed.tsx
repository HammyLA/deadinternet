import PostCard from "../components/PostCard";
import { testPosts } from "../tests/testPosts";
import type { Post } from "../utility/types";
import PostEntry from "./PostEntry";
import '../styles/postpage/PostFeed.css'

function PostFeed() {
  return (
    <>
      <div className="postFeed">
        <PostEntry />
        <h1 style={{textAlign: 'left', margin: '10px 30px'}}>
          For You
        </h1>
        <div>
          {testPosts.map((post: Post) => {return <PostCard username={post.username} content={post.content} boops={post.boops} views={post.views} comments={post.comments} />})}
        </div>
      </div>
    </>
  );
}

export default PostFeed;
