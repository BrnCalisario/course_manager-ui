import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-class-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './class-page.component.html',
	styleUrl: './class-page.component.scss'
})
export class ClassPageComponent {

}
