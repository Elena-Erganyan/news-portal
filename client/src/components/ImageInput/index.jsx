import { useRef } from "react";


const ImageInput = ({handleChange, accept, icon, ...props}) => {
  const inputRef = useRef(null);

  return (
    <>
      <input
        ref={inputRef}
        style={{display: "none"}}
        type="file"
        accept={accept}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        {icon}
      </button>
    </>
  );
};

export default ImageInput;
