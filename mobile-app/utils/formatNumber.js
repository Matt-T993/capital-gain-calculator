const formatNumber = (number) => {
  const numericValue = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(numericValue)) return number; 
  return numericValue.toLocaleString();
};

export default formatNumber;