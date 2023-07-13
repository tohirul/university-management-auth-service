import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../types/common.types';
import { IGenericErrorMessage } from '../types/error.types';

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: err?.message || 'Invalid Input',
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast error',
    errorMessages: errors,
  };
};

export default handleCastError;
