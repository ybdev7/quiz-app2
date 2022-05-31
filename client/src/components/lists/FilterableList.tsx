import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { FilterNames } from "../../factory/FilterFactory";
import {
  ExtraType,
  FilterableItem,
  FilterTerm,
  IGenericFilterableListProps,
} from "../../interfaces/Interfaces";
import FilterUI from "./FilterUI";
import { IEntity } from "../../interfaces/EntityInterfaces";

export function withFilterable<P extends IGenericFilterableListProps<IEntity>>(
  WrappedComponentA: React.ComponentType<P>
) {
  const ComponentWithFilter = (props: Omit<P, keyof ExtraType>) => {
    //get all available filters as pairs pf <filter name, default option for filtering>
    const [filters, setFilters] = useState<Map<FilterNames, FilterableItem>>(
      new Map(props.filterBuilder.getDefaultFilters())
    );

    const handleFilterChange = (
      filterName: FilterNames,
      filter: FilterableItem
    ) => {
      setFilters(new Map(filters).set(filterName, filter));
    };

    //set filtering terms (the condition function) for each filter
    const filterTerms: FilterTerm[] = [];
    filters.forEach((value, key) =>
      filterTerms.push(props.filterBuilder.getFilterTerm(value))
    );

    //generate filters' ui
    const ui: React.ReactNode[] = [];
    return (
      <>
        {props.filterBuilder
          .getFilters()
          .forEach((filterItems, filterName) =>
            ui.push(
              <FilterUI
                key={uuidv4()}
                handleFilterChange={handleFilterChange}
                filterName={filterName}
                items={filterItems}
                choosen={filters.get(filterName)}
                label={props.filterBuilder.getFilterDisplayLabel(filterName)}
              />
            )
          )}
        <div className="filters-div">{ui}</div>
        <WrappedComponentA {...(props as P)} filterInfo={[...filterTerms]} />
      </>
    );
  };

  const displayName =
    WrappedComponentA.displayName || WrappedComponentA.name || "Component";
  ComponentWithFilter.displayName = `Filterable${displayName}`;

  return ComponentWithFilter;
}
