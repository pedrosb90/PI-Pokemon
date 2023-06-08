import React from "react";
import styles from "../../styles/accesories/indexButtons.module.css";
import styles1 from "../../styles/infoText.module.css";

const Pagination = ({ page, setPage, max }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <input
        className={styles.onPage}
        type="number"
        min="1"
        max={max}
        value={page}
        onChange={(event) => setPage(parseInt(event.target.value))}
      />
      <br />
      <p className={`${styles.pageNumber} ${styles1.content}`}>
        of {Math.floor(max)}
      </p>
      <button
        className={styles.button}
        onClick={() => setPage(page + 1)}
        disabled={page === max}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
