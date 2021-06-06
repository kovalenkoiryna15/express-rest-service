import morgan from 'morgan';
import { createWriteStream } from 'fs';
import express from 'express';

morgan.token('body', (req: express.Request)=> JSON.stringify(req.body) );
morgan.token('params', (req: express.Request)=> JSON.stringify(req.params) );

export default function logger(type: string, message?: string, status?: string): any {
  switch(type) {
    case 'incoming request error':
      return morgan((':method :url :params :body :status'), { stream: createWriteStream('access.log') });
    case 'unhandled error':
      return (): void => {
        const stream = createWriteStream('unhandledError.log', { encoding: 'utf-8', flags: 'a' });
        stream.write(`${JSON.stringify({ message, status })} \n`);
      }
    case 'unhandledRejection':
      return (): void => {
        const stream = createWriteStream('unhandledRejection.log', { encoding: 'utf-8', flags: 'a' });
        stream.write(`${JSON.stringify({ message })} \n`);
      }
    case 'uncaughtException':
      return (): void => {
        const stream = createWriteStream('uncaughtException.log', { encoding: 'utf-8', flags: 'a' });
        stream.write(`${JSON.stringify({ message })} \n`);
      }
    default: 
      return (): void => {
        const stream = createWriteStream('unspecifiedError.log', { encoding: 'utf-8', flags: 'a' });
        stream.write(`${JSON.stringify({ message })} \n`);
      }
  }
}
