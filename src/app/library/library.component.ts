import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryTable } from 'src/app/library/models/libraryTable';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServicesService } from './service/services.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  title = 'Library';
  libraryTable: LibraryTable[] = [];
  ret: any;
  popupImportVisible: boolean = false;
  borrowedText: string = "Ödünç Al";
  positionOf: string = "";
  lengthOfData: number=0;
  test: string[] = [];
  cars=[1,2]
  loopVal: number[] = [];
  libraryTableRes: Array<LibraryTable> = [];
  authorsName: string[] = [];
  bookName: string[] = [];
  borrowedMessage: string[] = [];
  authorsName2: string = "";
  isBorrowed: string[] = [];
  borrowVisible: boolean[] = [];
  borrowerUser: string[] = [];
  deliveryDate: any[] = [];
  popUpbookName: string = "";
  imageData: string[] = [];
  id: number[] = [];
  valueStart: any;
  min: Date = new Date(1900, 0, 1);
  now: Date = new Date();
  updateLibraryTable = new LibraryTable();
  constructor(private services: ServicesService, private http: HttpClient, private toastrService: ToastrService, private router: Router, private datePipe: DatePipe) { }
  ngOnInit() {
  
    this.getLength();
    this.getData();
    
  }
  index: any;
  detail(i: any) {
    this.popupImportVisible = true;
    this.popUpbookName = this.authorsName[i];
    this.index = i;
   
  }

  updateStatusData(id: number, borrowerUser: string, deliveryDate: string) {//updating borrewed status of data
    if (id != null || borrowerUser != "" || deliveryDate != "") { 
    this.updateLibraryTable.id = this.id[id];
    this.updateLibraryTable.borrowerUser = borrowerUser;
    this.updateLibraryTable.deliveryDate = this.datePipe.transform(deliveryDate, "YYYY-MM-dd");
    this.services.updateStatusDataService(this.updateLibraryTable).subscribe(data => {
      window.location.reload();


    });
  }
  }

  getData() {
    this.services.getLengthService().subscribe((length: number) => {
        for (let i =1; i <= length; i++) {
          this.fetchDataForIndex(i);
          this.fetchDataForImageIndex(i);
        }
      });
  }
  fetchDataForImageIndex(i: number) {
    const imageUrl = this.services.fetchDataForImageIndexService(i);
    this.imageData[i] = imageUrl;
  }

  fetchDataForIndex(i: number) {
    const url = this.services.fetchDataForIndexService(i);// By changing the url endpoint each is accessed
    this.http.get<Array<LibraryTable>>(url).subscribe((response: Array<LibraryTable>) => {
      this.libraryTableRes = response;
      this.authorsName[i] = this.libraryTableRes.map(x => x.authorsName).toString();
      this.bookName[i] = this.libraryTableRes.map(x => x.bookName).toString();
      this.borrowedMessage[i] = this.libraryTableRes.map(x => x.borrowedMessage).toString();
      this.isBorrowed[i] = this.libraryTableRes.map(x => x.isBorrowed).toString();
      this.id[i] = +this.libraryTableRes.map(x => x.id).toString();
      if (this.isBorrowed[i] == "true") {
        this.borrowVisible[i] = true;
        this.borrowerUser[i] = this.libraryTableRes.map(x => x.borrowerUser).toString()
        this.deliveryDate[i] = this.datePipe.transform(this.libraryTableRes.map(x => x.deliveryDate).toString(), "dd/MM/YYYY")
      }
      else {
        this.borrowVisible[i] = false;
        
      }
    });
  }


  getLength() {//length of data for displaying each one
    this.services.getLengthService().subscribe((length: number) => {
        this.lengthOfData = length;
        this.loopVal = Array.from({ length: this.lengthOfData }, (_, i) => i + 1);

      });
    return this.lengthOfData
  }
  
  navigateAction() {
    this.router.navigate(['/add-book']);
  }
}
