import Button from "../components/Button";
import React from "react";
const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center ">
        <h1>MansTalk </h1>
        <h3>
          <p>
            We talk about the stuff group chats pretend they don’t talk about.
          </p>

          <h4>No judgement. No cringe. Just straight answers.</h4>
        </h3>
        <Button label="lets discuss" />
      </div>
    </>
  );
};

export default Home;
