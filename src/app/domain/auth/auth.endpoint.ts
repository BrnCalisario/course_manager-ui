import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "@domain/user/user.model";
import { Observable } from "rxjs";
import { environment } from "src/app/app.config";
import { TokenInfo } from "./auth.models";

@Injectable({ providedIn: 'root' })
export class AuthEndpoint {

    get route(): string {
        return environment.APP_URL + '/api/Authenticate';
    }

    constructor(private readonly http: HttpClient) {
    }

    public login(loginDto: LoginDto): Observable<any> {
        return this.http.post<TokenInfo>(`${this.route}/Login`, loginDto);
    }

    public validate(token: string): Observable<TokenInfo> {
        return this.http.post<TokenInfo>(`${this.route}/ValidateToken`, token);
    }
}