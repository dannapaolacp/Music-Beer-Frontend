import React from "react";
import { GridLoader } from "react-spinners";

const SpinnerLoading = () => {
  return (
    <div className="spinner-container">
      <GridLoader color={"white"} loading={true} size={50} />
      <p>Cargando...</p>
    </div>
  );
};

export default SpinnerLoading;
