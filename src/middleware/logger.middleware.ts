import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, res: Response, next: NextFunction) {
    const folder = './logs'
    const today = new Date().toISOString().slice(0, 10)
    const fileName = `/${today}.txt`
    // this will log locally but if we need to send this logs on flight we can use axios or something like that
    fs.appendFile(folder+fileName,
        `request: ${JSON.stringify({
            url: request.url,
            query: request.query,
            method: request.method,
            params: request.params,
            body: request.body,
            headers: request.headers,
        })}\n\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      })
    // Ends middleware function execution, hence allowing to move on 
    if (next) {
      next();
    }
  }
}