import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiReqComponent } from './api-req/api-req.component';
import { SearchBarreComponent } from './search-barre/search-barre.component';

const routes: Routes = [{ path: "acceuil", component: ApiReqComponent, },
{ path: "search", component: SearchBarreComponent, }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
