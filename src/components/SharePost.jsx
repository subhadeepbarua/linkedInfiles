import { useState, useEffect } from 'react';
import axios from 'axios';

const SharePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState('');
 
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const selectedMedia = e.target.files[0];
     const mediaUrl = URL.createObjectURL(selectedMedia);
     setSelectedMediaUrl(mediaUrl);
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);
      const token = localStorage.getItem("token");
      await axios.post('https://linkedinclone-3p0r.onrender.com/uploadPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        }
      });

      setImage(null);
      setCaption('');
      alert('Post uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };


  const [profile, setProfile] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
 

  const handleMediaUpload = () => {
    const fileInput = document.getElementById("mediaInput");
    fileInput.click();
  };

  const handleButtonClick = () => {
    setPopupVisible((prev) => !prev);
  };

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
    <div key={profile._id} className='flex flex-col items-center'>
      <div className="bg-white w-[100%] h-[135px] flex flex-col md:rounded-md md:mt-[70px]">
        <div className="flex flex-row justify-evenly p-5 ">
            <img className='w-10 h-10 rounded-full object-cover' src={profile.profilePic} alt='pip'></img>
            <input className='bg-white border-[1px] border-black w-[80%] rounded-3xl px-4' placeholder='  Start a Post' onClick={handleButtonClick}></input>
        </div>
        <div className='flex flex-row justify-evenly'>
            <h1>&#128444; Media</h1>
            <h1>&#x1F4C5; Event</h1>
            <h1>&#9997; Write article</h1>
        </div>
      </div>

      {isPopupVisible && (
        <div className="bg-white flex flex-col w-[80%] md:w-[30vw] h-[300px] md:h-[500px] rounded-lg justify-around min-h-[250px] border-[1px] border-black fixed mt-[10vh]">
         <div className="flex flex-row mx-4 justify-between "> 
          <div className="flex flex-row gap-4">
            <div>
              <img
                className="w-12 h-12 rounded-full border-[1px] object-cover border-black"
                src={profile.profilePic}
                alt="image"
              ></img>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="font-bold">{profile.firstName} {profile.lastName}</h1>
              <button>&#9662;</button>
            </div>
          </div>

          <div>
            <h1 className="font-bold" onClick={handleButtonClick}>X</h1>
          </div>
        </div>

<div className=" flex flex-row justify-center h-[50%] px-1 items-center mx-2">
  <textarea
    className="w-1/2 h-full px-3 resize-none rounded-lg"
    placeholder="What's on your mind?"
    id="postContent"
    value={caption}
    onChange={handleCaptionChange}
  ></textarea>
            {selectedMediaUrl && (
            <div className='w-1/2 bg-pink h-full flex justify-center items-center'>
              <img src={selectedMediaUrl} alt="Media Preview" className='rounded-lg object-cover h-full w-auto' />
            </div>
          )}
</div>

        <div className="flex flex-row justify-between items-center mx-4">
          <div className="flex flex-row">
            <button onClick={handleMediaUpload} className="text-[30px]">
              &#128444;
            </button>
            <input
              type="file"
              accept='image/*'
              id="mediaInput"
              name="mediaInput"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <button onClick={handlePost} className="bg-green-400 px-4 py-2 rounded-lg">Post</button>
          </div>
        </div>
      </div>
      )}
    </div>
    )}
   </div>
  );
};

export default SharePost
