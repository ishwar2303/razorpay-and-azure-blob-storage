import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlobComponent } from './blob/blob.component';

const routes: Routes = [
  {path: 'blob', component: BlobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
