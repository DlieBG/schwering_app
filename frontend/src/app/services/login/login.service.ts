import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoginDto, LoginJwt } from 'src/app/types/login.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  update: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.checkJwt();
  }

  checkJwt() {
    if(!this.getJwt())
      this.router.navigate(['/login']);
    else
      this.getLoginJwt();
  }

  getJwt(): string | null {
    return localStorage.getItem('schwering_app_jwt');
  }

  setJwt(jwt: string) {
    localStorage.setItem('schwering_app_jwt', jwt);
    this.update.next();
  }

  resetJwt() {
    localStorage.removeItem('schwering_app_jwt');
    this.router.navigate(['/login']);
  }

  getLoginJwt(): Observable<LoginJwt> {
    return this.httpClient.get<LoginJwt>(`${environment.api}/login`); 
  }

  login(pin: number): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(`${environment.api}/login`, { pin });
  }

}
