export class DatabaseError extends Error {
  declare status

  declare userMessage

  declare context

  constructor(message: string, context: string) {
    super(message);
    this.name = 'DatabaseError';
    this.context = context
    this.status = 400
    this.message = `Context : ${context} , ${message}`
    this.userMessage = ' Internal Server Error'
  }
}