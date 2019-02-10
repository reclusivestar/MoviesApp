import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MyMaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule.forRoot([
      { path: '', component: MovieListComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
