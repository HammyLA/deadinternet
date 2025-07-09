import { useEffect, useState } from "react";
import { getPosts } from "../utility/postsAPI";
import PostCard from "../components/PostCard";
import type { Post } from "../utility/types";

interface profileProps {
  userId: number;
}

function Profile(props: profileProps) {
  const userId = props.userId;
  const [postsCount, setPostsCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postList.length === 0) {
      setIsLoading(true);
      async function fetchData() {
        const data = await getPosts(postsCount, skipCount, userId);
        setPostList(data);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [postsCount]);

  console.log(postList);

  return (
    <>
      <div className="head"></div>
      <div className="viewButtons"></div>
      <div className="listContainer">
        {postList.map((post: Post) => {
          return (
            <PostCard
              id={post.id}
              author={post.author}
              authorId={post.authorId}
              boops={post.boops}
              content={post.content}
              createdAt={post.createdAt}
              _count={{
                replies: post._count.replies,
              }}
              updated={post.updated}
              views={post.views}
            />
          );
        })}
      </div>
    </>
  );
}

export default Profile;
