import network from "../../icon/network.png";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Networking = () => {
  const [connectionDetails, setConnectionDetails] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeForm, setActiveForm] = useState("page1");
  const [accepted, setAccepted] = useState(false);

  const addConnection = async (userId) => {
    setAccepted(true);
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      await axios.post('https://linkedinclone-3p0r.onrender.com/acceptConnections', { userId }, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Connection added successfully');
    } catch (error) {
      console.error('Error adding connection:', error);
    }
   
  };

  const cancelConnection = async (userId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      await axios.post('https://linkedinclone-3p0r.onrender.com/connectionCancel', { userId }, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Connection added successfully');
    } catch (error) {
      console.error('Error adding connection:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
        const UserResponse = await fetch(
          "https://linkedinclone-3p0r.onrender.com/connectionList",
          {
            headers: {
              Authorization: token, // Send JWT token in the request headers
            },
          }
        );
        const ProfileResponse = await fetch(
          "https://linkedinclone-3p0r.onrender.com/api/profile_datas",
          {
            headers: {
              Authorization: token, // Send JWT token in the request headers
            },
          }
        );
        const profileData = await ProfileResponse.json();
        const userData = await UserResponse.json();
        console.log(userData);
        setConnectionDetails(userData);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching data in React:", error);
      }
    };

    fetchData();
  }, []);

  const showRecived = () => {
    setActiveForm("page2");
  };

  const showSent = () => {
    setActiveForm("page1");
  };

  return (
    <div className="flex flex-col w-[100vw] md:w-[650px] mx-auto gap-2">
      <div className="bg-white flex flex-col mt-[45px] md:mt-[70px] rounded-md">
        <div className="flex flex-row justify-between m-2 mb-4  font-bold">
          <h1 className="text-[18px]">My Connections</h1>
          {profile && (
            <div className="flex flex-row items-center gap-1">
              <img
                key={profile._id}
                className="w-7"
                src={network}
                alt="network"
              ></img>
              <h1>{profile.connections.length}</h1>
            </div>
          )}
        </div>
        <ul>
          {connectionDetails.yourConnections &&
            connectionDetails.yourConnections.map((connection) => (
              <li className="mx-2" key={connection._id}>
                <div className="flex flex-row mb-3 gap-2">
                  <div>
                    <img
                      className="w-12 h-12 min-h-12 object-cover min-w-12 rounded-md"
                      src={connection.profilePic}
                      alt="img"
                    ></img>
                  </div>
                  <div className="flex flex-col">
                  <Link to={`/UserProfile/${connection.userId}`}>
                    <h1 className="font-bold">
                      {connection.firstName} {connection.lastName}
                    </h1></Link>
                    <h1 className="text-slate-500">{connection.description}</h1>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="bg-white rounded-md flex flex-col">
        <div className="font-bold m-2">
          <h1>Connection Requests</h1>
        </div>

        <div className="flex flex-row gap-4 mx-4 mb-4 font-bold">
          <div>
            <h1
              onClick={showSent}
              className={`${
                activeForm === "page1"
                  ? "text-green-500 underline"
                  : "  text-black"
              }`}
            >
              Recived
            </h1>
          </div>
          <div>
            <h1
              onClick={showRecived}
              className={`${
                activeForm === "page2"
                  ? "text-green-500 underline"
                  : "  text-black"
              }`}
            >
              Sent
            </h1>
          </div>
        </div>

        <div>
          <div
            className={`flex flex-col w-full ${
              activeForm === "page1" ? "block" : "hidden"
            }`}
          >
            <ul>
              {connectionDetails.reqRecived &&
                connectionDetails.reqRecived.map((connection) => (
                  <li className="mx-2" key={connection._id}>
                    <div className="flex flex-row mb-3 justify-between">
                      <div className="flex flex-row gap-2">
                        <div>
                          <img
                            className="w-12 h-12 object-cover rounded-md"
                            src={connection.profilePic}
                            alt="img"
                          ></img>
                        </div>

                        <div className="flex flex-col">
                        <Link to={`/UserProfile/${connection.userId}`}>
                          <h1 className="font-bold">
                            {connection.firstName} {connection.lastName}
                          </h1></Link>
                          <h1 className="text-slate-500">
                            {connection.description}
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-row items-center mx-2">
                      <button
      onClick={() => addConnection(connection.userId)}
      className={`px-2 py-1 rounded-md ${accepted ? 'bg-green-500' : 'bg-green-400'}`}
    >
      {accepted ? 'Accepted' : 'Accept'}
    </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div
            className={`flex flex-col w-full ${
              activeForm === "page2" ? "block" : "hidden"
            }`}
          >
            <ul>
              {connectionDetails.reqSent &&
                connectionDetails.reqSent.map((connection) => (
                  <li className="mx-2" key={connection._id}>
                    <div className="flex flex-row mb-3 justify-between">
                      <div className="flex flex-row gap-2">
                        <div>
                          <img
                            className="w-[45px] h-[45px] object-cover rounded-md"
                            src={connection.profilePic}
                            alt="img"
                          ></img>
                        </div>
                        <div className="flex flex-col">
                        <Link to={`/UserProfile/${connection.userId}`}>
                          <h1 className="font-bold">
                            {connection.firstName} {connection.lastName}
                          </h1></Link>
                          <h1 className="text-slate-500">
                            {connection.description}
                          </h1>
                        </div>
                      </div>
                      <div className="flex flex-row items-center mx-2">
                        <button onClick={() => cancelConnection(connection.userId)} className="px-2 py-1  bg-green-500 rounded-md">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md flex flex-col mb-2">
        <div className="font-bold m-2">
          <h1>People you may know</h1>
        </div>
        <div className="">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
    {connectionDetails.peopleYouMayKnow &&
      connectionDetails.peopleYouMayKnow.map((connection) => (
        <div key={connection._id} className="flex flex-col items-center rounded-md text-center bg-slate-200 w-[140px] mb-2 mx-4">
        
            <img className="w-16 h-16
             rounded-full object-cover border-2 border-black my-1" src={connection.profilePic} alt="network"></img>
           <Link to={`/UserProfile/${connection.userId}`}> <h1 className="font-bold">{connection.firstName} {connection.lastName}</h1> </Link>
            <h1 className="text-slate-800">{connection.description}</h1>
         
          
        </div>
      ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default Networking;