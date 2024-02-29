import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContactFormData } from '../contextApi/actions';
import axios from 'axios';


const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeForm, setActiveForm] = useState('page1');
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    eStatus: "",
    jobTitle: "",
    eType: "",
    
    education: [
      { school: String,
        fromDate: String,
        toDate: String}
    ]
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "school" || name === "fromDate" || name === "toDate") {
      // If the field is school, fromDate, or toDate, update the education array
      setFormData(prevData => ({
        ...prevData,
        education: [{
          ...prevData.education[0],
          [name]: value
        }]
      }));
    } else {
      // For other fields, update the formData state normally
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setContactFormData(formData));
    try {
        const response = await axios.post('https://linkedinclone-3p0r.onrender.com/send-email', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
      }
    console.log('Form1 data submitted:', formData.email);
    navigate('/EmailVerification')
  
  };

  const handleBack = () => {
    setActiveForm('page1');
  };

  const handleNext = () => {
    setActiveForm('page2');
  };

  return (
    <div className='bg-[#0077b5] flex flex-col w-full h-screen justify-center items-center'>
        
    <div className={`bg-white flex flex-col w-[90%] h-[50%] md:w-[40%] justify-between items-center rounded-lg ${activeForm === 'page1' ? 'block' : 'hidden'}`}>
      <div className='bg-blue-400 flex flex-row justify-around w-full items-center rounded-t-lg '>
        <Link className='w-full flex flex-row justify-center p-4 font-bold text-[18px] rounded-tr-lg' to='/'><div>Login</div></Link>
        <div className='w-full flex flex-row justify-center p-4 bg-green-400 font-bold text-[18px] rounded-tr-lg'>SignUp</div>
      </div>

      <div className='flex flex-col gap-4 w-[90%]'>
        <input
          className='p-3 bg-slate-200 rounded-lg'
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className='p-3 bg-slate-200 rounded-lg'
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className='p-3 bg-slate-200 rounded-lg'
          type='password'
          placeholder='Confirm Password'
        />
      </div>

      <div className='flex flex-row w-[90%] justify-end mb-5'>
        <button
          className='bg-green-400 px-4 py-1 rounded-xl'
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>

    <div className={`bg-white p-8 rounded shadow-md w-100 ${activeForm === 'page2' ? 'block' : 'hidden'}`}>
      <h2 className="text-3xl font-semibold mb-4">Sign Up for LinkedIn</h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border rounded px-3 py-2"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border rounded px-3 py-2"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="w-full border rounded px-3 py-2"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full border rounded px-3 py-2"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="mb-4">
            <label htmlFor="eStatus" className="block text-gray-600">
              Employed or Student?
            </label>
            <select
              id="eStatus"
              name="eStatus"
              className="w-full border rounded px-3 py-2"
              value={formData.eStatus}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="Employed">Employed</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-gray-600">
              Most Recent Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className="w-full border rounded px-3 py-2"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eType" className="block text-gray-600">
              Employment Type
            </label>
            <select
              id="eType"
              name="eType"
              className="w-full border rounded px-3 py-2"
              value={formData.eType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Trainee">Trainee</option>
              <option value="NA">Not Aplicable</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="school" className="block text-gray-600">
              School/University Name
            </label>
            <input
              type="text"
              id="school"
              name="school"
              className="w-full border rounded px-3 py-2"
              value={formData.school}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="fromDate" className="block text-gray-600">
                Start Year
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                className="w-full border rounded px-3 py-2"
                value={formData.fromDate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="toDate" className="block text-gray-600">
                End Year
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                className="w-full border rounded px-3 py-2"
                value={formData.toDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button
              className="w-[40%] bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
              onClick={handleBack}
            >
              Back 
            </button>
            <button
              onClick={handleSubmit}
              className="w-[40%] bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              //onClick={handleNextEmail}
            >
              Sign Up
            </button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default SignUpPage
