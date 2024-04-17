import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from "@vercel/analytics";
import { SideNavComponent } from './features/side-nav/side-nav.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SideNavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

	public ngOnInit(): void {
		inject();
	}

}
