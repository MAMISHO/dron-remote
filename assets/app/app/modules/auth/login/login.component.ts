import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../api/models/user.model';
import { ApiService } from '../../api/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }
  public async login() {
    // Validar campos
    console.log(this.user);
    const success = await this.apiService.loginUser(this.user);
    console.log(success);
    this.router.navigate(['/', 'dashboard'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

}
