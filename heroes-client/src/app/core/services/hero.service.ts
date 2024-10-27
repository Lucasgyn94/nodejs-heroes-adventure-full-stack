import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = `${environment.apiUrl}/api/heroes`;

  constructor(private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.apiUrl);
  }

  getHero(id: string): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this.apiUrl}/${id}`);
  }

  createHero (hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.apiUrl, hero);
  }

  updateHero(id: string, hero: Partial<Hero>): Observable<Hero>{
    return this.httpClient.put<Hero>(`${this.apiUrl}/${id}`, hero).pipe(
      tap(updated => console.log('Updated hero:', updated))
    );
  }
  /*
  updateHero(id: string, hero: Partial<Hero>): Observable<Hero>{
    return this.httpClient.put<Hero>(`${this.apiUrl}/${id}`, hero);
  }
    */

  deteleHero(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
