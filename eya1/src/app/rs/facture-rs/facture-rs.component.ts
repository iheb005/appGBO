import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ModalDismissReasons, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';


import {Router} from '@angular/router';
import {ServiceService} from 'src/app/service/service.service';
import {Fact} from 'src/app/model/Facture';
import {FournisseurService} from '../../service/fournisseur.service';
import {ToastrService} from 'ngx-toastr';
import {NotifModel} from "../../model/NotifModel";
import {NotificationService} from "../../service/notification.service";
import {StructureService} from "../../service/structure.service";

@Component({
  selector: 'app-facture-rs',
  templateUrl: './facture-rs.component.html',
  styleUrls: ['./facture-rs.component.css']
})
export class FactureRsComponent implements OnInit {
  factures:Fact [];
  totalLength: any;
  page: number = 1;
  constructor(private factserv: ServiceService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private router: Router,
              private fournisseurService: FournisseurService,
              private toastr: ToastrService,
              private structureService: StructureService,
              private notifService: NotificationService) {
  }

  ngOnInit(): void {

    this.getFacture();
  
  }




  /*******************onselect******/
  onSelect(fac) {
    this.router.navigate(['/facture', fac.id]);
    //console.log(fac.id)
  }





  /**************geet */
  getFacture() {
    this.factserv.getAll().subscribe((data:any) => {
      if (localStorage.getItem("role") == 'ROLE_RS') {
      this.factures = data.filter((el)=>el.etat==="Envoyer");

      }
      else {
        this.factures = data;

      }
      console.log("filter facture",this.factures);
    });
  }




  /*********************Modifier facture */
 

 




 
  

  saveNotification(id: number, structure: string) {
    let notifModel = new NotifModel();
    let element = new NotifModel();
    notifModel.idFacture = id;
    notifModel.structureName = structure;
    console.log('model ', notifModel)
    this.notifService.saveNotif(notifModel).subscribe(data => 
     { this.getFacture()
      console.log(data)}
      
      );
    if (localStorage.getItem("role") == 'ROLE_RS') {
      let notifications: any
      this.notifService.findNotif().subscribe(data => notifications = data);
      element = notifications.find(element => element.sendTo == "ROLE_RS");
      // this.factserv.put(element.idFacture, facture.setEtat('envoyée'))
    }
  }

  saveNotification2(id: number, structure: string) {
    let notifModel = new NotifModel();
    let element = new NotifModel();
    notifModel.idFacture = id;
    notifModel.structureName = structure;
    console.log('model ', notifModel)
    this.notifService.saveNotif2(notifModel).subscribe(data =>
    { this.getFacture()
      console.log(data)}
    
    );
    if (localStorage.getItem("role") == 'ROLE_RS') {
      let notifications: any
      this.notifService.findNotif().subscribe(data => notifications = data);
      element = notifications.find(element => element.sendTo == "ROLE_RS");
      // this.factserv.put(element.idFacture, facture.setEtat('envoyée'))
    }
  }
  saveNotification3(id: number, structure: string) {
    let notifModel = new NotifModel();
    let element = new NotifModel();
    notifModel.idFacture = id;
    notifModel.structureName = structure;
    console.log('model ', notifModel)
    this.notifService.saveNotif3(notifModel).subscribe(data => console.log(data));
    if (localStorage.getItem("role") == 'ROLE_RS') {
      let notifications: any
      this.notifService.findNotif().subscribe(data => notifications = data);
      element = notifications.find(element => element.sendTo == "ROLE_RS");
      // this.factserv.put(element.idFacture, facture.setEtat('envoyée'))
    }
  }

}
