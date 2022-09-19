import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CLIENT_TOKEN } from 'projects/vhap/src/public-api';
import { tap } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { BETA } from './beta';
import { BetaService } from './beta.service';

/*
 * https://angular.io/guide/testing-services#testing-http-services
 * https://angular.io/guide/http#testing-http-requests
 *
 * https://github.com/CodeSequence/jasmine-marbles
 */

describe('BetaService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CLIENT_TOKEN, useValue: BETA }, BetaService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getVersion', (done: DoneFn) => {
    const service = TestBed.inject(BetaService);
    service
      .getVersion()
      .pipe(
        tap((version: string) => {
          expect(version).toBe('1');
          done();
        })
      )
      .subscribe();
  });
});

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
