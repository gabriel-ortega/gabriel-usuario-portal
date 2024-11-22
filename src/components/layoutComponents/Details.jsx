import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube, FaLinkedin    } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlinePhone, HiOutlineLocationMarker, HiInformationCircle } from "react-icons/hi";
import { Alert } from 'flowbite-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export  function Details() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {displayName:accountName} = useSelector(state => state.auth);

  const {displayName:userDisplayName, userData} = useSelector(state => state.userData);

  const { applicationStage, isLoading, isSaving } = useSelector(state => state.userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 const handleSubmit = (e) => {
    e.preventDefault(); 
    emailjs.send('service_gyga2zh', 'template_f2tdkq3', {
      name: userDisplayName ? userDisplayName : accountName,
      email: userData.email,
      message: formData.message
    }, 'riCDs4EbZHt5txCm8')
      .then((response) => {
        setFormData({ 
          name: userDisplayName ? userDisplayName : accountName,
          email: userData.email,
          message: ''
        });
        toast.success('E-mail Sent!');
      })
      .catch((error) => {
        toast.error('Oops! Something went wrong. Try again.');
      });
  }; 
  
  return (
    <>
<section> 
        <div className="md:w-full h-50 grid md:grid-cols-2 grid-cols-1 text-black  gap-3 rounded-xl   mb-4 md:mb-5">
        <section className=' bg-white border-2 border-blue-200   rounded-xl p-3'> 
        <h2 className="text-4xl mb-4 font-bold text-center">Contact Us</h2>
            <div className="flex items-center mb-4">
              <HiOutlinePhone className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Lanline Number:</h1>
                <a className='md:text-base text-6px text-[#1976d2]'  target="_blank" href="tel:+507373-4907">+507 373-4907 / </a>
                <a className='text-base text-[#1976d2]' target="_blank" href="tel:+507373-4908 "> +507 373-4908 / </a><br></br>
                  <a className='text-base text-[#1976d2]'  target="_blank" href="tel:+507373-4908 ">+507 788-6592 / </a>
                <a className='text-base text-[#1976d2]'  target="_blank" href="tel:+507373-4908 ">+507 788-6596  </a>
              </div>
            </div>
            <div className="flex items-center mb-4 ">
              <FaWhatsapp className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Mobile Phone Number:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://wa.me/50767816847">+507 6781-6847 / </a>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://wa.me/50763798319">+507 6379-8319</a>

              </div>
              </div>
           
            <div className="flex items-center mb-4">
              <MdOutlineEmail className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Email:</h1>
                <a className='text-base text-[#1976d2] '  href="mailto:gerentecalidad@mp-ip.edu.pa">gerentecalidad@mp-ip.edu.pa / </a>
                <a className='text-base text-[#1976d2] ' href="mailto:maritimecenter@mp-ip.edu.pa">maritimecenter@mp-ip.edu.pa</a>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <HiOutlineLocationMarker className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Address:</h1>
                <h2 className='font-bold text-base'> Panama City: </h2>
                <span className="block text-sm">Perejil Urb., 3rd Street, PH Barcelona building. Local #1. Panama Rep. of Panama.</span>
                <h2 className='font-bold text-base'> David, Chiriquí:  </h2>
                <span className="block text-sm">El Carmen, Calle A Sur, Entre Ave. 2da y 3era Este, David-Chiriquí, Panamá.</span>
              </div>
            </div>
            </section>
            <section className=' bg-white border-2 border-blue-200   rounded-xl p-3'>  
            <h2 className="text-4xl mb-4 font-bold text-center">Follow Us</h2>
            
            <div className="flex items-center mb-4">
              <FaInstagram className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Instagram:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://www.instagram.com/mpip_panama/">mpip_panama </a>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FaFacebook className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Facebook:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://www.facebook.com/mpippanama">Maritime Professional Institute of Panama </a>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FaLinkedin  className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">LinkedIn:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://www.linkedin.com/company/maritime-professional-institute-of-panama/">MARITIME PROFESSIONAL INSTITUTE OF PANAMA</a>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FaYoutube  className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">YouTube:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://www.youtube.com/@mpip-panama">MPIP - Maritime Professional Institute Of Panama</a>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <TbWorldWww className="mr-2 h-7 w-7" />
              <div className="ml-2 text-start">
                <h1 className="text-lg font-bold">Web Site:</h1>
                <a className='text-base text-[#1976d2]' target="_blank" href="https://mp-ip.edu.pa/">https://mp-ip.edu.pa/</a>
              </div>
            </div>
            </section>

           
          </div>
          <section className="bg-white border-2 border-blue-200 p-4 md:w-full h-50 flex flex-col text-black gap-3 rounded-xl mb-4 md:mb-5">
          <section className=" flex items-start justify-center">
  
            <span className="font-medium flex items-start justify-center">If you want to quote a procedure or course you can fill out the following form detailing what you want to quote. </span><br></br>
         
          </section>
          <section className='flex items-center justify-center'> 
          <section className=" h-auto p-4 w-full md:w-1/2 border-2 border-blue-200 text-black    md:mr-4 space-y-8  rounded-xl mb-4">
              <form className="max-w-md mx-auto   md:max-w-none" onSubmit={handleSubmit}>
                <section className="mb-4 text-start">
                  <label className="block text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-gray-500 border-gray-200 rounded"
                    type="text"
                    id="name"
                    name="name"
                    value={userDisplayName?userDisplayName:accountName}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </section>
                <section className="mb-4 text-start">
                  <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 border-gray-200 rounded text-gray-500"
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </section>
                <section className="mb-4 text-start">
                  <label className="block text-sm font-bold mb-2" htmlFor="message">
                  Message 
                  </label>
                  <textarea
                   placeholder='State which course or procedure you are interestated'
                     className="w-full px-3 py-2 border-gray-400 rounded text-black"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </section>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </section>
            </section>
          </section>
          {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <p>{modalMessage}</p>
              <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        )}
          </section>  
   </>
  )
}
