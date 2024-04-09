import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User, { LoginDto, RegisterDto } from "@domain/user/user.model";
import { Observable } from "rxjs";
import { environment } from "src/app/app.config";

@Injectable({ providedIn: 'root' })
export class AuthEndpoint {

    get route(): string {
        return environment.APP_URL + '/odata/User';
    }

    constructor(private readonly http: HttpClient) {
    }

    public register(registerDto: RegisterDto): Observable<User> {
        return this.http.post<User>(this.route, registerDto);
    }

    public login(loginDto: LoginDto): Observable<string> {
        return this.http.post<string>(`${this.route}/Login`, loginDto);
    }
}