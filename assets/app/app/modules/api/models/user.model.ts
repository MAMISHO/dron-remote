export interface IUser {
  name?: string,
  surname?: string,
  email?: string,
  password?: string,
  isAdmin?: boolean,
  passwordConfirmation?: string,
  passwordVerified(): boolean,
  isOkpasswordFormat(): boolean
}

export class User implements IUser {
  constructor(
    public name?: string,
    public surname?: string,
    public email?: string,
    public password?: string,
    public isAdmin?: boolean,
    public passwordConfirmation?: string
    ) {
  }

  passwordVerified(): boolean {
    return this.passwordConfirmation && this.passwordConfirmation === this.password;
  }

  isOkpasswordFormat(): boolean {
    return this.password && this.password.length >7;
  }
}
