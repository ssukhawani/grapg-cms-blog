import React, { useState, useEffect, useRef } from "react";

import { submitComment } from '../services'

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('name')
      emailEl.current.value = window.localStorage.getItem('email')
  },[])

  const handelCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((response) => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false)
      },3000)
    })
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 sm:pb-12 mb-8 text-sm sm:text-base">
      <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
      {error ? (
        <p className="text-xs text-red-500 text-center">All fields are required..!!</p>
      ):<p> </p>}
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="Comment"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        <div className="p-2">
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
            className="mr-2"
          />
          <label
            className="text-gray-500 cursor-pointer text-sm sm:text-base"
            htmlFor="storeData"
          >
            Save my email and name for next time i comment.
          </label>
        </div>
      </div>

      <div className="sm:mt-4 text-center">
        <button
          type="button"
          onClick={handelCommentSubmission}
          className="ease hover:bg-indigo-700 hover:shadow-lg active:scale-90 my-3 transition duration-150 font-bold inline-block bg-pink-600 sm:text-lg rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMsg && (
          <span className="text-sm sm:text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
