import React, { useState } from 'react';
import './YourFormComponent.css';

const YourFormComponent = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    contact_number: '',
    gender: '',
    batch_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'age' || name === 'batch_id' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ageValue = parseInt(formData.age, 10);
    if (isNaN(ageValue) || ageValue < 18 || ageValue > 65) {
      alert('Invalid age. Age must be between 18 and 65.');
      return;
    }
    // Contact number validation
    if (!/^\d{10}$/.test(formData.contact_number)) {
      alert('Invalid contact number. It should be a 10-digit number.');
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Invalid email. Please enter a valid email address.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/v1/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: 500,
          payment_successful: true,
        }),
      });

      if (response.ok) {
        alert(
          'Your details have been updated successfully\n\nYou will receive an email with a payment link.\n\nKindly do the payment within 1 month to confirm your admission.'
        );
        console.log('User created successfully');
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='your-form-container'>
      <div className='form-group'>
        <label htmlFor='first_name'>First Name:</label>
        <input
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='last_name'>Last Name:</label>
        <input
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='age'>Age:</label>
        <input
          type='Number'
          name='age'
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='contact_number'>Contact Number:</label>
        <input
          type='text'
          name='contact_number'
          value={formData.contact_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type='radio'
              name='gender'
              value='Male'
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type='radio'
              name='gender'
              value='Female'
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='batch_id'>Select Your Batch:</label>
        <select
          name='batch_id'
          value={formData.batch_id}
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

      <button type='submit'>Submit</button>
    </form>
  );
};

export default YourFormComponent;
