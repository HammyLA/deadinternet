import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getPostDetails } from "../utility/postsAPI";
import PostCard from "../components/PostCard";
import type { Post } from "../utility/types";
import PostEntry from "./PostEntry";

type DetailsPostDrawerProps = {
  postId: number;
};

function DetailsPostDrawer(props: DetailsPostDrawerProps) {
  if (!props.postId) {
    // Turn this into a full on error page eventually.
    return <div>This page doesn't exist.</div>;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState<Post>();

  useEffect(() => {
    async function fetchData() {
      let data = await getPostDetails(props.postId);
      setPostDetails(data);
      setIsLoading(false);
    }

    fetchData();
    console.log(postDetails);
  }, [isLoading, props.postId]);

  if (isLoading || !postDetails) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <PostCard
        id={postDetails.id}
        author={postDetails.author}
        authorId={postDetails.authorId}
        boops={postDetails.boops}
        content={postDetails.content}
        createdAt={postDetails.createdAt}
        _count={{
          replies: postDetails.replies?.length || 0,
        }}
        updated={postDetails.updated}
        views={postDetails.views}
      />
      <PostEntry placeholder="Post your reply. . ." header="" />
      <h2 style={{ textAlign: "left", margin: "10px 30px" }}>Replies</h2>
      {(postDetails.replies ? postDetails.replies : []).map((post: Post) => {
        return (
          <PostCard
            id={post.id}
            author={post.author}
            authorId={post.authorId}
            boops={post.boops}
            content={post.content}
            createdAt={post.createdAt}
            updated={post.updated}
            views={post.views}
            _count={{
              replies: post._count.replies,
            }}
          />
        );
      })}
    </div>
  );
}

export default DetailsPostDrawer;
