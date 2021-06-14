import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {JwtService} from "../../service/jwt.service";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {

  notifications: any;

  data: any;
  interval: any;

  constructor(private auth: AuthService,
              private router: Router,
              private jwtService: JwtService,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private notifService: NotificationService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
    // this.findMyNotifications();
  }

  refreshData() {
    this.notifService.findNotif().subscribe(data => {
      console.log(data)
      this.notifications = data;
    })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }


  getRole() {
    return this.jwtService.getAuthenticatedUserRole();
  }


  /* open(content) {
     this.modalService.open(content);
   }*/
  closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  findMyNotifications() {
    console.log("load notif")
    this.notifService.findNotif().subscribe(data => {
      console.log(data)
      this.notifications = data;
    })
  }
}
