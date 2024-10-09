import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TextInputComponent } from "../text-input/text-input.component";
import { DefaultButtonComponent } from "../default-button/default-button.component";
import { UsuarioService } from '../service/usuario.service.js';
import { UsuarioLogIn } from '../shared/usuarioInterfaces.js';
import { Usuario } from '../shared/usuario.entity.js';
import { AlmacenamientoService } from '../service/almacenamiento.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  usuarioLogueado: Usuario | undefined

  loginForm!: FormGroup
  enviado: boolean = false
  homeURL = '/home'
  
  constructor (private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {}

  ngOnInit(): void {
    const redirigirAHome = this.almacenamientoService.getItem('redirigirAHome')
    if(redirigirAHome === 'true') {
      this.almacenamientoService.removeItem('redirigirAHome')
      this.router.navigateByUrl(this.homeURL)
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      contrasenia: ['', Validators.required]
    })
  }

  get fc() {
    return this.loginForm.controls
  }

  enviar() {
    this.enviado = true
    if(this.loginForm.invalid) return

    const formValues = this.loginForm.value
    const usuario: UsuarioLogIn = {
      email: formValues.email,
      contrasenia: formValues.contrasenia
    } 
    this.usuarioService.loginUsuario(usuario).subscribe((response) => {
      this.usuarioLogueado = response.data
      console.log(response.message)
      this.almacenamientoService.setItem('redirigirAHome', 'true')
      window.location.reload()
    })
  }
}
