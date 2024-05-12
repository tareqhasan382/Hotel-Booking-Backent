# Organization Employee Information Management

## Overview

This project aims to design a database for managing employee information within an organization. It includes details such as employee names, contact information, education history, employment details, training records, and leave balances.

## Database Schema

The database schema includes the following entities:

1. **Authentication**:

   - Register:
   - signin:

1. **Departments**:

   - Attributes: department_id, department_name, city

1. **Sub-departments**:

   - Attributes: sub_department_id, sub_department_name, department_id

1. **Employees**:

   - Attributes: employee_id, name, home_district, current_designation, current_department, current_sub_department, joining_date_org, joining_date_designation, termination_date

1. **Contact Information**:

   - Attributes: employee_id, phone_number, primary_phone

1. **Education Details**:

   - Attributes: employee_id, degree, institution_name, passing_year, grade

1. **Trainings**:

   - Attributes: training_id, employee_id, training_name, training_date

1. **Leaves**:

   - Attributes: leave_id, employee_id, leave_balance

1. **Login Information**:
   - Attributes: employee_id, email/phone_number, password_hash

<!-- ## Entity Relationship Diagram (ERD)
![ER Diagram](insert_your_ER_diagram_image_link_here) -->

## Getting Started

To set up the project locally, follow these steps:

1. Clone this repository.
2. Install the required dependencies.
3. Set up the database using the provided schema.
4. Run the application.

## Technologies Used

- Database: MongoDB mongoose
- Backend: Node.JS , Express.JS, Typescript , bcrypt , body-parser , Cors , jsonwebtoken , Zod Validation
