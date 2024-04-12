
import { Component } from '@angular/core';
import { SideNavComponent } from '@features/side-nav/side-nav.component';

import { SharedModule } from '../../shared/shared.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [SharedModule, SideNavComponent],
	templateUrl: './root.component.html',
	styleUrl: './root.component.scss',
})
export class RootComponent {
}
