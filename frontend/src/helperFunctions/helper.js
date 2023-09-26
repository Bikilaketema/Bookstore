const capitalize = (str) => {
    // Check if the string is not empty
    if (str.length === 0) return str;

    // Capitalize the first letter and concatenate the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

export default capitalize;
  
    