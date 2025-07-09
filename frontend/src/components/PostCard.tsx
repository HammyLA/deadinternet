import type { Post } from "../utility/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../styles/postpage/PostCard.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

function PostCard(post: Post) {
  dayjs.extend(relativeTime);

  return (
    <div className="postCard">
      <div>
        <h2>
          <Link className="username" to={`/profile/${post.authorId}`}>{post.author.username}</Link> <span>@{post.author.handle}</span>
          <span>{`${dayjs(post.createdAt).fromNow()}`}</span>
        </h2>
      </div>


      <Link className="postLink" to={`/replies/${post.id}`} id={String(post.id)}>
        <p>{post.content}</p>
        <div className="postStats">
          <div>
            <div>
              <img src="/DeadInternetIcon.svg" />
            </div>
            <span>{post.boops}</span>
          </div>
          <div>
            <div>
              <VisibilityIcon fontSize="small" />
            </div>
            <span>{post.views}</span>
          </div>
          <div>
            <div>
              <ModeCommentIcon fontSize="small" />
            </div>
            <span>{post._count.replies}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
