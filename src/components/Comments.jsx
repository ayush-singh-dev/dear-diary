import React, { useState } from "react";
import { useAuth, } from "../store/UserContext";
import AllComment from "./AllComment";
import toast from "react-hot-toast";

const Comments = () => {
  const [comment, setComment] = useState("");
  const {user,post,comments} = useAuth()
 
  const changeHandler = (e) => {
    const value = e.target.value;

    setComment(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dear-diary-server.onrender.com/api/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment, // Ensure this matches the `req.body.content`
          user : user._id,
          post :post._id,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok){
        setComment("")
        toast.success("Comment Post Successfully")
      }
    } catch (error) {
      console.error("cmt-error:", error);
    }
  };
  const handlePost =()=>{
    if(comment.length === 0){
      toast.error("comment empty ")
    }
  }

  return (
    <>
      <div>
        <h1 className=" text-3xl font-bold">{comments.length}{comments.length <= 1 ? "-Comment":"-Comments"}</h1>
      </div>
      <div className=" mt-6">
        <form onSubmit={handleSubmit}>
          <div className=" border bg-white shadow-md">
            <textarea
              className=" p-3 -lg w-full"
              name="comment"
              id="comment"
              value={comment}
              onChange={changeHandler}
              placeholder="write a comments "
              rows={7}
            />
            <div className="px-7 py-3 text-right ">
              <button onClick={handlePost}
                className=" bg-purple-600 text-white font-semibold px-7 py-2 rounded-md
               hover:bg-purple-700 transition-colors duration-300"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <AllComment />
    </>
  );
};

export default Comments;
