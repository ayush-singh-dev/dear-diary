import React, { useEffect, useState } from "react";
import Editor from "../utils/Editor";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdatePost = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const Navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    file: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://dear-diary-server.onrender.com/api/singlePost/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        ("updatePost:", data);
        if (response.ok) {
          setPost({
            title: data.title,
            content: data.content,
            file: data.file || null,
          });
          ("Fetched post data:", data);
        } else {
          console.error("Failed to fetch post:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching the post", error);
      }
    };
    fetchPost();
  }, [id]);

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
    setLoader(true);
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    if (post.file) {
      formData.append("file", post.file);
    }
    try {
      const response = await fetch(
        `https://dear-diary-server.onrender.com/api/post/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        Navigate(`/singlePost/${id}`);
        toast.success("Update Sucessfully")
      } else {
        console.error("Error updating the post", data.msg);
      }
    } catch (error) {
      console.error("Server error", error);
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
          <Editor updateValue={post.content} onChange={handleEditorChange} />
        </div>
        <div>
          {loader ? (
            <div className=" mt-10 text-center flex justify-center gap-1 bg-[#7E30E1] px-7 py-2  rounded-lg w-full ">
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
              Update Post
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default UpdatePost;
