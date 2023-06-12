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
