export const removeNthElement = (input, index) => {
  return input.filter((item, idx) => {
    return idx !== index;
  });
};
