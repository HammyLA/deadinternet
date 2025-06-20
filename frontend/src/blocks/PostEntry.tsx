import AutoResizingTextArea from "../components/AutoResizingTextArea";
import "../styles/postpage/PostEntry.css";

type PostEntryProps = {
  placeholder: string,
  header: string
}

function PostEntry(props: PostEntryProps) {

  return (
    <>
      <div className="makePost">
        <h3>{`${props.header}`}</h3>
        <AutoResizingTextArea placeholder={props.placeholder}/>
        <div>
          <button>Post</button>
        </div>
      </div>
    </>
  );
}

export default PostEntry;
