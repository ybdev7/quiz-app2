import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { IQuiz } from "../interfaces/EntityInterfaces";

export const config: { serverAddress: string; quizURL: string } = {
  serverAddress: "http://localhost", //TBD - remove
  quizURL: "quiz",
};

//The worker that will perform quizzes operations
export class QuizWorker {
  /**
    List all quizzes
   * @return An array of quizzes
   */
  public async listQuizzes(): Promise<IQuiz[]> {
    console.log("QuizWorker.listQuizzes()");

    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/${config.quizURL}`
    );
    return response.data;
  } /* End listQuizzes() */

  /**
   * Deletes a single quiz
   * @param id - id of quiz to be deleted
   */
  public async deleteQuiz(id: string): Promise<void> {
    console.log(`QuizWorker.deleteQuiz(${id})`);
    await axios.delete(`${config.serverAddress}/quiz/${id}`);
  }

  /**
   * Adds a new quiz on server
   * @param quiz - new quiz to be added
   * @returns newly added quiz
   */
  public async addQuiz(quiz: IQuiz): Promise<IQuiz> {
    console.log(`QuizWorker.addQuiz(${quiz.title})`);

    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/${config.quizURL}`,
      quiz
    );
    return response.data;
  }

  /**
   *  Updates existing quiz
   * @param quiz update quiz to be sent to server
   * @returns updated quiz
   */
  public async updateQuiz(quiz: IQuiz): Promise<IQuiz> {
    console.log(`QuizWorker.updateQuiz(${quiz.title})`);

    const response: AxiosResponse = await axios.put(
      `${config.serverAddress}/${config.quizURL}`,
      quiz
    );
    return response.data;
  }
}

export enum ServerAPIsEnum {
  Quizzes = "quiz",
}

export const useGetQuizzes = () =>
  useQuery(ServerAPIsEnum.Quizzes, new QuizWorker().listQuizzes);
