import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {JwtService} from "../../service/jwt.service";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from "../../service/notification.service";
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {

  notifications: any;
  userList:User[];
  iduserconnected:any;
  notificationsfilterd:any
  userconnected=JSON.parse(localStorage.getItem("user"))
  data: any;
  interval: any;
  dropdown:boolean = false;
  constructor(private auth: AuthService,
              private router: Router,
              private jwtService: JwtService,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private notifService: NotificationService,
              private userservice :UserService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.dropdown=false;
  }

  ngOnInit(): void {
    this.getAllusers();
    console.log('iddddddddddddd',this.iduserconnected)
    // this.findMyNotifications()
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);
    // this.findMyNotifications();

    console.log("connected user",this.userconnected);
  }
  toggledropdown(){
    this.dropdown =!this.dropdown;
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
    this.notifService.findNotif().subscribe((data:any) => {
      console.log("notifications sans filter",data)
      this.notificationsfilterd = data.filter((el)=>el.senderId==this.iduserconnected);
      console.log("notifications",this.notificationsfilterd)
    })
  }

  getAllusers(){
    this.userservice.getAllUsers().subscribe(data => {
      this.userList = Object.assign([], data)
      console.log("users",this.userList)
      this.iduserconnected=this.userList.filter(el=>el.email==this.userconnected.username)[0].id
      console.log("iduser",this.iduserconnected)

      this.findMyNotifications()
    },
      error => {
        console.log(error);
      });
  }
}
