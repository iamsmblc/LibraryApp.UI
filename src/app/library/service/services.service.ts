import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LibraryTable } from 'src/app/library/models/libraryTable';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient,) { }

  public updateStatusDataService(model: LibraryTable): Observable<any> {
    return this.http.post(this.baseUrl + "UpdateLibraryData", model);
  }
  public getLengthService(): Observable<any> {
    return this.http.get<number>(this.baseUrl + "getLength/");
  }
  public getImageUrl(): Observable<any> {
    return this.http.get<number>(this.baseUrl + "getLength/");
  }
  fetchDataForImageIndexService(i: number): string {
    const url = this.baseUrl + `getImage/${i.toString()}`;
    return url;
  }
  fetchDataForIndexService(i: number): string {
    const url = this.baseUrl + `GetOrderedResponseDataById/${i.toString()}`;
    return url;
  }

  

}
