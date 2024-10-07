import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuarioRegistro } from '../shared/usuarioRegistro.js';
import { RegistroService } from '../service/registro.service.js';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { validarContrasenias } from '../shared/validaciones/confirmar_contrasenia.js';
import { TextInputComponent } from "../text-input/text-input.component";
import { DefaultButtonComponent } from "../default-button/default-button.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  constructor(private registroService: RegistroService, 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  formularioRegistro!: FormGroup;
  enviado: boolean = false;
  devolverURL = '';

  private validarContrasenia = validarContrasenias

  ngOnInit() {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasenia: ['', Validators.required],
      telefono: ['', Validators.required]
    } ,{
      validators: this.validarContrasenia('contrasenia', 'confirmarContrasenia')
    })

    this.devolverURL = this.activatedRoute.snapshot.queryParams['devolverURL']
  }

  get fc() {
    return this.formularioRegistro.controls
  }

  enviar() {
    this.enviado = true
    if(this.formularioRegistro.invalid) return

    const formValues = this.formularioRegistro.value
    const usuario: UsuarioRegistro = {
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      email: formValues.email,
      contrasenia: formValues.contrasenia,
      telefono: formValues.telefono
    }
    this.registroService.registrarUsuario(usuario).subscribe(_ => {
      this.router.navigateByUrl(this.devolverURL)
    })
  }
}
