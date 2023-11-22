import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const delta = Date.now() - start;
      this.logger.log({
        method: req.method,
        url: req.url,
        status: res.statusCode,
        responseTime: `${delta}ms`,
        contentLength: res.get('Content-Length'),
        timestamp: new Date().toISOString(),
        source: req.ip,
        userAgent: req.get('User-Agent'),
      });
    });
    next();
  }
}
