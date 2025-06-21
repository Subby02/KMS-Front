import React from 'react';
import CircleForm from '../../components/CircleForm';

export default function RegisterPage() {
  const loggedEmpId = '직원1'; // 로그인 가정
  return <CircleForm empId={loggedEmpId} />;
}