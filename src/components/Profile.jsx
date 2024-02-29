import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://linkedinclone-3p0r.onrender.com/api/profile_datas", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching data in React:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {profile && (
        <div
          key={profile._id}
          className="flex w-full flex-col items-center md:w-[180px]"
        >
          <div className="bg-slate-600 rounded-t-lg w-full flex flex-col items-center relative mt-[40px] md:mt-[70px]">
            <img
              src={profile.coverPic}
              alt="Top Image"
              className="relative w-full h-[80px] rounded-t-lg object-cover"
            />
            <img
              src={profile.profilePic}
              alt="Bottom Image"
              className="absolute object-cover border-2 border-black w-[100px] h-[100px] md:w-[60px] md:h-[60px] md:mb-2 rounded-full bottom-0 transform translate-y-1/2"
            />
          </div>

          <div className="bg-white w-full">
            <Link to={`/UserProfile/${profile.userId}`}>
            <h1  className="text-center text-black text-base font-bold md:pt-8 pt-14 mb-0">
              {profile.firstName} {profile.lastName}
            </h1></Link>
            <p className="text-center text-slate-500 text-xs mb-1">
              {profile.description}
            </p>
          </div>
          <div className="bg-[#F4F3EE] w-full text-center text-sm py-2 rounded-b-lg">
            Show more &#x2026;
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
