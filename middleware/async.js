module.exports = function (handler) {
  return async (req, res) => {
    try {
      //handler
      await handler();
    } catch (ex) {
      next(ex);
    }
  };
};
