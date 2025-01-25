"use client";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from "react";

const Generate = () => {
  const notify = () => toast("Added link successfully!");

  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [handle, setHandle] = useState("");
  const [picture, setPicture] = useState("");

  const handleLinkChange = (index, link, linkText) => {
    setLinks((initializeLink) =>
      initializeLink.map((item, i) => {
        if (i === index) {
          return { link: link, linkText: linkText };
        } else {
          return item;
        }
      })
    );
  };

  const addLink = () => {
    setLinks([...links, { link: "", linkText: "" }]);
    notify(); // Notify when a link is added
  };

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

      setHandle("");
      setPicture("");
      notify();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex justify-center py-8 pt-[30vh]">
      <div className="w-full max-w-lg bg-gray-700 rounded-lg fixed shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg text-center mb-6">
          Create Your Bittree
        </h1>

        {/* Step 1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Choose Your Handle</h2>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Choose your handle"
            className="w-full rounded-lg px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
        </div>

        {/* Step 2 */}
        <div className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Step 2: Add Links</h2>
          {links.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-4 mb-3">
              <input
                type="text"
                value={item.linkText}
                onChange={(e) => handleLinkChange(index, item.link, e.target.value)}
                placeholder="Link Text"
                className="flex-1 rounded-lg px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
              />
              <input
                type="text"
                value={item.link}
                onChange={(e) => handleLinkChange(index, e.target.value, item.linkText)}
                placeholder="Link URL"
                className="flex-1 rounded-lg px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
              />
            </div>
          ))}
          <button
            onClick={addLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg shadow-lg transition-all"
          >
            + Add Link
          </button>
        </div>

        {/* Step 3 */}
        <div className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Step 3: Add Picture and Finalize</h2>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Picture URL"
            className="w-full rounded-lg px-4 py-3 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-700 transition-all mt-6 w-full"
        >
          Create Bitlink
        </button>
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