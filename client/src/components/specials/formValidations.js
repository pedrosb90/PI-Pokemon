const validateNumInput = (value, name) => {
  if (!value) {
    return `Please, set ${name} value for your Pokemon`;
  }
  if (isNaN(value)) {
    return `Please enter a reasonable numerical ${name} value`;
  }
  if (value <= 0) {
    return `${name} has to be a positive number`;
  }
  if (value > 999) {
    return `${name} cannot be greater than a 3 digit number`;
  }
  return "";
};

const validateTextInput = (value, name) => {
  if (!value) {
    return `Please, set a proper ${name} for your Pokemon`;
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
  return "";
};

const validateImageUrl = (value, name) => {
  if (!value) {
    return `Please provide an ${name} URL`;
  }
  if (!/^https?:\/\/\S+\.(?:png|jpg|jpeg|gif)$/i.test(value)) {
    return "Please provide a valid image URL ending in .png, .jpg, .jpeg, or .gif";
  }
  return "";
};

module.exports = {
  validateNumInput,
  validateTextInput,
  validateImageUrl,
};
