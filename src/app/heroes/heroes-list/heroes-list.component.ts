import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Hero } from '../hero.model';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroesSub!: Subscription;
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  heroToFilter: string = '';

  pageSize: number = 8;
  pageSizeOptions: number[] = [4, 8, 12, 16];
  pageEvent!: PageEvent;

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy() {
    this.heroesSub.unsubscribe();
  }

  getHeroes() {
    this.heroesSub = this.heroesService.getHeroes()
      .subscribe(
        (heroes: Hero[]) => {
          this.heroes = heroes;
          this.filteredHeroes = heroes;
        }
      )
  }

  filterHeroes(event: Event)  {
    const filterValue = (event.target as HTMLInputElement).value;
    const heroesFiltered = this.heroes.filter(hero => hero.name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()));
    
    if (heroesFiltered !== undefined) {
      this.filteredHeroes = heroesFiltered;
    } else {
      this.filteredHeroes = [];
    }
  }

  onAddHero() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
