import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loader = ({ color }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Backdrop open={true}>
        <CircularProgress color={color} />
      </Backdrop>
    </div>
  );
};

export default Loader;
