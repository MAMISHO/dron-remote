import { Component, OnInit } from '@angular/core';
import { User } from '../../api/models/user.model';
import { ApiService } from '../../api/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(
    private apiService: ApiService
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }
  public async registerUser() {
    // Validar campos
    console.log(this.user);
    const newUser = await this.apiService.registerUser(this.user);
    console.log(newUser);
  }
}
