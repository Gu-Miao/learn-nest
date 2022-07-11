import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = typeof exceptionResponse === 'string' ? { message: response } : exceptionResponse;

    response.status(status).json({
      ...error,
      timestap: new Date().toISOString(),
    });
  }
}
