import { useState, useEffect, useContext } from "react";
import UserContext from './context/UserContext';
import { useLocation } from 'react-router-dom';


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://linkedinclone-3p0r.onrender.com/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching data in React:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleClick = (msg) => {
    setUser({
      username: msg.username,
      profilepic: msg.profilePicUrl,
      description: msg.des,
    });
  };

  const filteredMessages = messages.filter((msg) =>
    msg.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col w-[100vw] h-[100vh] md:w-[400px] md:h-[90vh] md:border-[1px] md:border-black mt-[70px] md:rounded-l-lg ">
      <div className="bg-white w-full flex flex-row justify-between p-3 items-center md:rounded-l-lg">
        <div className="font-bold">Messaging</div>
        <div className="flex flex-row gap-4">
          <div>&#x2026;</div>
          <div>&#128394;</div>
        </div>
      </div>

      <div className="bg-white flex justify-center">
        <input
          className="bg-slate-50 px-2 w-[95%] border-2 border-slate-200 mb-2 rounded-md"
          type="text"
          placeholder=" &#128269;  search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-row justify-center items-center p-2 border-b border-gray-300">
        <div className=" w-[50%] flex justify-center items-center font-bold text-slate-800 hover:text-green-700">
          <h1>Focused</h1>
        </div>
        <div className=" w-[50%] flex justify-center items-center font-bold text-slate-800 hover:text-green-700">
          <h1>Other</h1>
        </div>
      </div>

      <div className="overflow-auto">
        {filteredMessages.map((msg) => (
         
          <div
          key={msg._id}
            onClick={() => handleClick(msg)}
            className="flex flex-row justify-around gap-2 items-center mb-2 py-2 border-b border-gray-300"
          >
            <div>
              <img
                id="profile_image"
                className="w-12 h-12 bg-black rounded-full mx-1"
                src={msg.profilePicUrl}
                alt="Profile"
              />
            </div>

            <div className="w-[80%]">
              <h1 id="userName" className="text-[16px] font-bold">
                {msg.username}
              </h1>
              <p className="text-[14px] text-slate-600">
                Here is my CV, also the link to my...
              </p>
            </div>

            <div className="mr-1">
              {/* {new Date(msg.createdAt).toLocaleDateString()} */}
              6th Jan
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
