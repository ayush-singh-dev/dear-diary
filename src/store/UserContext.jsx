import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
import toast from "react-hot-toast";

export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("user-data");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        localStorage.removeItem("user-data"); // Clean up invalid data
        return null;
      }
    }
    return null;
  });
  const [user, setUser] = useState({});
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const Navigate = useNavigate();

  let isLoggedIn = !!authUser;
  

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://dear-diary-server.onrender.com/api/auth/user", {
        method: "GET",
        credentials: "include",
      });
      const decodedData =  await response.json();
        if (response.ok) {
          setUser(decodedData.userData);
          localStorage.setItem("username", JSON.stringify(decodedData.userData));
        } else {
          console.error("Failed to fetch user data:", decodedData.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    
  };

  useEffect(() => {
      fetchUserData();
  }, [authUser]);

  const fetchComments = async (id) => {
    try {
      const response = await fetch(`https://dear-diary-server.onrender.com/api/Comments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("allCommens error::", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("https://dear-diary-server.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const logout_res = await response.json();
      console.log("logout_res:",logout_res)
      if (response.ok) {
        localStorage.removeItem("user-data");
        setAuthUser(null);
        setUser(null);
        Navigate("/");
        toast.success(logout_res.msg || "logout sucess");
      }
    } catch (error) {
      console.error("logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        post,
        setPost,
        comments,
        fetchComments,
        logout,
        authUser,
        setAuthUser,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const userContextValue = useContext(UserContext);
  if (!userContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return userContextValue;
};
