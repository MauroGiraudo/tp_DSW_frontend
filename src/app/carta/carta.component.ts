import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../service/plato.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.scss'
})
export class CartaComponent implements OnInit{

  constructor(private platoService: PlatoService) {}

  platos: any = {
    message: ``,
    data: []
  }
  
  ngOnInit(): void {
    this.getPlatos()
  }

  getPlatos() {
    this.platoService.getPlatos().subscribe((data) => {
      this.platos = data;
    })
  }

}
