import React from "react";
import style from "../Paginate/Paginate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage,handleNumber} from "../../redux/actions";

export default function Paginate({ cantPages }) {
  console.log("Paginate");
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  function next() {
    dispatch(nextPage());
  }
  function prev() {
    dispatch(prevPage());
  }
  function number(n) {
    dispatch(handleNumber(n));
  }
  return (
    <div className={style.page}>
      {numPage > 1 ? (
        <div>
          <button onClick={prev}>PREV</button>
          <p>{numPage - 1}</p>
        </div>
      ) : null}

      <h3>{numPage}</h3>
      {numPage < cantPages ? (
        <div>
          <p>{numPage + 1}</p>
          <button onClick={next}>NEXT</button>
        </div>
      ) : null}
    </div>
  );
}
