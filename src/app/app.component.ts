

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryTable } from 'src/app/library/models/libraryTable';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Library';
  libraryTable: LibraryTable[] = [];
  ret: any;
  popupImportVisible: boolean = false;
  borrowedText: string = "Ödünç Al";
  positionOf: string = "";
  test: string ="https://localhost:8080/api/getImage/1";
  cars= [1, 2, 3,4];
  constructor(private http: HttpClient, private toastrService: ToastrService, private router: Router) { }
  ngOnInit() {
    this.getValue()
  }
  buttonAction() {
    this.popupImportVisible = true;
  }
  getValue() {
   
  }
 navigateAction() {
   this.router.navigate(['/add-library']);
  }
}
