export default (date, reference = new Date()) => {
  return Math.floor((reference - new Date(date)) / (24 * 60 * 60 * 1000));
};
