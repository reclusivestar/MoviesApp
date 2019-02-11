import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import _ from "lodash";
import { MatSnackBar } from '@angular/material';

import { MovieService } from "../movie.service";
import { Movie } from "../movie";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MovieService],
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  public listTitles: Observable<Movie[]>;
  public options: Observable<Movie[]>;
  public listEdit: boolean = false;
  public query = new FormControl();
  public listQuery = new FormControl();
  public allExpandState: boolean = false;
  private movie: Movie;

  constructor(private dataService: MovieService, private snackBar: MatSnackBar) {
    this.movie = new Movie();
  }

  ngOnInit() {
    this.listTitles = this.dataService.movieList;
    this.listTitles
      .subscribe(data =>
        data.map(x => {
          x.sublist = _.filter(data, { listTitle: x.listTitle });
        })
      );
    this.listTitles = this.dataService.movieList.pipe(map(data => _.uniqBy(data, 'listTitle')));
    this.dataService.getAll();
    this.options = this.query.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
      switchMap(query => this.dataService.getOmdb(query)));
  }
  public removeMovie(movieId: number) {
    this.dataService.removeMovie(movieId);
  }
  public toEdit() {
    this.listEdit = !this.listEdit;
  }
  public expandState() {
    this.allExpandState = !this.allExpandState;
  }

  public addMovie() {
    if (!this.query.value || !this.listQuery.value) {
      alert('Enter non-empty list title and movie name');
      return;
    }
    this.movie.title = this.query.value;
    this.movie.listTitle = this.listQuery.value;
    this.dataService.addMovie(this.movie);
    this.snackBar.open(`Added ${this.query.value} to ${this.listQuery.value}`, 'Done', { duration: 4000 });
  }
}
