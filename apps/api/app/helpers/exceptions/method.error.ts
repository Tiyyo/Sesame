export class MethodNotImplementedError extends Error {
  declare status: number

  declare userMessage: string

  constructor(message: string) {
    super(message);
    this.name = 'MethodNotImplementedError';
    this.status = 500;
    this.userMessage = 'Internal Server Error';
  }
}