import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllPost from "./pages/AllPost";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer";
import UpdatePost from "./pages/UpdatePost";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/allPost" element={<AllPost />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/singlePost/:id" element={<SinglePost />} />
          <Route path="/updatePost/:id" element={<UpdatePost />} />
        </Routes>
          <Footer />
        <Toaster />

    </div>
  );
}

export default App;
