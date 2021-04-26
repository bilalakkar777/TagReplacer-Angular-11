import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagReplacComponent } from './tag-replac/tag-replac.component';

const routes: Routes = [
  {path: '', component: TagReplacComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
