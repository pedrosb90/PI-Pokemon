import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions";
import styles from "../styles/bodyText.module.css";

const Types = () => {
  const dispatch = useDispatch();

  const typeInfo = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  console.log(typeInfo);
  return (
    <div>
      <h1 className={`${styles.title}`}>Types</h1>
      <ul>
        {typeInfo.map((type, index) => (
          <li key={index}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Types;
