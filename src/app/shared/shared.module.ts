import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UppercaseDirective } from "./directives/uppercase.directive";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    UppercaseDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ConfirmationDialogComponent,
    UppercaseDirective,
    SpinnerComponent,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {}