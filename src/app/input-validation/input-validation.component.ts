import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const MENSAJES_VALIDACION: any = {
  email: 'El email no es válido',
  required: 'Este campo es requerido',
  noCoincide: 'Las contraseñas no coinciden'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements OnChanges, OnInit {

  @Input()
  control!: AbstractControl
  @Input()
  mostrarErrores: boolean = true

  mensajesError: string[] = []

  ngOnInit() {
    this.control.statusChanges.subscribe(() => {
      this.verValidacion()
    })
    this.control.valueChanges.subscribe(() => {
      this.verValidacion()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verValidacion()
  }

  verValidacion() {
    const errors = this.control.errors
    if(!errors) {
      this.mensajesError = []
      return
    }
    const errorKeys = Object.keys(errors)
    this.mensajesError = errorKeys.map((key) => MENSAJES_VALIDACION[key])
  } 

}
