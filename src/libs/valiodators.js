/**
 * Point coordinates validation
 * @param {Number[]} v
 * @returns {boolean}
 */
exports.isLocationValid = v => {
  const isValidArray = Array.isArray(v) && v.length === 2 && v.every(Number.isFinite);
  if (!isValidArray) return false;
  // Valid longitude values are between -180 and 180, both inclusive.
  // Valid latitude values are between -90 and 90 (both inclusive).
  const [lon, lat] = v;
  return lon >= -180 && lon <= 180 && (lat >= -90 && lat <= 90);
};
