import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getBaseUrl(page, sort) {
    return 'https://yts.mx/api/v2/list_movies.json?sort=' + sort + '&limit=50' + '&page=' + page;
}

  constructor(private http: HttpClient) { 

  }

  setCache(page, sort, response) {
    localStorage.setItem('_cache_' + page + '_' + sort, JSON.stringify(response));
  }

  loadPageResults(page, sort) {
    if (!localStorage.getItem('_cache_' + page + '_' + sort)) {
      return this.http.get(this.getBaseUrl(page, sort))
    } else {
      return of(JSON.parse(localStorage.getItem('_cache_' + page + '_' + sort)))
    }
  }
}
