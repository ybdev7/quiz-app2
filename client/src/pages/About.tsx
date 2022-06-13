import { FC, ReactElement } from "react";

const About: FC<{}> = (): ReactElement => {
  return (
    <div
      className="bg-blue-50 shadow-md
        ml-0 mr-0 
       lg:ml-40 xl:ml-40
       lg:mr-40 xl:mr-40"
    >
      <h3>About EZieQuizzies</h3>
      <p>EZieQuizzies is home to challenging, fun and free quizzes.</p>
    </div>
  );
};

export default About;
