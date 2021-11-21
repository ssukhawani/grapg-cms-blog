import React, { useState, useEffect } from "react";

import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";
import { comment } from "postcss";
import postStyles from "./post-styles.module.css";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comment.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
          <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8  font-semibold border-b border-blue-300 pb-4">
            {comments.length}
            {`${comments.length > 1 ? " Comments" : " Comment"}`}
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100"
            >
              {/* <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full ">
                {parse(comment.comment)}
              </p> */}
              <blockquote
                className={`otroBlockquote ${postStyles.otroBlockquote}`}
              >
                {parse(comment.comment)}
                <span>
                  - {comment.name} on{" "}
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </span>
              </blockquote>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
