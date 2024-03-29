import React from "react";
import Image from "next/image"; // Assuming you installed next-images

const LandingPage = () => {
  return (
    <div className="landing-page h-screen flex overflow-hidden">
      {/* <div className="image-container w-1/2">
        <Image
          src="/graph_3068300.jpg"
          alt="Data Analysis"
          width={800}
          height={800}
        />
      </div> */}
      <div className="content-container flex flex-col justify-center items-center w-1/2 text-gray-600 bg-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Data Hub</h1>
        <p className="text-lg mb-10">
          Gain insights and make informed decisions.
        </p>
        <a href="/dashboard" className="btn border p-4 rounded-md bg-blue-500 font-semibold btn-primary">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
