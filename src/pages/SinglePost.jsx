import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/UserContext";
import Comments from "../components/Comments";
import parse from 'html-react-parser';

const SinglePost = () => {
  const { post, setPost } = useAuth();
  const [likes, setLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await fetch(
        `https://dear-diary-server.onrender.com/api/singlePost/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setPost(data);
      setLikes(data.isLiked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.error("singlepost error:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const likeHandle = async () => {
    try {
      const response = await fetch(`https://dear-diary-server.onrender.com/api/likePost/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLikes(true);
      setLikesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("like post error:", error);
    }
  };
  const unlikeHandle = async () => {
    try {
      const response = await fetch(
        `https://dear-diary-server.onrender.com/api/unlikePost/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      ("unikedPost-data:", data);
      setLikes(false);
      setLikesCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("unlike post error:", error);
    }
  };

  const { author, content, file, title, createdAt, _id } = post || {};

  const authorName = author?.userName;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <>
      <div className=" w-screen h-[475px] overflow-hidden">
        <img
          className="w-full h-full object-fill"
          src={file}
          alt="cover-image"
        />
      </div>
      <div className=" w-[80%] m-auto">
        <div>
          <h1 className=" text-center font-bold text-5xl mt-3 mb-4">{title}</h1>
        </div>
        <div className=" flex justify-between ">
          <div className=" flex align-middle gap-28">
            <div>
              <p className=" font-semibold mb-2">{authorName} </p>
              <p className=" mb-5">{formattedDate}</p>
            </div>
            <div className=" flex gap-2">
              <p className="   pt-[6px]"> {likesCount}</p>
              {likes ? (
                <i
                  onClick={unlikeHandle}
                  className="fa-solid fa-thumbs-up text-[#7E30E1] text-2xl cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={likeHandle}
                  className="fa-regular fa-thumbs-up text-[#7E30E1]  text-2xl cursor-pointer"
                ></i>
              )}
            </div>
          </div>

          <div>
            <Link to={`/updatePost/${_id}`}>
              <i className="fa-solid fa-pen-to-square text-[#7E30E1] text-2xl"></i>
            </Link>
          </div>
        </div>

        <div>
        {content ? parse(content) : null}
        </div>
        <hr className=" mt-9" />
        <div className=" mt-8">
          <Comments />
        </div>
      </div>
    </>
  );
};

export default SinglePost;
