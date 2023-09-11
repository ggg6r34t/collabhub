import React, { useEffect, useState } from "react";

import "./App.css";
import Post from "./components/post/PostSection";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/forms/PostForm";
import CommentForm from "./components/forms/CommentForm";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import Banner from "./components/layouts/banner/Banner";

function App() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const hasSeenImage = localStorage.getItem("hasSeenImage");

    if (hasSeenImage) {
      setShowImage(false);
    } else {
      setTimeout(() => {
        setShowImage(false);

        localStorage.setItem("hasSeenImage", "true");
      }, 3000);
    }
  }, []);

  return (
    <div>
      {showImage ? (
        <Banner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/create-post" element={<PostForm />} />
            <Route path="/comment" element={<CommentForm />} />
            <Route path="/banner" element={<Banner />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
