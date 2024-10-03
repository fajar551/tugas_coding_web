import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarangListComponent } from './pages/barang-list/barang-list.component';
import { BarangCreateEditComponent } from './pages/barang-create-edit/barang-create-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/barang', pathMatch: 'full' },

  {
    path: 'barang',
    component: BarangListComponent
  },

  {
    path: 'barang/create',
    component: BarangCreateEditComponent
  },

  {
    path: 'barang/edit/:id',
    component: BarangCreateEditComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
