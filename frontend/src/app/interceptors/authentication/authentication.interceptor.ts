import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";
import { LoginService } from "src/app/services/login/login.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        return next
            .handle(
                req.clone(
                    { 
                        setHeaders: {
                            Authorization: `Bearer ${this.loginService.getJwt()}`
                        }
                    }
                )
            ).pipe(
                catchError(
                    (error) => {
                        if(error.status === 401) {
                            this.loginService.resetJwt();
                            this.router.navigate(['/login']);
                        }

                        throw error;
                    }
                )
            );
    }

}