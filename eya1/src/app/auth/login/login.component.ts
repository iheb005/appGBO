import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/model/user.model';
import {AuthService} from 'src/app/service/auth.service';
import {JwtService} from "../../service/jwt.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err: number = 0;
  user = new User();
  password:any ;
  constructor(private auth: AuthService,
              private router: Router,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
  }

  onLoggedin() {
    this.auth.login(this.user).subscribe((data) => {
      let jwToken = data.body.token;
      console.log('jwt  token', data);
      this.auth.saveToken(jwToken);
      this.decodeTokenAndSave(jwToken);
      switch (this.jwtService.getAuthenticatedUserRole()) {
        case 'ROLE_ADMIN' :
          this.router.navigate(['/admin']);
          break;
        case 'ROLE_RBO' :
          this.router.navigate(['/rbo']);
          break;
        case 'ROLE_RS' :
          this.router.navigate(['/rs/home']);
          break;
        default:
          this.router.navigate(['/home']);
          break;
      }

    }, (err) => {
      this.err = 1;
    });
  }

  decodeTokenAndSave(token: string) {
    this.jwtService.decodeToken(token);
  }
}
