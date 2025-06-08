import PostCard from "../components/PostCard";
import { testPosts } from "../tests/testPosts";
import { generateResponse } from "../utility/generationAPICalls";
import type { Post } from "../utility/types";

function PostFeed() {
  return (
    <>
      <div>
        <div className="card">
          <form onSubmit={generateResponse}>
            <input
              type="text"
              name="input"
              placeholder="Enter your prompt here"
            />
            <button type="submit" name="submit">
              Generate
            </button>
          </form>
        </div>
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
