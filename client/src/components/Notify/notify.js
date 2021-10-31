import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  // console.log(notify);
  // console.log(state);

  return (
    <div>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ title: "Error", body: notify.error }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ title: "Exito", body: notify.success }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Notify;
