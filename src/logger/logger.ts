import morgan from 'morgan';
import { createWriteStream } from 'fs';
import express from 'express';

morgan.token('body', (req: express.Request)=> JSON.stringify(req.body) );
morgan.token('params', (req: express.Request)=> JSON.stringify(req.params) );

export default function logger() {
  return morgan((':method :url :params :body :status'), { stream: createWriteStream('access.log') });
}
