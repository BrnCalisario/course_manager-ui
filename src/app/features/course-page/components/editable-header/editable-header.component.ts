import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared/shared.module";
import { MatIconButton } from "@angular/material/button";
import {FormControl, Validators} from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDivider } from "@angular/material/divider";

@Component({
    selector: 'editable-header',
    standalone: true,
    imports: [SharedModule,  MatIconButton, MatFormFieldModule, MatInputModule, MatDivider],
    templateUrl: './editable-header.component.html',
    styleUrl: './editable-header.component.scss'
})
export default class EditableHeader {

    @Input()
    public courseName : FormControl<string | null> = new FormControl<string>('', [Validators.required]);

    public edit : boolean = !this.courseName.value;

    public toggleEdit() : void {

        if(!this.courseName.value && this.edit)
            return;

        this.edit = !this.edit;
    }
}