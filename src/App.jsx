import LoginPage from "./components/LoginSignup/LoginPage";
import SignUpPage from "./components/LoginSignup/SignUpPage";
import EmailVerification from "./components/LoginSignup/EmailVerification";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SharePost from "./components/SharePost";
import NewsWindow from "./components/NewsWindow";
import UserProfile from "./components/userprofiles/UserProfile";
import Networking from "./components/networks/Networking";
import Messages from "./components/message_components/Messages";
import Chats from "./components/message_components/Chats";
import Notification from "./components/notification_page/Notification";
import Post from "./components/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from './components/message_components/context/UserContextProvider'
import { useState, useEffect } from 'react';
import './style.css';
import EXP from './components/EXP'

function App() { 

  const [showHomePage, setShowHomePage] = useState(true);

  const toggleComponent = () => {
    setShowHomePage((prev) => !prev);
  };

  // Add a state to track the screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Update the isMobile state when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router basename="/linkedInfiles">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path='/Navbar' element={<Navbar/>}/>
      </Routes>
      <Navbar/>
      <div>
        <Routes>
        
          <Route
            path="/profile"
            element={
              <div className="flex flex-col justify-center md:flex-row md:gap-4">
                <div>
                <Profile />
                </div>
                <div className="flex flex-col gap-2 md:w-[500px]">
                <SharePost />
                <Post/>
                </div>
                <div>
                <NewsWindow />
                </div>
              </div>
            }
          />
          <Route path="/share-post" element={<SharePost />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/EXP" element={<EXP />} />
          <Route path='/UserProfile/:userId' element={<UserProfile/>} />
          <Route
            path="/notification"
            element={
              <div className="flex flex-row justify-center items-center">
                <Notification />
              </div>
            }
          />
          
          <Route
            path="/messages"
            element={
              <div className="flex flex-col w-full h-screen justify-center gap-5  bg-slate-500">
               <div>
                <UserContextProvider>
                  {isMobile ? (
                    <div className="w-full flex flex-row justify-center items-center md:flex-row">
                      <div className="" onClick={toggleComponent}>
                          {showHomePage ? <Messages/> : null}
                      </div>
                      <div className="">
                          {showHomePage ? null : <Chats/>}
                      </div>
                    </div> ) : (

                    <div className="flex justify-center flex-row">
                      <Messages/>
                      <Chats/>
                    </div>
                  )}

                  </UserContextProvider>
                </div>
                </div>
            }
          />
          <Route path="/chats" element={<Chats />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
