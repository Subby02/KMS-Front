import React from "react";
import EmployeeSearch from "../../components/EmployeeSearch";
import "../../styles/EmployeeSearch.css";  

const EmployeeSearchPage = () => {
  return (
    <div className="search-page-wrapper">
      <div className="search-page-container">
        <h2 className="search-page-title">직원 정보 조회</h2>
        <EmployeeSearch />
      </div>
    </div>
  );
};

export default EmployeeSearchPage;
