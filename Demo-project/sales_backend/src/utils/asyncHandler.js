// module.exports = function asyncHandler(fn) {
//     return function (req, res, next) {
//         try {
//             const result = fn(req, res, next);
//             return result;
//         } catch (error) {
//             return res.status(500).json({
//                 error: "Internal Server Error"
//             })
//         }
//     }
// }

module.exports = function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
