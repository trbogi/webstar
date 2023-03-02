import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthTokenInterceptor {
    constructor(private authService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token;

        if (this.authService.isLoggedIn()){
            token = localStorage.getItem("token");
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });
            return next.handle(cloned);
        }else{
            this.authService.logout();
            return next.handle(req);
        }
}
}
