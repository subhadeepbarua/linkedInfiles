import homeLogo from "../icon/home.png";
import searchLogo from "../icon/search.png";
import notificationLogo from "../icon/notification.png";
import messageLogo from "../icon/message.png";
import buttonLogo from "../icon/button.png";
import networkLogo from "../icon/network.png";
import jobsLogo from "../icon/jobs.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profile, setProfile] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle click events on the document body
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // If clicked outside of the search input and search results container
        setSearchResults([]); // Hide search results
      }
    };

    // Add event listener for click events on the document body
    document.body.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://linkedinclone-3p0r.onrender.com/api/profile_datas",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching data in React:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://linkedinclone-3p0r.onrender.com/search?query=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }

    
  };

  const navEXP =()=>{
    navigate('/EXP')
  }

  return (
    <div>
      {profile && (
        <nav
          key={profile._id}
          className="bg-white w-full fixed p-1 flex flex-row justify-evenly items-center z-50 "
        >
          <div>
            <div className="flex flex-row mx-4 items-center " ref={searchRef}>
              <img
                className="w-10 h-auto md:w-8 md:h-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/900px-LinkedIn_logo_initials.png"
                alt="logo"
              />
              <input
                className="w-[100%] rounded-sm p-1 border-1 border-black hidden md:block"
                type="text"
                placeholder=" &#128269; Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setSearchQuery("");
                  }
                }}
              />
            </div>
            <div className="flex flex-col absolute">
              {searchResults.map((result) => (
                <div key={result._id} className="bg-white p-1 rounded-md">
                  <div className="flex flex-row items-center gap-2 px-2">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={result.profilePic}
                    ></img>
                    <Link to={`/UserProfile/${result.userId}`}>
                      <h1>
                        {result.firstName} {result.lastName}
                      </h1>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center md:gap-5">
            <div className="flex flex-col items-center md:hidden">
              <img
                
                className="w-[30px] h-auto  md:w-8 md:h-auto"
                src={searchLogo}
              />

              <div>
                
              </div>

              <p className="text-center font-[12] hidden md:block">search</p>
            </div>
            <Link to="/profile">
              <div className="flex flex-col items-center ">
                <img
                  className="w-[30px] h-auto  md:w-8 md:h-auto "
                  src={homeLogo}
                />
                <p className="text-center text-[12px] hidden md:block">Home</p>
              </div>
            </Link>
            <Link to="/networking">
              <div className="flex flex-col items-center">
                <img
                  className="w-[30px] h-auto  md:w-8 md:h-auto"
                  src={networkLogo}
                />
                <p className="text-center text-[12px] hidden md:block">
                  My Network
                </p>
              </div>
            </Link>
            <div onClick={navEXP} className="flex flex-col items-center">
              <img
                className="w-[30px] h-auto  md:w-8 md:h-auto"
                src={jobsLogo}
              />
              <p className="text-center text-[12px] hidden md:block">Jobs</p>
            </div>
            <Link to="/messages">
              <div className="flex flex-col items-center">
                <img
                  className="w-[30px] h-auto  md:w-8 md:h-auto"
                  src={messageLogo}
                />
                <p className="text-center hidden text-[12px] md:block hover:font-bold">
                  Message
                </p>
              </div>
            </Link>
            <Link to="/notification">
              <div className="flex flex-col items-center">
                <img
                  className="w-[30px] h-auto  md:w-8 md:h-autoo"
                  src={notificationLogo}
                />
                <p className="text-center hidden text-[12px] md:block">
                  Notification
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-center ">
              <Link to={`/UserProfile/${profile.userId}`}>
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover hidden md:block md:w-8 md:h-8"
                  src={profile.profilePic}
                />
              </Link>
              <p className="text-center hidden text-[12px] md:block">
                Me &#x25BE;
              </p>
            </div>
            <div className="flex flex-col items-center ">
              <img className="w-8 h-auto hidden md:block" src={buttonLogo} />
              <p className="text-center hidden text-[12px] md:block">
                For Business &#x25BE;
              </p>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
