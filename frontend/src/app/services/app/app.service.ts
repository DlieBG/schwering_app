import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { App } from 'src/app/types/app.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getApps(): Observable<App[]> {
    return this.httpClient.get<App[]>(`${environment.api}/app`);
  }

  getApp(appId: string): Observable<App> {
    return this.httpClient.get<App>(`${environment.api}/app/${appId}`);
  }

}
