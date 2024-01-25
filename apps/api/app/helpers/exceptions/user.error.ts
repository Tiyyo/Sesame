export class UserError {
  name = 'UserError';

  declare status: number

  declare message: string

  constructor(message: string) {
    this.name = 'UserError';
    this.status = 400;
    this.message = message
  }
}