import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  { path: '', component: LibraryComponent },
  { path: 'add-book', component: AddBookComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
