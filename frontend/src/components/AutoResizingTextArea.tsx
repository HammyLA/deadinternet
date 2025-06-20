import { useRef, useState, useEffect } from "react";

type TextAreaProps = {
  placeholder: string
}

export default function AutoResizingTextArea(props: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = "auto";           // Reset height
      el.style.height = `${el.scrollHeight}px`;  // Set to scroll height
    }
  };

  // Re-adjust height on mount (or when value changes from outside)
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={handleInput}
      placeholder={props.placeholder}
      style={{
        overflow: "hidden",
        resize: "none",
        minHeight: "0px", // optional
      }}
    />
  );
}