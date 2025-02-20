import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheatherComponent } from './wheather/wheather.component';
import { CountriesComponent } from './countries/countries.component';

const routes: Routes = [
  { path: '', component: CountriesComponent, pathMatch: 'full' },
  { path: 'weather', component: WheatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
