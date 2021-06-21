import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotifModel} from "../model/NotifModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  private apiUrl = 'http://localhost:9521/notification';

  constructor(private http: HttpClient) {
  }


  public saveNotif(data: NotifModel): Observable<any> {
    console.log("save notif ", data)
    return this.http.post(`${this.apiUrl}/save`, data);
  }
  public saveNotif2(data: NotifModel): Observable<any> {
    console.log("save notif ", data)
    return this.http.post(`${this.apiUrl}/save2`, data);
  }
 public saveNotif3(data: NotifModel): Observable<any> {
    console.log("save notif ", data)
    return this.http.post(`${this.apiUrl}/save3`, data);
  }
  public saveNotif4(data: NotifModel): Observable<any> {
    console.log("save notif ", data)
    return this.http.post(`${this.apiUrl}/save4`, data);
  }
  public saveNotif5(data: NotifModel): Observable<any> {
    console.log("save notif ", data)
    return this.http.post(`${this.apiUrl}/save5`, data);
  }


  public findNotif(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}
