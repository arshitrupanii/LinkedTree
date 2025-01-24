"use client";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from "react";
import { Rethink_Sans } from 'next/font/google';

const Generate = () => {
  const notify = () => toast("Added link successfully!");

  // const [link, setLink] = useState("");
  // const [linkText, setLinkText] = useState("");
  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [handle, setHandle] = useState("");
  const [picture, setPicture] = useState("");

  const handleLinkChange = (index, link, linkText) => {
    setLinks((initializeLink) =>
      initializeLink.map((item, i) => {
        if (i === index) {
          return { link: linkText, linkText: link }; // Fixed the parameters
        } else {
          return item;
        }
      })
    );
  };
  
  
  const addLink = () => {
    setLinks([...links, { link: "", linkText: "" }]);
  }

  const handleSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      picture: picture,
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/api/add", requestOptions);
      const data = await response.json();
      console.log(data.message);

      // Reset fields after submission
      setHandle("");
      setPicture("");

      notify();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div
      className="min-h-[120vh] grid grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col justify-center px-[10vw] space-y-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Create your Bittree
        </h1>

        {/* Step 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Step 1: Choose your handle
          </h2>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Choose your handle"
            className="w-full rounded-lg px-4 py-3 bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
          />
        </div>

        {/* Step 2 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Step 2: Add links
          </h2>
          {links && links.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item.linkText}
                onChange={(e) => handleLinkChange(index, item.linkText ,e.target.value)}
                placeholder="Link Text"
                className="flex-1 rounded-lg px-4 py-3 bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
              />
              {console.log(item, index)}
              <input
                type="text"
                value={item.link}
                onChange={(e) => handleLinkChange(index, item.link, e.target.value)}
                placeholder="Link URL"
                className="flex-1 rounded-lg px-4 py-3 bg-white text-black placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
              />
            </div>
          ))}
          <button onClick={()=>addLink()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg">+ Add Link</button>

          
        </div>

        {/* Step 3 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Step 3: Add picture and finalize
          </h2>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Picture URL"
            className="w-full rounded-lg px-4 py-3 bg-white text-black aceholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
          />
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all">Create Bitlink</button>
      </div>

      {/* Right Section */}
      <div className="w-full h-[120vh] object-cover ">
        <img
          src="/img2.png"
          alt="Background"
          className="w-full h-full object-cover"
        />

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>

  );
};

export default Generate;
