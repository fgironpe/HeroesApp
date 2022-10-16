import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroEditComponent } from "./hero-edit/hero-edit.component";
import { HeroesListComponent } from "./heroes-list/heroes-list.component";
import { HeroesComponent } from "./heroes.component";

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'new', component: HeroEditComponent },
  { path: ':id', component: HeroDetailComponent },
  { path: ':id/edit', component: HeroEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }