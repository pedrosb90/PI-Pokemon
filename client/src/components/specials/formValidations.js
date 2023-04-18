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
  if (value > 999) {
    return `${name} cannot be greater than a 3 digit number`;
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
  if (value.length > 20) {
    return `${name} cannot be longer than 20 characters`;
  }

  if (!isNaN(value)) {
    return `${name} must be composed of letters only!`;
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

module.exports = {
  validateNumInput,
  validateTextInput,
  validateImageUrl,
};
