import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../actions";
import styles from "../styles/bodyText.module.css";
import styles1 from "../styles/cardDisplay.module.css";
import styles3 from "../styles/infoText.module.css";

const Types = () => {
  const dispatch = useDispatch();

  const typeInfo = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  console.log(typeInfo);
  return (
    <div>
      <h1 className={`${styles.title}`}>Pokemon Types</h1>
      <ul className={`${styles1.typeContainer} `}>
        {typeInfo.map((type, index) => (
          <li
            className={`${styles1.typeCard} ${styles3.typeText} ${styles1.typeCardImage} `}
            key={index}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Types;
