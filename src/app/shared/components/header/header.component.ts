import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

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

	@Output()
	public onBack: EventEmitter<void> = new EventEmitter<void>();

	constructor(private readonly _location: Location) { }

	public ngOnInit(): void {

	}

	public _backFn() {

		this.onBack.emit();

		if (this.back) return;

		this._location.back();
	}
}
