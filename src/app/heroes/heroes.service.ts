import { Injectable } from "@angular/core";
import { Hero } from "./hero.model";
import { catchError, delay, Observable, Subject, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastrService } from "../shared/toastr/toastr.service";

@Injectable({ providedIn: 'root' })
export class HeroesService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private toastrService: ToastrService) { }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}/heroes`, hero)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}/heroes`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/heroes/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  updateHero(id: number, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/heroes/${id}`, hero)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`${this.apiUrl}/heroes/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = this.handleErrorMessage(errorRes);
    this.toastrService.openToastr(errorMessage, 'error-toastr')
    return throwError(() => new Error(errorMessage));    
  }

  handleErrorMessage(error: HttpErrorResponse) {
    let errorMessage = ' ';
    switch(error.status) {
      case 0: 
        errorMessage = `${error.statusText} - ${error.message}`
        break;
      case 404:
        errorMessage = `Heroe ${error.statusText}`;
        break;
    }

    return errorMessage;
  }

}
