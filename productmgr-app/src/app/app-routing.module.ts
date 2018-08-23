import { DeleteComponent } from './delete/delete.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'new', component: NewComponent },
  { path: 'delete/:id', component: DeleteComponent },
  { path: 'home', component: HomeComponent},
  {path:'',pathMatch:'full',component:ProductsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
