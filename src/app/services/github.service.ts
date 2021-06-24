import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  public endpoint: string = 'https://api.github.com/search/repositories';

  constructor(
    private http: HttpClient
  ) { }

  

  getConsultaAPI(id: any) {
    const params: any = {
      page: 1,
      per_page: 10,
      sort: 'stars',
      order: 'desc'
    }
    const url: string = this.endpoint + '?q=' + id + '&page=' + params.page + '&per_page=' + params.per_page + '&sort=' + params.sort + '&order=' + params.order;
    //const url: string = 'https://api.github.com/search/repositories?q=framework+language:javascript&page=1&per_page=10&sort=stars&order=desc';
    return this.http.get(url);
  }
}
