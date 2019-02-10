import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [MatListModule, MatExpansionModule, MatFormFieldModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatAutocompleteModule],
  exports: [MatListModule, MatExpansionModule, MatFormFieldModule, MatButtonModule, MatSlideToggleModule, MatInputModule, MatAutocompleteModule]
})

export class MyMaterialModule { }
