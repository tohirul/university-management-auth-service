'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterFilterableFields =
  exports.AcademicSemesterSearchableFields =
  exports.academicSemesterTitleCodeMapper =
  exports.academicSemesterCodes =
  exports.academicSemesterTitles =
  exports.academicSemesterMonths =
    void 0;
exports.academicSemesterMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
exports.academicSemesterTitles = ['Autumn', 'Summer', 'Fall'];
exports.academicSemesterCodes = ['01', '02', '03'];
exports.academicSemesterTitleCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
exports.AcademicSemesterSearchableFields = ['title', 'code', 'year'];
exports.AcademicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
