import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [MatListModule, MatExpansionModule, MatFormFieldModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatAutocompleteModule, MatToolbarModule, MatSnackBarModule],
  exports: [MatListModule, MatExpansionModule, MatFormFieldModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatAutocompleteModule, MatToolbarModule, MatSnackBarModule]
})

export class MyMaterialModule { }
