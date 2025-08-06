import { useEffect, useState } from "react";
import { getPosts } from "../utility/postsAPI";
import PostCard from "../components/PostCard";
import type { Post, User } from "../utility/types";
import { getUser } from "../utility/usersAPI";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import '../styles/profile/Profile.css'

interface profileProps {
  userId: number;
}

function Profile(props: profileProps) {
  const userId = props.userId;
  const [postsCount, setPostsCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postList.length === 0) {
      async function fetchData() {
        const postData = await getPosts(postsCount, skipCount, userId);
        const userData = await getUser(userId);
        setPostList(postData);
        setUserInfo(userData);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [postsCount]);

  console.log(userInfo);
  console.log(postList);

  if (isLoading || !userInfo) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="profile">
        <div className="card">
          <div>
            <div>
              <Link className="username" style={{fontSize: "22px"}} to={`/profile/${userId}`}>
                {userInfo.username}
              </Link>{" "}
              <span>@{userInfo.handle}</span>
            </div>
            <button style={{position: "absolute", right: "0px"}}>Follow</button>
          </div>
          <div>
            <p>{userInfo.biography ? userInfo.biography : "This user has no bio."}</p>
          </div>
          <div>
            <span>Joined on {(new Date(userInfo.createdAt)).toDateString().split(' ').slice(1).join(' ')}</span>
          </div>
          <div>
            <p>following / followers</p>
          </div>
        </div>
        <div className="postToggle">
            <button autoFocus>Posts</button>
            <button>Replies</button>
          </div>
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
      </div>
    );
  }
}

export default Profile;
