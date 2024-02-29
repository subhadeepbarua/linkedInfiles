import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import like from "../icon/like.png";

const Post = () => {
  const [postinfo, setPostinfo] = useState([]);
  //const [selectedPopup, setSelectedPopup] = useState(false);
  //const [postComments, setPostComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
        const response = await fetch("https://linkedinclone-3p0r.onrender.com/api/post_datas", {
          headers: {
            Authorization: token, 
          },
        });
        const data = await response.json();
        setPostinfo(data);       
        // if (data.length > 0) {
        //   //setPostComments(data[0].comments);
        // }
    
      } catch (error) {
        console.error("Error fetching data in React:", error);
      }
    };

    fetchData();
  }, []);

  // const handlePopup = (postId) => {
  //   setSelectedPopup((prevPopup) => (prevPopup === postId ? null : postId));
  // };

  return (
    <div>
      {postinfo.reverse().map((post) => (
        <div
          key={post._id}
          className="bg-white flex flex-col md:rounded-lg justify-around min-h-[250px] mb-2"
        >
          <div className="flex flex-row mx-4 justify-between">
            <div className="flex flex-row gap-1 items-center my-2">
              <div>
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-black"
                  src={post.profilePic}
                  alt="image"
                ></img>
              </div>

              <div className="flex flex-col">
                <Link to={`/UserProfile/${post.userId}`}>
                  <h1 className="font-bold text-[100%] md:text-[100%]">
                    {post.firstName} {post.lastName}
                  </h1>
                </Link>
                <p className="text-[10px] text-gray-800">{post.description}</p>
                {/* Display time/date from MongoDB here */}
                <p className="text-[10px] text-gray-800">
                  {new Date(post.time).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  {new Date(post.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[96%] flex flex-col justify-center mx-auto mb-2">
            <p
              className={`text-[100%] mb-2 ${
                !post.media_url ? "font-bold text-[18px] ml-2" : ""
              }`}
            >
              {post.caption}
            </p>
            {post.media_url && (
              <img
                className="w-[100%] h-auto mx-auto"
                src={post.media_url}
                alt="Post Image"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-around items-center mx-4 mb-2">
              <div className=" flex flex-row gap-1">
                <img src={like} className="w-5"></img>
              </div>
              <div className="flex flex-row gap-1">
                <div className="">&#128172;</div>
              </div>
              <div className="">&#128257;</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
