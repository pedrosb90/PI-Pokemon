import React from "react";

function FilterByOrigin() {
  return (
    <div>
      <select>
        <option>--Select Origin--</option>
        <option value="api">API</option>
        <option value="created">New Creations</option>
      </select>
    </div>
  );
}

export default FilterByOrigin;
