import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { RootState } from "../../redux/store";
import { BASE_URL } from "../../api/api";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function CommentForm({ post }: Props) {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const [commentContent, setCommentContent] = useState("");

  const handleContentChange = (value: string) => {
    // remove <p> tags from the HTML content using DOMPurify
    const cleanedHTML = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // remove all HTML tags
    });
    setCommentContent(cleanedHTML);
  };

  const commentData = {
    content: commentContent,
    postId: post._id,
  };

  // function to create a new post
  const createComment = async (
    commentData: Partial<Post>,

    token: string | undefined
  ) => {
    try {
      await axios.post(`${BASE_URL}/api/v1/posts/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <ReactQuill
        className="comment w-[544px] ml-12 mt-6 focus:outline-none focus:border-blue-50"
        scrollingContainer="null"
        placeholder="Your comment goes here..."
        value={commentContent}
        onChange={handleContentChange}
      />
      <div className="w-[544px] h-[45px] flex items-center justify-end m-2 ml-12 mb-6">
        <button
          className="h-[35px] py-1 px-2 text-blue-500 border-2 rounded-[12px] hover:bg-blue-50 focus:outline-none"
          onClick={() => {
            createComment(commentData, userInformation?.token);
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
