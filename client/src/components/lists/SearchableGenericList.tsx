import { IEntity } from "../../interfaces/EntityInterfaces";
import { IGenericListProps } from "../../interfaces/Interfaces";
import { withSearchable } from "./SearchableList";

const GenericList = <T extends IEntity>({
  data,
  getKey,
  renderUI,
  filterBy,
  searchS,
}: IGenericListProps<T>) => {
  const filtering = (entity: T) => {
    return filterBy(entity, searchS);
  };

  return (
    <>
      {data.filter(filtering).map((entity) => {
        return <div key={getKey(entity)}>{renderUI(entity)}</div>;
      })}
    </>
  );
};

const SearchableGenericList = withSearchable(GenericList);

export default SearchableGenericList;
