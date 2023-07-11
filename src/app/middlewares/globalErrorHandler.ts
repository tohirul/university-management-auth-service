/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { NextFunction, Request, Response } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import log from '../../shared/log';
import { IGenericErrorMessage } from '../../types/errorTypes';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('Global Error Handler: ', error)
    : log.checkError.error('Global Error Handler: ', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: Array<IGenericErrorMessage> = [];

  if (error?.name === 'ValidationError') {
    console.log('Error Got into Validation Error Condition');
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    console.log('Error Got into Error Condition');

    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: ``,
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    console.log('Error Got into Zod Error Condition');

    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    console.log('Error Got into API Error Condition');

    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  console.log('Check Zod Error: ', {
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
