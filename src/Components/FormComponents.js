import "./form.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormComponents = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    aadharNumber: '',
    panNumber:''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const countries = ['Afghanistan', 'Belgium', 'China','Denmark','Egypt','France','Germany','Hungary','India','Japan'];
  const cityOptions = {
    Afghanistan:['Kabul','Ghazni','Jalalabad'],
    Belgium:['Ghent','Antwerp','Liège'],
    China:['Beijing','Xi An','Wuhan'],
    Denmark:['Aarhus','Odense','Esbjerg'],
    Egypt:['Cairo','Alexandria','Luxor'],
    France:['Paris','Nice','Marseille'],
    Germany:['Berlin','Hamburg','Munich'],
    Hungary:['Pécs','Debrecen','Solt'],
    India:['Jodhpur','Jaipur','Mumbai'],
    Japan:['Tokyo','Osaka','Hiroshima']
  };

  useEffect(() => {
    if (formData.country) {
      setCities(cityOptions[formData.country]);
      setFormData({ ...formData, city: '' });
    }
  }, [formData.country]);

  const validate = () => {
    let formErrors = {};
    if (!formData.firstName){
        formErrors.firstName = 'First Name is required';
     }else if (formData.firstName.length<3) {
       formErrors.firstName = 'First Name must be atleast 3 characters';
     }
    if (!formData.lastName) {
        formErrors.lastName = 'Last Name is required';
      } else if (formData.lastName.length<3){
        formErrors.lastName = 'Last Name must be atleast 3 characters';
      }
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
        formErrors.password = 'Password should have minimum length of 8 characters,Contains at least one uppercase letter,one lowercase letter,one number,one special character';
    }
    if (!formData.phoneNumber) {
        formErrors.phoneNumber = 'Phone Number is required';
      } else if (formData.phoneNumber.length<10){
        formErrors.phoneNumber = 'Phone Number must be atleast 10 characters';
      }else if (!/^\+?(\d{1,3})?[-. ]?(\(?\d{1,4}\)?)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/.test(formData.phoneNumber)) {
        formErrors.phoneNumber = 'Invalid Phone Number';
      }

    if (!formData.country) formErrors.country = 'Country is required';
    if (!formData.city) formErrors.city = 'City is required';


    if (!formData.AadharNo) {
        formErrors.AadharNo = 'Adharnumber is required';
      } else if (!/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/.test(formData.AadharNo)) {
          formErrors.AadharNo = 'Adharcard number invalid.Please enter correct number';
      }

  if (!formData.PanNo) {
    formErrors.PanNo = 'Pan Card number is required';
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.PanNo)) {
    formErrors.PanNo = 'Pan card number invalid.Please enter correct number';
    }

          
    
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', formData);
      navigate('/details', { state: { formData } });
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
        <h1>Validation form</h1>
    <div className='fields'>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>
      <div>
        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>
     <div>
        <label>AadharNo:</label>
        <input
          name="AadharNo"
          value={formData.AadharNo}
          onChange={handleChange}
        />
        {errors.AadharNo && <span>{errors.AadharNo}</span>}
      </div>
<div>
        <label>PanNo:</label>
        <input
          name="PanNo"
          value={formData.PanNo}
          onChange={handleChange}
        />
        {errors.PanNo && <span>{errors.PanNo}</span>}
      </div>
      <button type="submit">Submit</button>
      </div>
      
    </form>
  );
};

export default FormComponents;
