import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fact } from '../model/Facture';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  public baseUrl='http://localhost:9521' ;
  constructor(private http :HttpClient) { }
  Facture:Fact[] ;
  /******facture */
  getAll()
  {
   return this.http.get(this.baseUrl+'/factures');
  
}

/************ */
delete(id):Observable<any>{

  return this.http.delete(`${this.baseUrl}/facture/delete/`+id)

}
/************* */
/*addFact (facture)
{
  return this.http.post<Fact>(this.baseUrl+'/facture/save1',facture)
}*/

/******************** */
put(id,Update):Observable<any>
 {

  return this.http.put(`${this.baseUrl}/facture/update/`+id,Update);

}
//methode ajouter//

addFact(f : Fact):Observable<any> {
  console.log("dataaaaaa  in",f)
  const obj =
   {
      raisonSocial: f.raisonSocial,
      numBonde:f.numBonde,
      dateFact: f.dateFact,
      ttc: f.ttc,
      etat: "Nouvelle",
      numFact: f.numFact
  };
   console.log("ddddddd",obj);
return  this.http.post(`${this.baseUrl}/facture/save/${f.structure}`, obj);
}


/******annexe */
upload(file: File): Observable<HttpEvent<any>> 
{
  const formData: FormData = new FormData();
  formData.append('file', file);

  const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

getFiles(): Observable<any> 
{
  return this.http.get(`${this.baseUrl}/files`);
}
}
