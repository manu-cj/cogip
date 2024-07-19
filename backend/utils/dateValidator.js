const isValidDate = (date) => {
  return !isNaN(new Date(date));
};

export { isValidDate };
