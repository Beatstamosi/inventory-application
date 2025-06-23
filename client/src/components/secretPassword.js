const secretPassword = () => {
  let guess = prompt("Enter secret Password:");

  if (guess === `${import.meta.env.VITE_SECRETPASSWORD}`) return true;

  return false;
};

export default secretPassword;
