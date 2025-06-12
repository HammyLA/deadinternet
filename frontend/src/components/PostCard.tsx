import type { Post } from "../utility/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "../styles/postpage/PostCard.css";

function PostCard(post: Post) {
  return (
    <div className="postCard">
      <h2>{post.username}</h2>
      <p>{post.content}</p>
      <div className="postStats">
        <div>
          <img src="/DeadInternetIcon.svg" />
          <span>{post.boops}</span>
        </div>
        <div>
          <VisibilityIcon fontSize='small'/>
          <span>{post.views}</span>
        </div>
        <div>
          <ModeCommentIcon fontSize='small'/>
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
