import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({
  usuario,
  children
}) => {

  return (
    <div className="dashboard-layout">

      <Sidebar usuario={usuario} />

      <main className="dashboard-main">

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;