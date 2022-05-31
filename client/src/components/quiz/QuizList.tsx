import { QuizFiltersBuilder } from "../../factory/FilterFactory";
import { IEntity, IQuiz } from "../../interfaces/EntityInterfaces";
import { IFilterBuilder } from "../../interfaces/Interfaces";
import Quiz from "./Quiz";
import FSGenericList, {
  BaseFilterableSearchableListProps,
} from "../lists/FSList";

const QuizList = ({ ...props }: QuizFilterableSearchableListProps) => {
  return (
    <>
      <div
        className="bg-blue-50 shadow-md
        ml-0 mr-0 
       lg:ml-40 xl:ml-40
       lg:mr-40 xl:mr-40"
      >
        <div
          className=" h-24 sm:h-24 md:h-32 lg:32 flex
          justify-center items-center
          mb-2 text-violet-700 text-center bg-violet-200 rounded"
        >
          <div>
            <span className=" text-[36px] font-['Papyrus']">
              <span className="italic font-bold">EZ</span>ie
              <span className="italic font-bold">Q</span>uizzies
            </span>
            <p className=" text-lg font-['Brush_Script_MT']">
              Simply the best quizzes for every subject
            </p>
          </div>
        </div>
        <FSGenericList {...props} />
      </div>
    </>
  );
};

export default QuizList;

export class QuizFilterableSearchableListProps extends BaseFilterableSearchableListProps {
  public filterBuilder: IFilterBuilder<IQuiz>;

  constructor(data: IQuiz[]) {
    super(data);
    this.data = data;

    this.filterBuilder = new QuizFiltersBuilder();
    this.filterInfo = this.filterBuilder.getFilterTerms();
    this.searchS = "";
  }

  public renderUI = (entity: IEntity) => {
    console.log(`Set to render quiz id=${entity._id}`);
    return <Quiz key={`quiz-l-${entity._id}`} quiz={entity as IQuiz} />;
  };

  public searchBy = (entity: IEntity, searchStr: string): boolean => {
    const lcsearchS = searchStr.toLocaleLowerCase();
    return (
      lcsearchS === "" ||
      (entity as IQuiz).title.toLowerCase().includes(lcsearchS) ||
      (entity as IQuiz).desc.toLowerCase().includes(lcsearchS)
    );
  };
}
