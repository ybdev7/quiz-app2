import { FC, ReactElement, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import QuizList, {
  QuizFilterableSearchableListProps,
} from "../components/quiz/QuizList";
import { IQuiz } from "../interfaces/EntityInterfaces";
import { useGetQuizzes } from "../utils/QuizWorker";

const Home: FC<{}> = (): ReactElement => {
  const { status, error, data } = useGetQuizzes();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      console.log(`Home.useEffect - got ${data.length} quizzes`);
    }
  }, [data]);

  if (status === "loading") {
    return (
      <>
        <div>
          <p>Loading</p>
        </div>
      </>
    );
  } else if (status === "error") {
    return (
      <>
        <p>Error</p>
      </>
    );
  }
  return (
    <>
      <div>
        {data && (
          <QuizList
            {...new QuizFilterableSearchableListProps(data as IQuiz[])}
          />
        )}
      </div>
    </>
  );
};

export default Home;
