import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private userService: UserService
    ) { }

  public async registerUser(user: User): Promise<User> {
    return await this.userService.register(user).toPromise();
  }

}
