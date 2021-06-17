import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Structure } from '../model/structure.modal';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  public uri = 'http://localhost:9521';

  constructor(private http: HttpClient) { }

  getAllStructures(): Observable<any> {
    return this.http.get(`${this.uri}/all`);
  }

  //ajouter structure//
  addStructure(st: Structure): Observable<any> {
    const obj = {

      nomStructure: st.nomStructure,
      etat: st.etat,

    };
    //console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);


  }

  put(id, Update): Observable<any> {

    return this.http.put(`${this.uri}/update/` + id, Update);

  }
  
  toggleState(id): Observable<any> {

    return this.http.put(`${this.uri}/activer/` + id,{});

  }













}









