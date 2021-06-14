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
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  deleteId: any;
  editForm: FormGroup;
  factures: any = [];
  closeResult: string;
  myContition = false;

  structures: any;
  raisonsSociaux: any = [];
  bondecommande: any = [];
  /*{
    id: 1,
    num: 'S5FD'
  },
  {
    id: 3,
    num: 'K6FD'
  }
];*/


  myFact: any = {
    id: '',
    numFournisseur: '',
    raisonSocial: '',
    numBonde: '',
    dateFact: '',
    ttc: '',
    structure: '',
    etat: '',
    numFact: ''
  };
  id: any;
  totalLength: any;
  page: number = 1;
  raisonSocial: any;
  dateFact: NgbDate;

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
    this.fournisseurService.getRaisonsSociaux().subscribe(data => {
      this.raisonsSociaux = data;
    });
    this.getFacture();
    this.editForm = this.fb.group({
      raisonSocial: [''],
      numBonde: [''],
      dateFact: [''],
      ttc: [''],
      structure: [''],
      etat: [''],
      numFact: [''],


    });
    setTimeout(() => {
      this.structures = this.getStructures()
    }, 5000)
    console.log("struc ", this.structures)
  }


  getStructures() {
    this.structureService.getAllStructures().subscribe(data => {
      return data;
    });
  }

  /*******************onselect******/
  onSelect(fac) {
    this.router.navigate(['/facture', fac.id]);
    //console.log(fac.id)
  }

  /*************************/
  open(content) {
    const today = new Date();
    this.dateFact = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate());
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /********************details facture */

  openDetails(targetModal, facture: Fact) {
    this.id = facture.id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('raisonSocial').setAttribute('value', facture.raisonSocial);
    document.getElementById('numBande').setAttribute('value', facture.numBonde);
    document.getElementById('numFact').setAttribute('value', facture.numFact);
    document.getElementById('ttcFact').setAttribute('value', facture.ttc);
    document.getElementById('dateFact').setAttribute('value', facture.dateFact);
    document.getElementById('structureFact').setAttribute('value', facture.structure);
    document.getElementById('etat').setAttribute('value', facture.etat);
  }

  /*****************supprimer facture */

  openDelete(targetModal, facture: Fact) {
    //this.deleteId = this.myFact.id ;
    this.id = facture.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  deleteFacture() {


    this.factserv.delete(this.id).subscribe(res => {
      this.getFacture();
      this.modalService.dismissAll();
      console.log(res);
      this.toastr.error('avec succès!', 'Facture Supprimée',);

    }, error => {
      console.log(error);
    });

  }

  /**************geet */
  getFacture() {
    this.factserv.getAll().subscribe(data => {
      this.factures = data;
    });
  }

  /**********post */
  onSubmit(form: NgForm) {
    form.value.dateFact = new Date(
      form.value.dateFact.year,
      form.value.dateFact.month,
      form.value.dateFact.day);
    this.factserv.addFact(form.value).subscribe(
      data => {
        console.log(form.value)
        this.toastr.success('avec succès!', 'Facture ajoutée',);
        this.factures = Object.assign([], data)
        this.resetForm(form);
        this.getFacture();
      },
      error => {
        console.log(error);
      });
    this.modalService.dismissAll();

  }

  resetForm(form) {
    form.reset();
  }

  /*********************Modifier facture */
  openEdit(targetModal, facture: Fact) {
    this.id = facture.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    const selectedDay = new Date(facture.dateFact);
    this.editForm.patchValue({
      /* id : facture.id,
       dateFact : new NgbDate(selectedDay.getFullYear(),
       selectedDay.getMonth() + 1,
       selectedDay.getDate())*/
      raisonSocial: facture.raisonSocial,
      numBonde: facture.numBonde,
      strcucture: facture.structure,
      ttc: facture.ttc,
      //datefact: facture.dateFact,
      etat: facture.etat,
      numFact: facture.numFact

    });
    this.editForm.patchValue({});
  }

  Edit() {

    console.log(this.editForm.value);
    this.factserv.put(this.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning('avec succès!', 'Facture modifiée',);

      });
  }

  /********************* */
  /*********************Mdetails */
  openEdit1(targetModal, facture: Fact) {
    this.id = facture.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    const selectedDay = new Date(facture.dateFact);
    this.editForm.patchValue({
      dateFact: new NgbDate(selectedDay.getFullYear(),
        selectedDay.getMonth() + 1,
        selectedDay.getDate()),
      raisonSocial: facture.raisonSocial,
      numBonde: facture.numBonde,
      strcucture: facture.structure,
      ttc: facture.ttc,
      // datefact: facture.dateFact,
      etat: facture.etat,
      numFact: facture.numFact

    });
  }

  Edit1() {
    console.log(this.editForm.value);
    this.factserv.put(this.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /****Imprimer */
  myFun() {
    window.print();
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

  filterRaisons(str: string) {
    if (typeof str === 'string') {
      this.raisonsSociaux = this.raisonsSociaux.filter(a => a.toLowerCase()
        .startsWith(str.toLowerCase()));
    }
  }

  filterBon(str: string) {
    if (typeof str === 'string') {
      this.bondecommande = this.bondecommande.filter(a => a.toLowerCase()
        .startsWith(str.toLowerCase()));
    }
  }

  search() {
    if (this.raisonSocial == "") {
      this.ngOnInit();
    } else {
      this.factures = this.factures.filter(res => {
        return res.raisonSocial.toLocaleLowerCase().match(this.raisonSocial.toLocaleLowerCase())


      })
    }

  }

  saveNotification(id: number, structure: string) {
    let notifModel = new NotifModel();
    let element = new NotifModel();
    notifModel.idFacture = id;
    notifModel.structureName = structure;
    console.log('model ', notifModel)
    this.notifService.saveNotif(notifModel).subscribe(data => console.log(data));
    if (localStorage.getItem("role") == 'ROLE_RS') {
      let notifications: any
      this.notifService.findNotif().subscribe(data => notifications = data);
      element = notifications.find(element => element.sendTo == "ROLE_RS");
      // this.factserv.put(element.idFacture, facture.setEtat('envoyée'))
    }
  }
}











