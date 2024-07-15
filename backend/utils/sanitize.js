import validator from "validator";

const sanitize = (string) => {
  let sanitizedInput = string.trim();
  sanitizedInput = validator.escape(sanitizedInput);
  return sanitizedInput;
};

export { sanitize };
