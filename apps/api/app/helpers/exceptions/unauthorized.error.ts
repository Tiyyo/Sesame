
export class UnauthorizedError extends Error {
  declare status

  declare userMessage

  declare context

  constructor(message: string, context: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.context = context
    this.status = 401
    this.message = `Context : ${context} , ${message}`
    this.userMessage = ' Unauthorized'
  }
} 