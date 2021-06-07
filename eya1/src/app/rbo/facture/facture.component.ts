import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


import {Router} from '@angular/router';
import {ServiceService} from 'src/app/service/service.service';
import {Fact} from 'src/app/model/Facture';
import {FournisseurService} from '../../service/fournisseur.service';
import { ToastrService } from 'ngx-toastr';


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

  raisonsSociaux: any = [];
  bondecommande:any=[];
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
   
  
  constructor(private factserv: ServiceService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private router: Router,
              private fournisseurService: FournisseurService,
              private toastr: ToastrService) {
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
  }


  /*******************onselect******/
  onSelect(fac) {
    this.router.navigate(['/facture', fac.id]);
    //console.log(fac.id)
  }

  /*************************/
  open(content) {
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
      this.toastr.error('avec succès!','Facture Supprimée', );

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
    this.factserv.addFact(form.value).subscribe(
      data => 
      {
            console.log(form.value)
        this.toastr.success('avec succès!','Facture ajoutée', );
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
    this.editForm.patchValue({

      raisonSocial: facture.raisonSocial,
      numBonde: facture.numBonde,
      strcucture: facture.structure,
      ttc: facture.ttc,
      datefact: facture.dateFact,
      etat: facture.etat,
      numFact: facture.numFact

    });
  }

  Edit() {

    console.log(this.editForm.value);
    this.factserv.put(this.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning('avec succès!','Facture modifiée', );

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
  this.editForm.patchValue({

    raisonSocial: facture.raisonSocial,
    numBonde: facture.numBonde,
    strcucture: facture.structure,
    ttc: facture.ttc,
    datefact: facture.dateFact,
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

}











