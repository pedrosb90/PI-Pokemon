const validateNumInput = (value, name = "") => {
  if (isNaN(value) || !/^\d+$/.test(value)) {
    return `Please enter a valid numerical ${name} value`;
  }
  if (!value) {
    return `${name} is required`;
  }
  if (value <= 0) {
    return `${name} has to be a positive number`;
  }
  if (value > 99999999) {
    return `${name} cannot be greater than 100 thousand kilos`;
  }
  return null;
};

const validateWeiInput = (value, name = "") => {
  if (isNaN(value) || !/^\d+$/.test(value)) {
    return `Please enter a valid numerical ${name} value`;
  }
  if (!value) {
    return `${name} is required`;
  }
  if (value <= 0) {
    return `${name} has to be a positive number`;
  }
  if (value > 99999999) {
    return `${name} cannot be greater than 100 thousand kilos`;
  }
  return null;
};
const validateHeightInput = (value, name = "") => {
  if (isNaN(value) || !/^\d+$/.test(value)) {
    return `Please enter a valid ${name} value in centimeters`;
  }
  if (!value) {
    return `${name} is required`;
  }
  if (value <= 0) {
    return `${name} has to be a positive number`;
  }
  if (value > 5000) {
    return `${name} cannot be higher than 50 meters`;
  }
  return null;
};

const validateTextInput = (value, name) => {
  if (!value) {
    return `${name} is required`;
  }
  if (/[^a-zA-Z]/.test(value)) {
    return `${name} must be composed of letters only!`;
  }
  if (value.length < 3 || value.length > 20) {
    return `${name} is required to have 3 to 20 characters`;
  }

  if (!isNaN(value)) {
    return `${name} must be composed of letters only!`;
  }
  if (!/^[a-z]+$/.test(value)) {
    return `${name} cannot contain capital letters!`;
  }
  return null;
};

const validateImageUrl = (value, name) => {
  if (!value) {
    return `${name} is required`;
  }
  if (!/^https?:\/\/\S+\.(?:png|jpg|jpeg|gif)$/i.test(value)) {
    return "Please provide a valid image URL ending in .png, .jpg, .jpeg, or .gif";
  }
  return null;
};
const validateType = (selectedTypes) => {
  if (selectedTypes.length < 1) {
    return "At least one type must be selected";
  }
  return "";
};

module.exports = {
  validateWeiInput,
  validateHeightInput,
  validateNumInput,
  validateTextInput,
  validateImageUrl,
  validateType,
};
