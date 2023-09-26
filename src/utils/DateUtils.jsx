export const formatDate = date => {
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const year = date.getFullYear();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

  return `${day}/${month}/${year}-${hours}:${minutes}`;
};
