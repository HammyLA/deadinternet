import AutoResizingTextArea from "../components/AutoResizingTextArea";
import "../styles/postpage/PostEntry.css";

function PostEntry() {

  return (
    <>
      <div className="makePost">
        <h3>What are you thinking about?</h3>
        <AutoResizingTextArea />
        <div>
          <button>Post</button>
        </div>
      </div>
    </>
  );
}

export default PostEntry;
