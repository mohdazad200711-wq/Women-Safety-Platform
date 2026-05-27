export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
