import { FilterNames } from "../factory/FilterFactory";
import { IEntity } from "./EntityInterfaces";

export interface IListProps<T extends IEntity> extends Searchable {
  data: Array<T>;
}

export type Searchable = {
  searchS: string;
};

export interface IGenericListProps<T extends IEntity> extends Searchable {
  data: Array<T>;
  getKey: (entity: T) => string;
  renderUI: (entity: T) => React.ReactNode;
  filterBy: (entity: T, searchStr: string) => boolean;
}

export type Filter<V extends string | number | Date> = {
  filterName: string;

  items: FilterItem<V>[];
};

export type FilterItem<V extends string | number | Date> = {
  displayName: string;
  displayValue: V;
  filterName: FilterNames;
};

export type FilterableItem = FilterItem<number>;

export type Filterable = Filter<number>;
export type FilterTerm = {
  filterName: FilterNames;
  filterValue: FilterableItem;
  compFn: (item: any) => boolean;
};
export type ExtraType = {
  filterInfo: FilterTerm[] | null;
};

export interface IGenericFilterableListProps<T extends IEntity>
  extends ExtraType {
  data: Array<T>;
  getKey: (entity: T) => string;
  renderUI: (entity: T) => React.ReactNode;
  filterBy: (entity: T, filterTerm: FilterTerm[]) => boolean;
  filterBuilder: IFilterBuilder<T>;
}
export interface IFilterBuilder<T extends IEntity> {
  getFilterItems: (filterName: FilterNames) => FilterableItem[];
  getFilterTerm: (filterStr: FilterableItem) => FilterTerm;

  getFilterTerms: () => FilterTerm[];

  getFilters: () => Map<FilterNames, FilterableItem[]>;
  getDefaultFilters: () => Map<FilterNames, FilterableItem>; //returns default choises for every filter
  getFilterDisplayLabel: (filterName: FilterNames) => string;
}

//
export interface IGenericFilterableSearchableListProps<T extends IEntity>
  extends ExtraType,
    Searchable {
  data: Array<T>;
  getKey: (entity: T) => string;
  renderUI: (entity: T) => React.ReactNode;
  filterBy: (entity: T, filterTerm: FilterTerm[]) => boolean;
  searchBy: (entity: T, searchS: string) => boolean;
  filterBuilder: IFilterBuilder<T>;
  filterInfo: FilterTerm[] | null;
}
