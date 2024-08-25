import React, { useEffect, useState } from "react";
import Post from "../utils/Post";
import { useAuth } from "../store/UserContext";
import toast from "react-hot-toast";
const AllPost = () => {
  const [allPost, setAllPost] = useState([]);
  const { user } = useAuth();
  const fetchPost = async () => {
    try {
      const response = await fetch("https://dear-diary-server.onrender.com/api/getPost", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setAllPost(data);
    } catch (error) {
      console.error("fetchPost", error);
    }
  };

 

  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `https://dear-diary-server.onrender.com/api/deletePost/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAllPost(allPost.filter((post) => post._id !== id));
        toast.success(data.msg || "Post deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Failed to delete post");
      }
    } catch (error) {
      console.error("delete post error:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [deletePost]);
  const username = user?.userName || "Guest";

  return (
    <div className="flex flex-col">
      <div className=" mt-3 lg:mt-5 mb-5 lg:mb-0 w-full">
        <h1 className=" font-semibold text-2xl lg:text-3xl pl-7  lg:pl-32">
        {`Welcome back, ${username}!`}
        </h1>
      </div>
      {allPost.length === 0 ? (
        <div className=" h-[25rem] text-center flex justify-center overflow-hidden items-center">
          <h1 className=" text-3xl font-bold ">
            You have no post yet. Create one!
          </h1>
        </div>
      ) : (
        <div className="flex-grow">
          {allPost.map((post) => (
            <Post
              key={post._id}
              {...post}
              currentUserId={user._id}
              onDelete={() => deletePost(post._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
