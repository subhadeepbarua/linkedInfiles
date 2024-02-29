import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const contactFormData = useSelector((state) => state.contactFormData);
  const navigate = useNavigate();

  const generateUniqueId = (firstName, email) => {
    const uniqueId = `${firstName.substring(0, 3)}_${email.substring(0, 3)}_${Math.random().toString(36).substring(7)}`;
    return uniqueId;
};

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (index > 0 && value === '') {
        inputRefs[index - 1].current.focus();
      }

      if (index < 3 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const mergedInteger = parseInt(otp.join(''));

  const navigateToDisplay = async () => {

    const uniqueId = generateUniqueId(contactFormData.firstName, contactFormData.email);
        const dataWithUniqueId = { ...contactFormData, userId:uniqueId};
    console.log('Verifying OTP:', mergedInteger);
    
    // Make a request to verify the OTP on the server
    axios.post('https://linkedinclone-3p0r.onrender.com/verify-otp', {
      email: contactFormData.email,
      otp: mergedInteger,
    })
      .then(response => {
        console.log('Response from backend:', response.data);
        // Check the response for successful OTP verification
        if (response.data === 'OTP verified successfully') {
          try {
            // Sending data to Node.js server
            const response = axios.post('https://linkedinclone-3p0r.onrender.com/save-user-data', dataWithUniqueId);
            console.log(response.data);
        } catch (error) {
            console.error('Error saving user data:', error.response ? error.response.data : error.message);
        }
         navigate('/')
        } else {
          // Show an alert for unsuccessful OTP verification
          alert('Invalid OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
        // Handle error accordingly (e.g., show an error message)
      });

      console.log('Rendering EmailVerification component');
  };
  

  return (
    <div className="bg-[#0077b5] flex flex-col h-screen text-white">
      <div className='w-100 m-auto flex flex-col gap-5'>
        <div className='text-[50px]'>
          <h1>LinkedIn</h1>
        </div>

        <div className="bg-white p-8 rounded-md shadow-md w-100 m-auto">
          <p className="text-black">Enter the 4-digit OTP sent to your email address.</p>
          <p className="mb-6 text-black font-bold">{contactFormData.email}</p>
          <div className="flex gap-2 mb-6 text-black">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                ref={inputRefs[index]}
                className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-md text-center text-lg font-semibold"
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={navigateToDisplay}>
            Verify OTP
          </button>
          <div className='flex flex-row justify-between mt-4'>
            <p className="text-black">Did not receive the OTP?</p>
            <p className='text-black'> Resend OTP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;