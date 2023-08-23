import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryTable } from 'src/app/add-book/models/libraryTable';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ServicesService } from './service/services.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})


export class AddBookComponent implements OnInit {
  valueStart: any;
  min: Date = new Date(1900, 0, 1);
  now: Date = new Date();

  selectedImage: any;
  showUploader: boolean = true;
  fileToUpload: File | undefined;
  bookNameToAdd: string="";
  authorsNameToAdd: string = "";
  libraryTable: Array<LibraryTable> = [];
   constructor(private services: ServicesService, private http: HttpClient, private toastrService: ToastrService, private router: Router, private datePipe: DatePipe) { }
  ngOnInit() {

    
  }


  onFileSelected(event: any): void {//file type checking
    this.fileToUpload = event.target.files?.[0];

    if (this.fileToUpload) {
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
      if (validImageTypes.includes(this.fileToUpload.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result;//display file
        };
        reader.readAsDataURL(this.fileToUpload);
      } else {
        alert('Lütfen fotoğraf formatında dosya seçin.');
      }
    }
  }



  addBookWithFile(fileToUpload: any, bookName: string, authorsName: string) {
        const formData: FormData = new FormData();
        formData.append('files_', fileToUpload);//Adding according to the keys in the backend
        formData.append('bookName_', bookName);
        formData.append('authorsName_', authorsName);

        return this.services.addBookWithFileService(formData);
  }

  onUpload(bookName: string, authorsName: string) {

    const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
    if ((this.fileToUpload == null && bookName == "" && authorsName != "") ||
      (this.fileToUpload == null && bookName != "" && authorsName == "") ||
      (this.fileToUpload != null && bookName == "" && authorsName == "") ||
  (this.fileToUpload == null && bookName == "" && authorsName == "") ) {
      alert("Boş form eklenemez");
      return;
    }
 
    else { 
  
   
      if (this.fileToUpload != null && bookName == "" && authorsName != "") {
        alert('Kitap Adı boş olamaz.');
        return;
      }
      if (this.fileToUpload != null && bookName != "" && authorsName == "") {
        alert('Yazar Adı boş olamaz.');
        return;
      }
      if (this.fileToUpload != null && bookName != "" && authorsName != "") {
        if (this.fileToUpload == null || !validImageTypes.includes(this.fileToUpload.type) )  {
          alert("Sadece fotoğraf yüklenebilir");
        return;
      }
        this.addBookWithFile(this.fileToUpload, bookName, authorsName).subscribe(() => {
          this.router.navigate(['']);
          alert('Yükleme başarılı');
        });
        return;

      }
    
    }
  }


}
