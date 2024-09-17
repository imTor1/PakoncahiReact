import React, { useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Box,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';

function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    jobTitle: '',
    department: '',
    email: '',
    phoneNumber: '',
    salary: '',
    address: '',
    zipCode: '',
    isActive: true, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get token from local storage (or wherever it's stored)
    const token = localStorage.getItem('authToken'); 

    // Prepare the formData for the API (convert camelCase to snake_case where needed)
    const requestData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Gender: formData.gender,
      DateOfBirth: formData.dateOfBirth,
      JobTitle: formData.jobTitle,
      Department: formData.department,
      Email: formData.email,
      PhoneNumber: formData.phoneNumber,
      Salary: formData.salary,
      Address: formData.address,
      ZipCode: formData.zipCode,
      isActive: formData.isActive,
    };

    // Send a POST request to the backend API
    fetch('http://localhost:4000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the authorization token
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          alert('Employee added successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            jobTitle: '',
            department: '',
            email: '',
            phoneNumber: '',
            salary: '',
            address: '',
            zipCode: '',
            isActive: true,
          });
        } else {
          alert('Error adding employee: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while adding the employee.');
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Employee
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              name="jobTitle"
              fullWidth
              required
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department"
              name="department"
              fullWidth
              required
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary"
              name="salary"
              type="number"
              fullWidth
              required
              value={formData.salary}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              multiline
              rows={2}
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              name="zipCode"
              fullWidth
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AddEmployee;
