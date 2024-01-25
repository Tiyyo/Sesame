export class APIError extends Error {
  declare status: number

  declare userMessage: string

  constructor(message: string) {
    super(message);
    this.name = 'APIError';
    this.status = 500;
    this.userMessage = message;
    this.message = message
  }
}