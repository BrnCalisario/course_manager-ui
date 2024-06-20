
import { Component } from '@angular/core';
import { SideNavComponent } from '@features/side-nav/side-nav.component';

import { SharedModule } from '../../shared/shared.module';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [SharedModule, SideNavComponent],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
}
