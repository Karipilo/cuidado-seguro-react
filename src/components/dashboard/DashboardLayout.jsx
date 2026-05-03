import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({
  usuario,
  paciente,
  children
}) => {

  return (
    <div className="dashboard-layout">

      <Sidebar
        usuario={usuario}
        paciente={paciente}
      />

      <main className="dashboard-main">

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;