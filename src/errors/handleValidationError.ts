import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../types/commonTypes';
import { IGenericErrorMessage } from '../types/errorTypes';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (
      el: mongoose.Error.CastError | mongoose.Error.ValidatorError
    ): IGenericErrorMessage => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validator error',
    errorMessages: errors,
  };
};

export default handleValidationError;
