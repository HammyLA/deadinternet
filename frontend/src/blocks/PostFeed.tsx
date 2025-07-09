import PostCard from "../components/PostCard";
import type { Post } from "../utility/types";
import PostEntry from "./PostEntry";
import "../styles/postpage/PostFeed.css";
import { useEffect, useState } from "react";
import { getPosts } from "../utility/postsAPI";
import { CircularProgress } from "@mui/material";
import LoadMoreBtn from "../components/LoadMoreBtn";

function PostFeed() {
  const [postsCount, setPostsCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postList.length === 0) {
      setIsLoading(true);
      async function fetchData() {
        const data = await getPosts(postsCount);
        setPostList(data);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [postsCount]);

  async function loadMorePosts() {
    setSkipCount(skipCount + postsCount);
    const data = await getPosts(postsCount, skipCount + postsCount);
    const newList = postList.concat(data);
    if (postList.length == newList.length) {
      const loadbuttonContainer = document.querySelector(".loadMoreButton")!;
      loadbuttonContainer.innerHTML = "<p>No more posts to load...<p>";
    } else {
      setPostList(newList);
    }
  }

  if (isLoading) {
    return (
      <div className="postFeed">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <div className="postFeed">
          <PostEntry
            placeholder="I'm thinking about. . ."
            header="What are you thinking about?"
          />
          <h2 style={{ textAlign: "left", margin: "10px 30px" }}>For You</h2>
          <div>
            {postList.map((post: Post) => {
              return (
                <PostCard
                  author={post.author}
                  content={post.content}
                  boops={post.boops}
                  views={post.views}
                  id={post.id}
                  authorId={post.authorId}
                  createdAt={post.createdAt}
                  updated={post.updated}
                  _count={{
                    replies: post._count.replies,
                  }}
                />
              );
            })}
          </div>
          <div className="loadMoreButton">
            <LoadMoreBtn type="Posts" handler={loadMorePosts} />
          </div>
        </div>
      </>
    );
  }
}

export default PostFeed;
