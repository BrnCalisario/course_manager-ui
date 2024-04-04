import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';

@Component({
	selector: 'app-side-nav',
	standalone: true,
	templateUrl: './side-nav.component.html',
	template: `<ng-content></ng-content>`,
	styleUrl: './side-nav.component.scss',
	imports: [SharedModule, MatSidenavModule, MatToolbarModule, MatIconButton]
})
export class SideNavComponent {
}
