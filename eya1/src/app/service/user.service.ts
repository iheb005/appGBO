import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  switchOffAll() {
    throw new Error('Method not implemented.');
  }
  switchOnAll() {
    throw new Error('Method not implemented.');
  }
    public uri = 'http://localhost:9521/utilisateur';
     public url1='http://localhost:9521/utilisateur/save';

    constructor(private http : HttpClient) { }

    getAllUsers():Observable<any>{
      return this.http.get(`${this.uri}/all`);
    }

    //methode ajouter//

  addUser(us : User):Observable<any> {
      const obj = {

        nomPrenom: us.nomPrenom,
        email:us.email,
        password:us.password,
        telephone:us.telephone,
        role:us.role,
        type_structure:us.type_structure,
        etat:us.active

      };
       //console.log(obj);
   return  this.http.post(`${this.uri}/save`, obj);
    }


    
 put(id,Update):Observable<any>
 {

  return this.http.put(`${this.uri}/update/`+id,Update) ;

   }

   put2(id,Update):Observable<any>
   {

    return this.http.put(`${this.uri}/change/`+id,Update) ;

     }

  }




