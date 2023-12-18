import React, { useState } from 'react';
import './YourFormComponent.css'; // Reuse the same CSS for styling
const backendURL = import.meta.env.VITE_BACKEND_URL;

const UpdateDetailsComponent = () => {
  const [updateData, setUpdateData] = useState({
    email: '',
    batch_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: name === 'batch_id' ? parseInt(value, 10) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Perform your API update here
      const response = await fetch(
        // 'https://yoga-app-be.onrender.com/api/v1/updateBatch',
        `${backendURL}/updateBatch`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Display success message or handle accordingly
        alert('Details updated successfully!');
      } else if (response.status === 404) {
        const errorData = await response.json();
        alert(errorData.error);
      } else {
        // Display a generic error message for other status codes
        alert(
          'Failed to update details, to update your batch wait till next month!'
        );
        console.error('Error updating details:', response.statusText);
      }
    } catch (error) {
      // Display a generic error message for fetch errors
      alert('Failed to update details. Please try again.');
      console.error('Error updating details:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className='your-form-container'>
      <h1 className='form-heading'>Yoga Admission Form</h1>
      <p className='form-description'>
        Please enter the details below and you will receive the payment link on
        your email id once you click on submit.
      </p>
      <p className='form-description'>Charges: Rs 500/month</p>

      <h1 className='form-heading'>Update Your Details</h1>

      <div className='form-group'>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={updateData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='batch_id'>Select Your Batch:</label>
        <select
          name='batch_id'
          value={updateData.batch_id}
          onChange={handleChange}
          required
        >
          <option value='' disabled>
            Select Batch
          </option>
          <option value='1'>Morning Session - 6 to 7 AM</option>
          <option value='2'>Morning Session - 7 to 8 AM</option>
          <option value='3'>Morning Session - 8 to 9 AM</option>
          <option value='4'>Evening Session - 5 to 6 PM</option>
        </select>
      </div>

      <button type='submit'>Update Details</button>
    </form>
  );
};

export default UpdateDetailsComponent;
