import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { Post } from "../../type/types";
import { RootState } from "../../redux/store";
import { BASE_URL } from "../../api/api";
import TrendingProjects from "../trending/TrendingProjects";

function PostForm() {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string) => {
    // remove <p> tags from the HTML content using DOMPurify
    const cleanedHTML = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // remove all HTML tags
    });
    setPostContent(cleanedHTML);
  };

  const postData = {
    title: title,
    content: postContent,
  };

  // function to create a new post
  const createPost = async (
    postData: Partial<Post>,
    token: string | undefined
  ) => {
    try {
      await axios.post(`${BASE_URL}/api/v1/posts/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const response =
      //  add it to the state or redirect to the post page
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="h-screen bg-white p-4 py-40 flex flex-row items-start justify-center">
      <div className="w-[738px] flex flex-col items-center justify-center rounded shadow p-4">
        <input
          type="text"
          className="w-[708px] h-[40px] mb-4 px-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <ReactQuill
          className="snow w-[724px] h-[242px] p-2 focus:outline-none focus:border-blue-50"
          scrollingContainer="null"
          placeholder="Your post goes here..."
          value={postContent}
          onChange={handleContentChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
        />
        <div className="w-[724px] h-[45px] flex items-center justify-end p-1 mt-4 ">
          <button
            className="px-4 py-2 bg-[#010536] text-white rounded-md focus:outline-none focus:ring focus:border-blue-400"
            onClick={() => {
              createPost(postData, userInformation?.token);
            }}
          >
            Create Post
          </button>
        </div>
      </div>
      <div className="w-[273px] ml-4 ">
        <TrendingProjects />
      </div>
    </div>
  );
}

export default PostForm;
