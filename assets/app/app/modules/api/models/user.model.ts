export interface IUser {
  name?: string,
  surname?: string,
  email?: string,
  password?: string,
  role?: string,
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
    public role?: string,
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

export class ResponseLogin {
  constructor(
    public user?: User,
    public token?: string
    ) {}
}
