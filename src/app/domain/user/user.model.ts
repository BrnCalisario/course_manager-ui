import { BaseEntity } from '../base/base.endpoint';

export default class User implements BaseEntity<string> {
	Id: string = '';
	UserName: string = '';
	Password: string = '';
	Email: string = '';
}

export class RegisterDto {
	UserName: string = '';
	Password: string = '';
	Email: string = '';
}

export class LoginDto {
	Email: string = '';
	Password: string = '';
}
