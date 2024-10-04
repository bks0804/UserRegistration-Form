// Validate password strength
exports.validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate phone number based on country code
exports.validatePhoneNumber = (phone, countryCode) => {
  const phoneRegex = /^\+?\d{1,3}[- ]?\d{10}$/; // Generic regex for country code validation
  return phoneRegex.test(`${countryCode}${phone}`);
};

// Validate date of birth (18+)
exports.validateDOB = (dateOfBirth) => {
  const today = new Date();
  const dobDate = new Date(dateOfBirth);
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();

  return age > 18 || (age === 18 && monthDiff >= 0);
};

// Validate postal code based on country (simple validation)
exports.validatePostalCode = (postalCode, country) => {
  // Use regex or external APIs for country-specific postal code validation
  const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // Example for the US
  return postalCodeRegex.test(postalCode);
};
