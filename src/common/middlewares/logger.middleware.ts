import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();
    res.on('finish', () => {
      const time = Date.now() - start;
      console.log(`${req.method} ${req.path}  ${res.statusCode} ${time}ms`);
    });
    next();
  }
}
