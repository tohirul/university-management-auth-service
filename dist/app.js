'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const http_status_1 = __importDefault(require('http-status'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes/routes'));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// * Application Routes
app.use('/api/v1/', routes_1.default);
// ? Global Error Handler
app.use(globalErrorHandler_1.default);
// ? Invalid URL Handler
app.use((req, res) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Invalid URL, please try again!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Please check your URL and try again!',
      },
    ],
  });
});
// ? Test Run
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hi, Server is running' });
});
// const academicSemester = {
//   year: '2023',
//   code: '02',
// };
// const generateNewId = async () => {
//   const stuId = await generateStudentId(academicSemester);
//   const facId = await generateFacultyId();
//   const admId = await generateAdminId();
//   console.log(stuId, facId, admId);
// };
// generateNewId();
exports.default = app;
