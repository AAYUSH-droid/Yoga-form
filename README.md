# Yoga Form - Flexmoney Intern Assignment

## Overview

This project is a Yoga Admission Form application developed for the Flexmoney Intern Assignment. The application allows users to register for yoga sessions, update their details, and interact with a backend API.

- **Live Link:** [Yoga Form](https://yoga-form-fo4v.vercel.app/)

## Technologies Used

- **Frontend:**
  - React with Vite
  - HTML, CSS, JavaScript
  - [Vercel](https://vercel.com/) for deployment
  - Frontend app hosted: [Click Here](https://yoga-form-fo4v.vercel.app/)

- **Backend:**
  - Node.js
  - Express.js
  - Prisma ORM
  - PostgreSQL with Supabase
  - [Render](https://render.com/) for backend deployment
  - Backend hosted: [Click Here](https://yoga-app-be.onrender.com/)

### Database Designing:
The application utilizes a PostgreSQL database with Prisma ORM. Here's an overview of the key tables:
#### User Table

The `User` table stores information about individuals registering for yoga sessions.

- **Fields:**
  - `user_id`: Unique identifier for each user.
  - `first_name`: First name of the user.
  - `last_name`: Last name of the user.
  - `age`: Age of the user.
  - `email`: Unique email address for user identification.
  - `contact_number`: Optional contact number of the user.
  - `gender`: Gender of the user.
  - `batch`: Reference to the `Batch` the user is associated with.
  - `batch_id`: Foreign key linking to the `Batch` table.
  - `Payment`: Relationship to payment records.
  - `admission`: Relationship to admission records.

#### Batch Table

The `Batch` table represents different yoga sessions available for users.

- **Fields:**
  - `batch_id`: Unique identifier for each batch.
  - `time`: Session time details.
  - `users`: Relationship to users associated with this batch.
  - `admission`: Relationship to admission records.

#### Payment Table

The `Payment` table records transactions related to user payments.

- **Fields:**
  - `payment_id`: Unique identifier for each payment record.
  - `user`: Reference to the `User` associated with the payment.
  - `user_id`: Foreign key linking to the `User` table.
  - `amount`: Amount paid by the user.
  - `date`: Date and time of the payment.
  - `payment_successful`: Indicates whether the payment was successful.
  - `admission`: Relationship to admission records.

## ER Diagram: 
<img width="867" alt="Screenshot 2023-12-18 at 3 50 26 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/6e79df67-987c-4d2b-bf8c-87584c36108a">


#### Database Models are Created with the Prisma Schema:
- User Table
<img width="605" alt="Screenshot 2023-12-18 at 3 51 41 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/edb49c24-e27b-4118-8dee-fd3f349ad7e4">

- Batch Table
<img width="320" alt="Screenshot 2023-12-18 at 3 51 47 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/c7573186-4a8c-4b87-91eb-d00102162beb">

- Payment Table
 <img width="684" alt="Screenshot 2023-12-18 at 3 51 54 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/7b978ac2-3d5d-46ab-a48f-3e78a86b7f24">


## Testing API with Postman
<img width="1087" alt="Screenshot 2023-12-18 at 3 56 18 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/650fbac9-7458-4105-8d03-6ed1f87e9b50">

## Frontend WorkFlow:

   1. Wrong Age Input 
  <img width="592" alt="Screenshot 2023-12-18 at 3 58 49 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/2fa8d125-5096-412f-b377-e921b121b537">
  
   2. Wrong Email Input 
   <img width="585" alt="Screenshot 2023-12-18 at 3 59 13 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/b6ebfaba-9fc6-4d31-99a3-21cbd6f5506f">

   3. Wrong Contact Number Input  
    <img width="486" alt="Screenshot 2023-12-18 at 3 59 35 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/cdd6c092-0796-4984-8061-95ab51436f08">

   4. Validated Request Screenshot:
    <img width="615" alt="Screenshot 2023-12-18 at 4 00 39 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/63a62139-1c99-4896-b637-20267649e0a8">
    
   5. Email Sent  
    <img width="615" alt="Screenshot 2023-12-18 at 4 00 39 PM" src="https://github.com/AAYUSH-droid/Yoga-form/assets/76835619/3ad9c633-58e6-4303-8cb2-87c0ab36771d">


## Assumptions

This project operates under the following assumptions:

1. **Successful Payment:** It is assumed that when a user registers through the Yoga Form, a successful payment has already been made. The registration process is contingent upon a prior payment for admission.

2. **Email Notification:** Upon successful registration, it is assumed that an email notification is sent to the user's provided email address. The email is assumed to contain relevant details and a payment confirmation link. The email sending functionality is implemented using SendGrid.





