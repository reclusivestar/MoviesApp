import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { map } from "rxjs/operators";
//import 'rxjs/add/operator/do'; // debug
import { Observable } from "rxjs";
import { Subject } from 'rxjs'; 
import { BehaviorSubject } from 'rxjs';
import _ from "lodash";


import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public movieList: Observable<Movie[]>;
  private _movieList: BehaviorSubject<Movie[]>;
  private baseUrl: string;
  private api: string;
  private dataStore: {
    movieList: Movie[];
  };

  constructor(private http: Http) {
    this.baseUrl = '/api/';
    this.api = '&apikey=84f5eab3';
    this.dataStore = { movieList: []};
    this._movieList = <BehaviorSubject<Movie[]>>new BehaviorSubject([]);
    this.movieList = this._movieList.asObservable();
  }
  // Method to get all movies by calling /api/GetAllMovies
  public getAll() {
    this.http.get(`${this.baseUrl}GetAllMovies`)
      .pipe(map(response => response.json()))
      .subscribe(data => {
        this.movieList = data;
        this.dataStore.movieList = data;
        // Adding newly added Movie in the list
        this._movieList.next(Object.assign({}, this.dataStore).movieList);
        //console.log(this.movieList);
      }, error => console.log('Could not load movie.'));
  }

  public getOmdb(path: string) {
    return this.http
      .get('https://www.omdbapi.com/?s=' + path + this.api)
      .pipe(map((res) => res.json().Search || []))
  }

  public addMovie(movie: Movie) {
    console.log("add movie");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add movie : ' + JSON.stringify(movie));

    this.http.post(`${this.baseUrl}AddMovie/`, JSON.stringify(movie), { headers: headers })
      .pipe(map(response => response.json()))
      .subscribe(data => {
        this.dataStore.movieList.push(data);
        this._movieList.next(Object.assign({}, this.dataStore).movieList);
      }, error => console.log('Could not create todo.'));
  };

  public updateMovie(newMovie: Movie) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('Update Employee : ' + JSON.stringify(newMovie));

    this.http.put(`${this.baseUrl}UpdateMovie`, JSON.stringify(newMovie), { headers: headers })
      .pipe(map(response => response.json())).subscribe(data => {
        alert("hi");
        this.dataStore.movieList.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.movieList[i] = data; }
        });
      }, error => console.log('Could not update todo.'));
  };
  public removeMovie(movieId: number) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log("removeItem:" + movieId);
    this.http.delete(`${this.baseUrl}DeleteMovie/${movieId}`, { headers: headers }).subscribe(response => {
      this.dataStore.movieList.forEach((t, i) => {
        if (t.id === movieId) { this.dataStore.movieList.splice(i, 1);}
      });

      this._movieList.next(Object.assign({}, this.dataStore).movieList);
    }, error => console.log('Could not delete Employee.'));
  }
}

