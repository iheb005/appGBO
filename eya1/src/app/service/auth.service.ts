import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = 'http://localhost:9521/access';
  public isloggedIn: Boolean = false;
  token: string;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    console.log("im server");
    return this.http.post(this.apiURL + '/authenticate', user, {observe: 'response'});
  }

  logout() {
    localStorage.clear();
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);

    this.token = jwt;
    console.log(jwt);
    this.isloggedIn = true;
  }

  clearToken() {
    localStorage.removeItem('jwt');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

}
