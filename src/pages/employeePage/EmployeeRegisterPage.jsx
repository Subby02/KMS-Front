import React from "react";
import EmployeeForm from "../../components/EmployeeForm";
import "../../styles/EmployeeRegister.css";  

const EmployeeRegisterPage = () => {
  return (
    <div className="register-page-wrapper">
      <div className="register-page-container">
        <h2 className="register-page-title">직원 가입</h2>
        <EmployeeForm />
      </div>
    </div>
  );
};

export default EmployeeRegisterPage;

