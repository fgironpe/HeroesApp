import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Hero } from "../hero.model";
import { HeroesService } from "../heroes.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  heroSub!: Subscription;
  hero!: Hero;
  id!: number;

  constructor(private heroesService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.heroSub = this.heroesService.getHero(this.id).subscribe((hero: Hero) => {
        this.hero = hero;
      });
    });
  }

  ngOnDestroy(): void {
    this.heroSub.unsubscribe();
  }

  onReturn() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}