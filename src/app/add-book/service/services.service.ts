import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LibraryTable } from 'src/app/add-book/models/libraryTable';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient,) { }

  public addBookWithFileService(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + "UploadImage", formData);
  }

}
