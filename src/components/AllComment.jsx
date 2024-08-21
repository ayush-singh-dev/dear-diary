import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/UserContext";
const AllComment = () => {
  const { id } = useParams();
  const { comments, fetchComments } = useAuth();

  useEffect(() => {
    if (id) {
      fetchComments(id); // Fetch comments for the specific post when component mounts
    }
  }, [id, fetchComments]);


  const { _id } = comments;

  return (
    <>
      <div className=" mt-7 border rounded-sm bg-white mb-10 p-4 shadow-lg">
        <div className=" flex gap-3 mb-4 flex-col">
          {comments.length > 0 ? (
            comments.map((curElm) => (
              <div key={_id} className=" flex gap-4">
                <div>
                  <FontAwesomeIcon
                    className=" border rounded-md p-2 text-5xl"
                    icon={faUser}
                  />
                </div>
                <div className=" flex flex-col gap-1">
                  <div className=" flex gap-8">
                    <p className=" font-semibold">{curElm.user?.userName}</p>
                    <p className=" text-gray-400">{new Date(curElm.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p>{curElm.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>No comments yet.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllComment;
