import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CourseCardComponent } from './components/course-card/course-card.component';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [SharedModule, CourseCardComponent],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent {

  constructor() { 

  }

}
