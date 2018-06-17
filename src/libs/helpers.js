/**
 * stringify mongo object
 * @returns {function(*=): string}
 */
exports.stringifyStreamResponse = () => {
  let hasFirstChunk = false;
  return chunk => {
    const prefix = hasFirstChunk ? ',' : '';
    hasFirstChunk = true;
    return prefix + JSON.stringify(chunk);
  };
};
