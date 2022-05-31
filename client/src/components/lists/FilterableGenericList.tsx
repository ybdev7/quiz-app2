import { IGenericFilterableListProps } from "../../interfaces/Interfaces";
import { withFilterable } from "./FilterableList";
import { IEntity } from "../../interfaces/EntityInterfaces";

const FGenericList = <T extends IEntity>({
  data,
  getKey,
  renderUI,
  filterBy,
  filterInfo,
}: IGenericFilterableListProps<T>) => {
  const filtering = (entity: T) => {
    if (filterInfo) return filterBy(entity, filterInfo); //tbd
  };

  return (
    <>
      {data.filter(filtering).map((entity) => {
        return <div key={getKey(entity)}>{renderUI(entity)}</div>;
      })}
    </>
  );
};

const FilterableGenericList = withFilterable(FGenericList);

export default FilterableGenericList;
