import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ResponseLogin, User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private userService: UserService,
    // private localStorageService: LocalStorageService
    ) { }

  public async registerUser(user: User): Promise<User> {
    return await this.userService.register(user).toPromise();
  }

  public async loginUser(user: User): Promise<boolean> {
    const userResponse = await this.userService.login(user).toPromise();
    if(!userResponse || !userResponse.token) {
      return Promise.resolve(false);
    }
    localStorage.setItem('token', userResponse.token);
    return Promise.resolve(true);
  }

}
