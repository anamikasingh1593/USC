import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Inject,
  Injectable
} from '@angular/core';
import {
  Client,
  CLIENT_TOKEN
} from 'projects/vhap/src/public-api';
import {
  BehaviorSubject,
  Observable,
  of ,
  throwError
} from 'rxjs';
import {
  delay,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  Item,
  Items
} from './model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BetaService {
  private readonly searchingsubject = new BehaviorSubject < boolean > (false);
  private autoSuggestUrl = 'https://vhap.usc.edu/VHAP.IWitness.API/eval/api/Test/GetSearchAutoSuggests';
  private searchResultUrl = 'https://vhap.usc.edu/VHAP.IWitness.API/eval/api/Test/GetSearchResults';
  private searchDetailUrl = 'https://vhap.usc.edu/VHAP.IWitness.API/eval/api/Test/GetItem';
  /**
   *
   */
  readonly searching$ = this.searchingsubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private readonly http: HttpClient,
    @Inject(CLIENT_TOKEN) private readonly client: Client
  ) {}

  /**
   *
   * @returns
   */
  public getVersion(): Observable < string > {
    return of('1').pipe(delay(500));
  }

  /**
   *
   * @param searchTerm
   * @param count
   * @returns
   */
  public getSearchAutoSuggests(
    searchTerm: string,
    count: number
  ): Observable < Items > {
    const url = `${this.autoSuggestUrl}?searchTerm=${searchTerm}&count=${count}`
    return this.http.get < Items > (url, httpOptions);
  }

  /**
   *
   * @param searchTerm
   * @param startIndex
   * @param count
   * @returns
   */
  getSearchResults(
    searchTerm: string,
    startIndex: number,
    count: number
  ): Observable < Items > {
    const url = `${this.searchResultUrl}?searchTerm=${searchTerm}&startIndex=${startIndex}&count=${count}`
    return this.http.get < Items > (url, httpOptions);
  }

  /**
   *
   * @param intCode
   * @returns
   */
  getItem(intCode: number): Observable < Item > {
    const url = `${this.searchDetailUrl}?intCode=${intCode}`
    return this.http.get < Item > (url, httpOptions);
  }
}
