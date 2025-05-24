import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen  bg-gray-200">
      <main className="flex-grow container mx-auto p-4">{children}</main>
    </div>
  );
};

export default RootLayout;
