import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { User } from '../../model/user.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../service/user.service";
import { StructureService } from '../../service/structure.service'
import { ToastrService } from 'ngx-toastr';
import { Structure } from 'src/app/model/structure.modal';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: User[];
  closeResult: string;
  editForm: FormGroup;
  id: any;
  structs: Structure[];
  filtredStructs:Structure[] = [];
  myUser: any = {
    id: '',
    nomPrenom: '',
    email: '',
    password: '',
    telephone: '',
    role: '',
    typeStructure: '',
    active: '',
    dateCreation: ''
  };
  nomPrenom: any;
  totalLength: any;
  page: number = 1;
  roleValue:string="";
  constructor(public userservice: UserService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private structureService: StructureService) {
  }

  ngOnInit(): void {
    this.getAllUsers();

    this.editForm = this.fb.group({

      nomPrenom: [''],
      email: [''],
      password: [''],
      telephone: [''],
      role: [''],
      typeStructure: [''],
      etat: [''],
      date_creation: ['']

    });

    this.structureService.getAllStructures().subscribe(data => {
      console.log("struct service:");
      this.structs = data.filter(x => x.etat == true);
      this.filtredStructs = this.structs;

    })
  }

  getRole(user: User) {

    return document.getElementById('rolee').setAttribute('value', user.role);
  }
  getAllUsers() {
    this.userservice.getAllUsers().subscribe(data => {
      this.userList = Object.assign([], data)
      console.log(this.userList);
    },
      error => {
        console.log(error);
      });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(form: NgForm) {
    this.userservice.addUser(form.value).subscribe(
      data => {
        console.log(form.value)
        this.toastr.success('avec succès!', 'utilisateur ajouté',);
        this.userList = Object.assign([], data)
        this.resetForm(form);
        this.getAllUsers();
      },
      error => {
        console.log(error);
      });
    this.modalService.dismissAll();

  }



  resetForm(form) {
    form.reset();
  }

  openDetails(targetModal, user: User) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    document.getElementById('nomPrenomm').setAttribute('value', user.nomPrenom);
    document.getElementById('emaill').setAttribute('value', user.email);
    document.getElementById('passwordd').setAttribute('value', user.password);
    document.getElementById('telephonee').setAttribute('value', user.telephone);
    document.getElementById('typeStructuree').setAttribute('value', user.typeStructure);
    document.getElementById('rolee').setAttribute('value', user.role);
    document.getElementById('etatt').setAttribute('value', user.active);


  }

  openEdit(targetModal, user: User) {
    this.id = user.id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });


    this.editForm.patchValue({

      nomPrenom: user.nomPrenom,
      email: user.email,
      password: user.password,
      telephone: user.telephone,
      role: user.role,
      typeStructure: user.typeStructure,
      etat: user.active,
      date_creation: user.dateCreation,

    });


  }

  Edit() {

    console.log(this.editForm.value);
    this.userservice.put(this.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastr.warning('avec succès!', 'utilisateur modifié',);

      });
  }

  Active(id) {
    //console.log(id);
    this.userservice.put2(this.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
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

  search() {
    if (this.nomPrenom == "") {
      this.ngOnInit();
    } else {
      this.userList = this.userList.filter(res => {
        return res.nomPrenom.toLocaleLowerCase().match(this.nomPrenom.toLocaleLowerCase())


      })
    }

  }

  structFilterChange($event){

    this.filtredStructs = this.structs.filter(x=>x.nomStructure.includes($event.target.value));
  }

  roleChanged($event){
    this.roleValue = $event.target.value;
  }

  stateToggler(id){
    console.log("clicked "+id);
    this.userservice.toggleState(id).subscribe(res=>{
      this.getAllUsers();
      console.log(res);
    });
  }

}
function setAttribute(arg0: string, role: any) {
  throw new Error('Function not implemented.');
}

