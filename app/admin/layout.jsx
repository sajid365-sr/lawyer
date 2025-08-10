import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {children}
    </div>
  );
};

export default AdminLayout;
