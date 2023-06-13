exports.checkString = (value) => {
  if (!value) return;

  if (typeof value === "string") return value;

  return;
};

exports.checkNumber = (value) => {
  if (isNaN(Number(value))) return;

  if (!isFinite(Number(value))) return;

  return value;
};

exports.checkTime = (value) => {
  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) return;
  return dateObj;
};
