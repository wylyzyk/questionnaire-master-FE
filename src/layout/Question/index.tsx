import * as React from "react";
import { Outlet } from "react-router-dom";

export const Question: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
