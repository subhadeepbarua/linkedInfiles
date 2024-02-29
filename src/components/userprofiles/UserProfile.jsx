import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import editIcon from "../../icon/pencil.png";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [pId, setPId] = useState(null); // State variable for pId
  const [selectedPopup, setSelectedPopup] = useState(false);
  const [connections, setConnections] = useState(null);
  const [sentConnection, setSentConnection] = useState(null);
  const [connectionReq, setConnectionReq] = useState(null);
  const [experience, setExperience] = useState(null);
  const [education, setEducation] = useState(null);
  const [buttonText, setButtonText] = useState({
    connect: "Connect",
    cancel: "Cancel",
    accept: "Accepted",
  });

  const [formData, setFormData] = useState({
    about: "",
    experience: {
      company: "",
      jobRole: "",
      fromDate: "",
      toDate: "",
    },
    education: {
      school: "",
      fromDate: "",
      toDate: "",
    },
    skill: "",
  });

  // ########################################################################
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState();

  const handleImageClick = (image, type) => {
    setSelectedImage(image);
    setShowImageModal(true);
    setImageType(type);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
    setImage(null)
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  
  const handlePost = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append('image', image);
      console.log(image)
      console.log('type',imageType)
      formData.append("imageType", imageType);
      const token = localStorage.getItem("token");
      await axios.post('https://linkedinclone-3p0r.onrender.com/uploadProfilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        }
      });

      setImage(null);
      setShowImageModal(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  const handleMediaUpload = () => {
    const fileInput = document.getElementById("mediaInput");
    fileInput.click();
  };

  //######################################################################

  const handleChange = (e, field, subField = null) => {
    const { value } = e.target;
    if (subField) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const updateProfileInfo = async (field) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://linkedinclone-3p0r.onrender.com/userDataUpdate",
        {
          field,
          value: formData[field],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(`Successfully updated ${field}`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://linkedinclone-3p0r.onrender.com/api/user_profiles/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setProfile(data.userProfile);
        setPId(data.profileId);
        setConnections(data.userProfile.connections);
        setSentConnection(data.userProfile.connection_sent);
        setConnectionReq(data.userProfile.connection_req);
        setExperience(data.userProfile.experience);
        setEducation(data.userProfile.education);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const addConnection = async (userId) => {
    setButtonText((prevState) => ({ ...prevState, Accept: "Accepted" }));
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      await axios.post(
        "https://linkedinclone-3p0r.onrender.com/acceptConnections",
        { userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Connection added successfully");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const cancelConnection = async (userId) => {
    setButtonText((prevState) => ({ ...prevState, cancel: "Cancelled" }));
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      await axios.post(
        "https://linkedinclone-3p0r.onrender.com/connectionCancel",
        { userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Connection added successfully");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const sendRequest = async (userId) => {
    setButtonText((prevState) => ({ ...prevState, connect: "Request Sent" }));
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      await axios.post(
        "https://linkedinclone-3p0r.onrender.com/sendRequest",
        { userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Connection added successfully");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const handlePopup = (popupId) => {
    setSelectedPopup((prevPopup) => (prevPopup === popupId ? null : popupId));
  };

  return (
    <div className="felx flex-col">
      {profile && (
        <div key={profile._id} className="flex flex-col gap-2  mx-auto">
          <div className="bg-white flex flex-col md:w-[650px] w-[100vw] mt-[45px]  md:mt-[70px] rounded-md mx-auto">
            <div className="relative">
              <img
                src={profile.coverPic}
                alt="coverPic"
                className="w-full h-[200px] rounded-t-md object-cover absolute z-10"
                onClick={() => handleImageClick(profile.coverPic, "coverPic")}
              />

              <img
                src={profile.profilePic}
                alt="profilePic"
                className="w-[120px] h-[120px] object-cover border-4 border-black rounded-full relative z-20 ml-1 mt-[135px]"
                onClick={() =>
                  handleImageClick(profile.profilePic, "profilePic")
                }
              />
              {showImageModal && (
                <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black bg-opacity-50">
                  <div className="relative w-3/4 max-w-md">
                    {/* Existing image */}
                    <img
                      src={selectedImage}
                      alt="coverPic"
                      className="w-full rounded-md object-cover"
                    />
                    {/* Selected image preview */}
                    {image && (
                      <div className="absolute top-0 left-0 w-full h-full">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="selectedImagePreview"
                          className="w-full h-full rounded-md object-cover"
                        />
                      </div>
                    )}
                    <button
                      className="absolute bg-black opacity-[50%] p-1 rounded-md top-4 right-4 text-white"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    {profile.userId === pId && (
                      <button
                        className="absolute bg-green-600 p-1 rounded-md bottom-4 right-4 text-white"
                        onClick={handlePost}
                      >
                        Update
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="mediaInput"
                      name="mediaInput"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {profile.userId === pId && (
                      <button
                        className="absolute bottom-4 left-4 text-[30px]"
                        onClick={handleMediaUpload}
                      >
                        &#128444;
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-row justify-between w-full ">
                <div className=" w-[40%] flex flex-col m-2 gap-1">
                  <h1 className="font-bold text-[22px]">
                    {profile.firstName} {profile.lastName}
                  </h1>

                  <h1 className="text-slate-500">{profile.description}</h1>

                  <h1 className="text-slate-500">
                    Connections {profile.connections.length}
                  </h1>

                  <h1 className="text-blue-500">{profile.email}</h1>
                  {profile.userId !== pId &&
                    !connections.some((connection) => connection === pId) &&
                    !sentConnection.some(
                      (connection_sent) => connection_sent === pId
                    ) &&
                    !connectionReq.some(
                      (connection_req) => connection_req === pId
                    ) && (
                      <button
                        onClick={() => sendRequest(profile.userId)}
                        className="bg-blue-400 w-[100px] rounded-md px-2 p-1"
                      >
                        {buttonText.connect}
                      </button>
                    )}

                  {profile.userId !== pId && connectionReq.includes(pId) && (
                    <button
                      onClick={() => cancelConnection(profile.userId)}
                      className="bg-red-400 w-[90px] rounded-md px-2 p-1"
                    >
                      {buttonText.cancel}
                    </button>
                  )}

                  {profile.userId !== pId && sentConnection.includes(pId) && (
                    <button
                      onClick={() => addConnection(profile.userId)}
                      className="w-[90px] rounded-md px-2 p-1 bg-green-400"
                    >
                      {buttonText.accept}
                    </button>
                  )}
                </div>

                <div className="flex flex-row mt-2 w-[50%] justify-end ">
                  
                    <h1 className="mr-[2px]">{profile.schoolName}</h1>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white min-h-[60px] md:w-[650px] w-[100vw] rounded-md mx-auto">
            <div className="flex flex-row justify-between items-center mx-4">
              <h1 className="font-bold text-[22px]">About</h1>
              {profile.userId === pId && (
                <img
                  className="w-4"
                  onClick={() => handlePopup("about")}
                  src={editIcon}
                  alt="Edit Icon"
                />
              )}
            </div>

            <div>
              {selectedPopup === "about" ? (
                <div className="flex flex-row justify-between mx-4 mb-1 h-[100px]">
                  <textarea
                    value={formData.about}
                    onChange={(e) => handleChange(e, "about")}
                    className="mx-2 p-2 w-[80%]"
                    style={{ resize: "none" }}
                    placeholder={profile.about}
                  />
                  <button
                    onClick={() => updateProfileInfo("about")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md self-end"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <h1 className="mx-4 text-slate-600">{profile.about}</h1>
              )}
            </div>
          </div>

          <div className="bg-white min-h-[60px] md:w-[650px] w-[100vw] rounded-md mx-auto ">
            <div className="flex flex-row justify-between items-center mx-4">
              <h1 className="font-bold text-[22px]">Experience</h1>
              {profile.userId === pId && (
                <button
                  onClick={() => handlePopup("experience")}
                  className="text-[30px]"
                >
                  +
                </button>
              )}
            </div>
            <div className="mx-4 flex-col">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="font-bold">{exp.company}</div>
                  <div className="text-slate-600">{exp.jobRole}</div>
                  <div className="text-slate-600 mb-2">
                    {" "}
                    {new Date(exp.fromDate).toLocaleString("en-us", {
                      month: "short",
                      year: "numeric",
                    })}
                    {" - "}
                    {new Date(exp.toDate).toLocaleString("en-us", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
            {selectedPopup === "experience" && (
              <div className="flex flex-col w-full bg-white shadow-lg rounded-lg p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col  md:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Company/Work Place"
                      value={formData.experience.company}
                      onChange={(e) => handleChange(e, "experience", "company")}
                      className="border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Job Role"
                      value={formData.experience.jobRole}
                      onChange={(e) => handleChange(e, "experience", "jobRole")}
                      className="border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                    <div className="flex flex-row gap-2">
                      <h1>From:</h1>
                      <input
                        type="date"
                        placeholder="From"
                        value={formData.experience.fromDate}
                        onChange={(e) =>
                          handleChange(e, "experience", "fromDate")
                        }
                        className="border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex flex-row gap-2">
                      <h1>To:</h1>
                      <input
                        type="date"
                        placeholder="To"
                        value={formData.experience.toDate}
                        onChange={(e) =>
                          handleChange(e, "experience", "toDate")
                        }
                        className="border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => updateProfileInfo("experience")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md self-end"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          <div className="bg-white md:w-[650px] w-[100vw] rounded-md mx-auto">
            <div className="flex flex-row justify-between items-center mx-4">
              <h1 className="font-bold text-[22px]">Education</h1>
              {profile.userId === pId && (
                <button
                  className="text-[30px]"
                  onClick={() => handlePopup("education")}
                >
                  +
                </button>
              )}
            </div>
            <div>
              <div className="mx-4 flex flex-col">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h1 className="font-bold text-[18px]">{edu.school}</h1>
                    <h1 className="text-slate-600">
                      {new Date(edu.fromDate).toLocaleString("en-us", {
                        month: "short",
                        year: "numeric",
                      })}
                      {" - "}
                      {new Date(edu.toDate).toLocaleString("en-us", {
                        month: "short",
                        year: "numeric",
                      })}
                    </h1>
                  </div>
                ))}
                <div>
                  {selectedPopup === "education" && (
                    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col  md:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="School / University"
                            value={formData.education.school}
                            onChange={(e) =>
                              handleChange(e, "education", "school")
                            }
                            className="border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                          <div className="flex flex-row gap-2">
                            <h1>From:</h1>
                            <input
                              type="date"
                              placeholder="From"
                              value={formData.education.fromDate}
                              onChange={(e) =>
                                handleChange(e, "education", "fromDate")
                              }
                              className="border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          <div className="flex flex-row gap-2">
                            <h1>To:</h1>
                            <input
                              type="date"
                              placeholder="From"
                              value={formData.education.toDate}
                              onChange={(e) =>
                                handleChange(e, "education", "toDate")
                              }
                              className="border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => updateProfileInfo("education")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md self-end"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white min-h-[60px] md:w-[650px] w-[100vw] rounded-md mx-auto mb-2">
            <div className="flex flex-row justify-between items-center mx-4">
              <h1 className="font-bold text-[22px]">Skills</h1>
              {profile.userId === pId && (
                <button
                  className="text-[30px]"
                  onClick={() => handlePopup("skills")}
                >
                  +
                </button>
              )}
            </div>
            <div className=" mb-2">
              {profile.skills &&
                profile.skills.map((skills, index) => (
                  <div
                    key={index}
                    className="mx-4 flex flex-row justify-between items-center"
                  >
                    <li className="text-slate-900 text-[16px]">{skills}</li>
                  </div>
                ))}
            </div>
            <div>
              {selectedPopup === "skills" && (
                <div className="flex flex-row bg-white rounded-lg p-4 items-center justify-between mx-3 mb-2">
                  <input
                    className="p-1"
                    type="text"
                    value={formData.skill}
                    onChange={(e) => handleChange(e, "skill")}
                    placeholder="Add a skill"
                  ></input>
                  <button
                    onClick={() => updateProfileInfo("skill")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md self-end"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
