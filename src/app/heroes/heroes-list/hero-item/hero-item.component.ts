import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Hero } from "../../hero.model";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationData } from "src/app/shared/models/confirmation-data.model";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { HeroesService } from "../../heroes.service";
import { ToastrService } from "src/app/shared/toastr/toastr.service";

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent implements OnInit {
  @Input()
  hero!: Hero;
  
  @Input()
  index!: number;

  @Output() heroDeleted = new EventEmitter();

  constructor(
    private heroesService: HeroesService,
    private router: Router, 
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    
  ) {}

  ngOnInit() {}

  onAddHero() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditHero() {
    this.router.navigate([this.index, 'edit'], { relativeTo: this.route });
  }

  onDeleteHero(id: number) {
    const confirmationData: ConfirmationData = {
      title: 'Delete hero',
      message: `Are you sure you want to delete ${this.hero.name}.`
    }
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationData
    });

    confirmationDialog.afterClosed().subscribe(confirm => {
      if (confirm === true) {
        this.heroesService.deleteHero(id).subscribe((deletedHero: Hero) => {
          this.heroDeleted.emit();
          this.toastrService.openToastr(`Hero has been deleted successfully.`, 'ok-toastr');
        });
      }
    });
  }
}