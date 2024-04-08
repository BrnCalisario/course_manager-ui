import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrl: './header.component.scss'
})
export class Header implements OnInit {

	@Input()
	public title !: string;

	@Input()
	public description !: string;

	@Input()
	public back: boolean = false;

	@Input()
	public backFn !: ($event: MouseEvent) => void;

	constructor(private readonly _location: Location) { }

	public ngOnInit(): void {
		if (!this.backFn) this.backFn = this._backFn;
	}

	public _backFn() {
		this._location.back();
	}
}
