const getDate = (timestamp) => {
  let date = new Date(timestamp);
  return date.toLocaleTimeString();
};

export { getDate };
