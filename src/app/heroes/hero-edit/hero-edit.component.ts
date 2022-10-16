import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastrService } from "src/app/shared/toastr/toastr.service";
import { Hero } from "../hero.model";
import { HeroesService } from "../heroes.service";

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode: boolean = false;
  heroSub!: Subscription;
  hero!: Hero;
  heroForm!: UntypedFormGroup;

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
    
    if (this.editMode) {
      this.heroSub = this.heroesService.getHero(this.id).subscribe((hero: Hero) => {
        this.hero = hero;
        this.initForm();
      });
    } else {
      this.hero = {
        id: 0,
        name: '',
        alterEgo: '',
        description: '',
        universe: '',
        author: '',
        year: 0,
        imageUrl: '',
        imageAlt: ''
      }     
      this.initForm();
    }
  }

  ngOnDestroy() {
    if(this.editMode) {
      this.heroSub.unsubscribe();
    }
  }

  initForm() {
    let heroName = '';
    let heroAlterEgo = '';
    let description = '';
    let universe = '';
    let author = '';
    let year = 0;
    let imageUrl = '';

    if (this.editMode) {
        heroName = this.hero.name;
        heroAlterEgo = this.hero.alterEgo;
        description = this.hero.description;
        universe = this.hero.universe;
        author = this.hero.author;
        year = this.hero.year;
        imageUrl = this.hero.imageUrl;
    }

    this.heroForm = new UntypedFormGroup({
      'name': new UntypedFormControl(heroName, Validators.required),
      'alterEgo': new UntypedFormControl(heroAlterEgo),
      'description': new UntypedFormControl(description, Validators.required),
      'universe': new UntypedFormControl(universe, Validators.required),
      'author': new UntypedFormControl(author),
      'year':  new UntypedFormControl(year, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'imageUrl': new UntypedFormControl(imageUrl, Validators.required)
    });
  }

  onSubmit() {
    const heroToAddOrEdit: Hero = {
      ...this.heroForm.value, 
      imageAlt: `${this.heroForm.value.name } image`
    }

    if (this.editMode) {
      this.editHero(this.hero.id, heroToAddOrEdit);
    } else {
      this.addHero(heroToAddOrEdit);
    }
  }

  addHero(hero: Hero) {
    this.heroesService.addHero(hero).subscribe((addedHero: Hero) => {
      this.toastrService.openToastr(`${ addedHero.name } has been added.`, 'ok-toastr');
    });
    this.onCancel();
  }

  editHero(id: number, hero: Hero) {
    this.heroesService.updateHero(id, hero).subscribe((updatedHero: Hero) => {
      this.toastrService.openToastr(`${ updatedHero.name } has been updated.`, 'ok-toastr');
    });
    this.onCancel()
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['/heroes']);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}