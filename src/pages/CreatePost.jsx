import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../utils/Editor";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({
    title: "",
    file: null,
    content: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPost({
      ...post,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, file });
  };

  const handleEditorChange = (content) => {
    setPost({ ...post, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title || !post.content || !post.file) {
      toast.error("Please fill in all the fields (Title, Content, and File).");
      return;
    }
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("file", post.file);
      const response = await fetch("https://dear-diary-server.onrender.com/api/create/post", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const postResponse = await response.json();
      if(response.ok){
        setPost({
          title: "",
          file: null,
          content: "",
        });
        navigate("/allPost");
        setLoader(false);
        toast.success(postResponse.msg||"succesfully created a post")
      }else{
        toast.error("Failed to create the post. Please fill in the credentials properly.")
      }
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" w-[90%] mt-10 bg-white m-auto py-4 px-8 border rounded-sm shadow-lg"
      >
        <div>
          <label
            htmlFor="title"
            className=" block text-lg font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            className="border border-gray-300 mt-3 ml-4 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
            type="title"
            placeholder="title"
            name="title"
            id="title"
            value={post.title}
            onChange={handleInput}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className=" block text-lg font-medium text-gray-700 mt-3"
          >
            File:
          </label>
          <input
            className="border bg-white border-gray-300 mt-4 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="descrition"
            className=" block text-lg mt-3 font-medium text-gray-700"
          >
            Content:
          </label>
          <Editor value={post.content} onChange={handleEditorChange} />
        </div>
        <div>
          {loader ? (
            <div className=" mt-8 text-center flex justify-center gap-1 bg-[#7E30E1] px-7 py-2  rounded-lg w-full ">
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
              />
              <span className=" text-white font-semibold flex pt-[5px]">
                loading
              </span>
            </div>
          ) : (
            <button className=" mt-8 bg-[#7E30E1] px-7 py-2 text-white rounded-lg w-full ">
              Create Post
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreatePost;
