import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./loading";

const Notify = () => {
  const { notify } = useSelector((state) => state);

  // console.log(notify);
  // console.log(state);

  return <div>{notify.loading && <Loading />}</div>;
};

export default Notify;
