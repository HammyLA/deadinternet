import type { Post } from "../utility/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../styles/postpage/PostCard.css";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function PostCard(post: Post) {
  dayjs.extend(relativeTime)

  return (
    <div className="postCard">
      <div>
        <h2>
          {post.author.username} <span>@{post.author.handle}</span>
          <span>{`${dayjs(post.createdAt).fromNow()}`}</span>
        </h2>
      </div>

      <p>{post.content}</p>
      <div className="postStats">
        <div>
          <img src="/DeadInternetIcon.svg" />
          <span>{post.boops}</span>
        </div>
        <div>
          <VisibilityIcon fontSize="small" />
          <span>{post.views}</span>
        </div>
        <div>
          <ModeCommentIcon fontSize="small" />
          <span>{post.replies.length}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
