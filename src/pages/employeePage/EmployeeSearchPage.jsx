
import React from "react";
import EmployeeSearch from "../../components/EmployeeSearch";

const EmployeeSearchPage = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>직원 정보 조회</h2>
        <EmployeeSearch />
      </div>
    </div>
  );
};

export default EmployeeSearchPage;
