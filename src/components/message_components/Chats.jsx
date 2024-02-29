import {useContext} from 'react'
import UserContext from './context/UserContext'

const Chats = () => {

  const {user} = useContext(UserContext)

  if (!user) return <div className='bg-blue-400 w-[100vw] h-[100vh] md:w-[400px] md:h-[90vh] md:border-[1px] md:border-black mt-[70px] md:rounded-r-lg flex flex-col justify-center items-center'>please login</div>

  return (
    
<div className="bg-white w-[100vw] md:w-[400px] md:border-[1px] md:border-black h-[100vh] md:h-[90vh] flex flex-col mt-[92px] md:mt-[70px] md:rounded-r-lg">
      <div className=" flex flex-row border-b border-gray-300">
        <div className="w-[70%] flex flex-col mx-1">
          <h1 id='userName' className="text-[14px]">{user.username}</h1>
          <p className="text-[12px] text-[#00000099] overflow-hidden whitespace-nowrap text-overflow-ellipsis ">
            {user.description}
          </p>
        </div>

        <div className="w-[30%] flex flex-row justify-around items-center text-2x">
          <div>&#x2026;</div>
          <div>&#128249;</div>
          <div>&#x2606;</div>
        </div>
      </div>

      <div className="flex flex-col ">
        <img id='profile' className="w-[50px] h-[50px] border-[1px] border-black rounded-full m-1" src={user.profilepic} alt="account"></img>

        <div className="flex flex-col mx-auto w-[95%]">
          <h1 id='userName' className="text-[16px] font-bold">{user.username} . 1st</h1>
          <p className="text-[12px] text-[#00000099]">
            {user.description}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <div className="mx-4 text-gray-600">Date</div>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      
     {/* ++++++++++++++++++++ */}
     
     <div className="mt-auto rounded-r-lg">
     <div className="flex flex-col bg-white md:rounded-r-lg">
      <div className="flex flex-row justify-center gap-2 border-t border-b border-gray-300 py-2">
        <textarea className="bg-[#F4F2EE]  w-[85%] h-[100px] rounded-md p-2"></textarea>
        <button className="w-5">A</button>
      </div>

      <div className="flex flex-row justify-between m-3 md:rounded-r-lg ">
        <div className="flex flex-row gap-2 md:rounded-r-lg">
         <h1>&#128444;</h1>
         <h1>🔗</h1>
         <h1>😊</h1>
         <h1>GIF</h1>
        </div>
        <div className="flex flex-row gap-2 items-center rounded-r-lg ">
        <h1 className="bg-[#F4F2EE] text-[14px] px-2 rounded-2xl ">Send</h1>
        <h1>&#x2026;</h1>
        </div>

      </div>
      </div>
     </div>
     </div>
  );
};

export default Chats;