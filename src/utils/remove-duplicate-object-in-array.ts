export const removeDuplicateObjectsInArray = (arr) => {
  const set = new Set(arr);
  const resp = arr.filter((el) => {
    const duplicate = set.has(el.id);
    set.add(el.id);
    return !duplicate;
  });
  return resp;
};
