import React from "react";
import FilterByOrigin from "./child/FilterByOrigin";
import FilterByType from "./child/FilterByType";

function FilterOptions() {
  return (
    <div>
      <FilterByOrigin />
      <FilterByType />
    </div>
  );
}

export default FilterOptions;
