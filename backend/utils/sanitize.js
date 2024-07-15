import validator from "validator";

const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const sanitize = (string) => {
  let sanitizedInput = string.trim();
  sanitizedInput = validator.escape(sanitizedInput);
  return sanitizedInput;
};

const validateEmail = (email) => {
  return emailRegex.test(email);
};

export { sanitize, validateEmail };
