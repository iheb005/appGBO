import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {JwtService} from "../../service/jwt.service";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private jwtService: JwtService,
              config: NgbModalConfig,
               private modalService: NgbModal) 
               {
                config.backdrop = 'static';
                config.keyboard = false;
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }


  getRole() {
    return this.jwtService.getAuthenticatedUserRole();
  }


  open(content) {
    this.modalService.open(content);
  }
}
