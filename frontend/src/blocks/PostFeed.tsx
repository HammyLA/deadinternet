import PostCard from "../components/PostCard";
import type { Post } from "../utility/types";
import PostEntry from "./PostEntry";
import "../styles/postpage/PostFeed.css";
import { useEffect, useState } from "react";
import { getData } from "../utility/postsAPI";
import { CircularProgress } from "@mui/material";

function PostFeed() {
  const [postsCount, setPostsCount] = useState(10);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postList.length === 0) {
      setIsLoading(true);
      async function fetchData() {
        const data = await getData(postsCount);
        setPostList(data);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [postsCount, postList]);

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
          <PostEntry />
          <h1 style={{ textAlign: "left", margin: "10px 30px" }}>For You</h1>
          <div>
            {postList.map((post: Post) => {
              return (
                <PostCard
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  boops={post.boops}
                  views={post.views}
                  replies={post.replies}
                  id={post.id}
                  authorId={post.authorId}
                  createdAt={post.createdAt}
                  updated={post.updated}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default PostFeed;
