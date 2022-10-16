import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatPaginatorModule } from '@angular/material/paginator';

import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroItemComponent } from './heroes-list/hero-item/hero-item.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';

@NgModule({
    declarations: [
        HeroesComponent,
        HeroesListComponent,
        HeroItemComponent,
        HeroDetailComponent,
        HeroEditComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        HeroesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule
    ]
})
export class HeroesModule {}