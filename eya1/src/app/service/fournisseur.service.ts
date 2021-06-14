import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  baseUrl = 'http://localhost:9521';


  constructor(private http: HttpClient) {
  }

  public getRaisonsSociaux() {
    return this.http.get(this.baseUrl+'/factures');
  }

}
