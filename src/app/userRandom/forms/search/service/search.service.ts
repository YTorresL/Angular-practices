import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Datum, Welcome } from '../../../tables/table-search/table-search.component';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private dataSubject = new BehaviorSubject<Datum[]>([]);
  data$: Observable<Datum[]> = this.dataSubject.asObservable();
  private filteredDataSubject = new BehaviorSubject<Datum[]>([]);
  filteredData$: Observable<Datum[]> = this.filteredDataSubject.asObservable();


  constructor(private httpClient: HttpClient) {
    this.fetchData();
  }
  
  fetchData(): void {
    this.httpClient.get<Welcome>('https://api.freeapi.app/api/v1/public/randomusers')
      .pipe(
        map(response => response.data.data),
        catchError(error => {
          console.error('Fetch Data Error:', error);
          return of([]); // Retorna un observable vacío en caso de error
        })
      )
      .subscribe(data => {this.dataSubject.next(data)
      this.filteredDataSubject.next(data);});
  }

  searchUsers(search: string): void {
    this.data$.pipe(
      map(data =>
        data.filter(user =>
          user.name.first.toLowerCase().includes(search.toLowerCase()) ||
          user.name.last.toLowerCase().includes(search.toLowerCase())
        )
      )
    ).subscribe(filtered => this.filteredDataSubject.next(filtered));
  }
}
