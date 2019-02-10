import { Observable } from 'rxjs';

export class Movie {
  id: number;
  title: string;
  listTitle: string;
  sublist: Observable<Movie[]>;
}
