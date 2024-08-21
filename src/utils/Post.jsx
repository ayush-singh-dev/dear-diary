import React from "react";
import { excerpt } from "./short";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
const Post = ({ _id, author, content, createdAt, file, title, onDelete }) => {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate(`/singlePost/${_id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete();
    }
  };

  return (
    <div className=" w-[90vw] m-auto mb-8 lg:mb-0 flex flex-col flex-1">
      <div className="p-3 border flex flex-col lg:border-none lg:flex lg:flex-row lg:p-0 lg:items-start  
      lg:ml-24 lg:gap-4 lg:pr-32 lg:mt-12 ">
        <div className="w-full h-64 lg:w-64 lg:h-64 lg:overflow-hidden">
          <img
            className="object-fill object-center w-full h-full"
            src={file}
            alt="image loading.."
          />
        </div>
        <div className=" w-full">
          <div className=" mt-4 lg:flex lg:flex-shrink lg:gap-24 lg:mt-6">
            <h2 className="text-center font-bold text-4xl lg:text-left">{title}</h2>
            <button onClick={handleDelete} className=" hidden  lg:flex">
              <i className="fa-solid fa-trash text-[#e13033] text-2xl"></i>
            </button>
          </div>

          <div className="mt-3 flex justify-between lg:flex lg:gap-12 lg:mt-4">
            <div>
              <p className="">{author.userName}</p>
              <p className=" text-gray-500">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <button onClick={handleDelete} className=" flex  lg:hidden" >
                <i className="fa-solid fa-trash text-[#e13033] text-2xl"></i>
              </button>
            </div>
          </div>
          <div className=" mt-3 lg:mt-4">
            <p>
              {parse(excerpt(content, 60))}
              <button onClick={handlePage} className=" text-purple-700">
                read more...
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
