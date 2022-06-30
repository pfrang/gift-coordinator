
export const filterNthElement = (input, index ) => {
  return input.filter((item, idx) => {
    return idx !== index
  })
}
