import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

// Es necesario indicar la configuración del servicio JWTHelper en el módulo
// https://stackoverflow.com/questions/49739277/nullinjectorerror-no-provider-for-jwthelperservice
// https://www.luisllamas.es/como-generar-una-red-wifi-con-el-esp8266-modo-ap/

// Exportar la configuración de authorización
// https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService
    ) {

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
