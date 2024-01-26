export class ValidationError extends Error {
  declare status

  declare userMessage

  declare fieldErrors

  constructor(message: string, fieldErrors: Record<string, any>) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400
    this.fieldErrors = fieldErrors;
    this.message = `${message} : ${JSON.stringify(fieldErrors)}`
    this.userMessage = 'Wrong data provided'
  }
}