import React from "react";

function FilterByType() {
  return (
    <div>
      <select>
        //map type.name
        <option>--Select Pokemon Type--</option>
        <option value="type"></option>
      </select>
    </div>
  );
}

export default FilterByType;
