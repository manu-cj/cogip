import bcrypt from "mongoose";

const comparePasswords = async (hashedPassword, password) => {
  const isMatch = await bcrypt.compare(hashedPassword, password);
  return isMatch;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export default { hashPassword, comparePasswords };
