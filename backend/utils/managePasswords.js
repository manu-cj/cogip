import bcrypt from "bcrypt";

const comparePasswords = async (hashedPassword, password) => {
  const isMatch = await bcrypt.compare(hashedPassword, password);
  return isMatch;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

export { hashPassword, comparePasswords };
