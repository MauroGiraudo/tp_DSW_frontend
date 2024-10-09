import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from "../input-container/input-container.component";
import { InputValidationComponent } from "../input-validation/input-validation.component";

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [InputContainerComponent, InputValidationComponent, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {

  @Input()
  control!: AbstractControl
  @Input()
  mostrarErrores: boolean = true
  @Input()
  label: string = ''
  @Input()
  type: 'text' = 'text'

  get formControl() {
    return this.control as FormControl
  }

}
