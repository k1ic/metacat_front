export const convert = (data) => {
  if (typeof data !== 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => convert(item));
  }

  const newObj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const newKey = key.replace(/_([a-z])/g, (res) => res[1].toUpperCase());
      newObj[newKey] = convert(data[key]);
    }
  }

  return newObj;
};
