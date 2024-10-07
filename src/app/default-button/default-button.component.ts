import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {

  @Input()
  type: 'enviar' | 'boton' = 'enviar'
  @Input()
  texto: string = 'Enviar'
  @Input()
  bgColor = 'rgb(91, 61, 35)'
  @Input()
  color = 'white'
  @Input()
  fontSizeRem = 1.3
  @Input()
  widthRem = 12
  @Output()
  onClick = new EventEmitter()

}
