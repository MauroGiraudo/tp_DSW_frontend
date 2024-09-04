import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatoService } from '../service/plato.service.js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(private platoService: PlatoService) {}

  platos: any = {
    message: "",
    data: []
  };
  

  ngOnInit(): void {
    this.getPlatos()
  }

  getPlatos() {
    this.platoService.getPlatos().subscribe((data) => {
      this.platos = data;
      console.log(this.platos)
    })
  }
}
