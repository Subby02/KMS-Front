import React from "react";
import EmployeeForm from "../../components/EmployeeForm";

const EmployeeRegisterPage = () => {
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      minHeight: "100vh", padding: "20px"
    }}>
      <div style={{
        width: "100%", maxWidth: "640px", backgroundColor: "#fff",
        padding: "32px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>직원 가입</h2>
        <EmployeeForm />
      </div>
    </div>
  );
};

export default EmployeeRegisterPage;
