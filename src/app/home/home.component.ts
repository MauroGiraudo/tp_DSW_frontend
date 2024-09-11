import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatoService } from '../service/plato.service.js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor() {}

}
