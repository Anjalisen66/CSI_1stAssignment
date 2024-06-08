import "./Detail.css"
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsComponent = () => {
  const { state } = useLocation();
  const { formData } = state || {};

  if (!formData) {
    return <div>No data available</div>;
  }

  return (
    <div className='details'>
      <h2>Form Details</h2>
      <p><strong>First Name:</strong> {formData.firstName}</p>
      <p><strong>Last Name:</strong> {formData.lastName}</p>
      <p><strong>Username:</strong> {formData.username}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Country:</strong> {formData.country}</p>
      <p><strong>City:</strong> {formData.city}</p>
      <p><strong>Pan Number:</strong> {formData.PanNo}</p>
      <p><strong>Aadhar Number:</strong> {formData.AadharNo}</p>
    </div>
  );
};

export default DetailsComponent;
