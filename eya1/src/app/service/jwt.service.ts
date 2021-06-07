import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  decodeToken(token: string): any {
    this.saveClaims(jwt_decode(token));
  }

  saveClaims(token: any) {
    localStorage.setItem('role', token.roles[0].authority);
  }

  getAuthenticatedUserRole() {
    return localStorage.getItem('role');
  }
}
