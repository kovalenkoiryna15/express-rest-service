export class ErrorWithStatus extends Error {
  public status?: number;

  constructor(message: string) {
    super(message);
  }
}
