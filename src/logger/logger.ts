import morgan from 'morgan';
import fs, { createWriteStream } from 'fs';
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
        fs.writeFileSync('unhandledRejection.log', `${JSON.stringify({ message })} \n`, { encoding: 'utf-8', flag: 'a' });
      }
    case 'uncaughtException':
      return (): void => {
        fs.writeFileSync('uncaughtException.log', `${JSON.stringify({ message })} \n`, { encoding: 'utf-8', flag: 'a' });
      }
    default: 
      return (): void => {
        fs.writeFileSync('unspecifiedError.log', `${JSON.stringify({ message })} \n`, { encoding: 'utf-8', flag: 'a' });
      }
  }
}
