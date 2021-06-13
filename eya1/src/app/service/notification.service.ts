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

  public findNotif(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}
