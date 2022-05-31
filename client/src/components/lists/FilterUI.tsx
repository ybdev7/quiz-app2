import { v4 as uuidv4 } from "uuid";
import { FilterNames, UNCHOOSABLE } from "../../factory/FilterFactory";
import { FilterableItem } from "../../interfaces/Interfaces";

interface IFilterUIProps {
  filterName: FilterNames;
  items: FilterableItem[];
  choosen: FilterableItem | undefined;
  handleFilterChange: (filterName: FilterNames, filter: FilterableItem) => void;
  showLabel?: boolean;
  label: string;
}

const FilterUI = ({
  filterName,
  items,
  choosen,
  handleFilterChange,
  showLabel = true,
  label,
}: IFilterUIProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const term = items.find((item) => {
      if (item.displayValue === parseInt(event.target.value)) return item;
    });
    if (term) {
      handleFilterChange(filterName, term);
    }
  };
  return (
    <>
      {showLabel && (
        <label className="filters-label" htmlFor="filter1">
          {label}
        </label>
      )}
      <select
        className="filters-select"
        id={uuidv4()}
        value={choosen ? choosen.displayValue : items[0].displayValue}
        onChange={handleInputChange}
      >
        {items.map(
          (i) =>
            i && (
              <option
                key={uuidv4()}
                disabled={i.displayValue === UNCHOOSABLE}
                value={i.displayValue}
              >
                {i.displayName}
              </option>
            )
        )}
      </select>
    </>
  );
};

export default FilterUI;
