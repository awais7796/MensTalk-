import Button from "../components/Button";
import React from "react";
import Pattern from "../components/Pattern";

const Home = () => {
  return (
    <>
      <Pattern>
        <div className="flex flex-col h-screen justify-center items-center bg-[#0F0E0D] text-[#E8DCC4] px-4 text-center">
          <h1 className="text-5xl font-semibold tracking-wide mb-4 text-[#E8DCC4]">
            MansTalk
          </h1>

          <p className="text-lg max-w-xl mb-2 text-[#CFC4AA] leading-relaxed">
            We talk about the conversations men keep hidden behind the silence.
          </p>

          <h4 className="text-md max-w-md mb-10 text-[#AFA48D]">
            No judgement. No cringe. Just straight truth.
          </h4>

          <Button label="Let's Discuss" />
        </div>
      </Pattern>
    </>
  );
};

export default Home;
