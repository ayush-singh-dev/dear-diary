import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({value,onChange,updateValue}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div className="h-36 mb-4">
      <ReactQuill
        className=" border-gray-300 mt-3 ml-3 px-3 py-2 shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full h-full "
        theme={"snow"}
        modules={modules}
        formats={formats}
        value={value || updateValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
