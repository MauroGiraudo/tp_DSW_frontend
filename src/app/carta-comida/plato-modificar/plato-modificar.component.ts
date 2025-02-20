import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatoService } from '../../service/plato.service.js';  
import { Plato1 } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-modificar-plato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './plato-modificar.component.html',  
  styleUrls: ['./plato-modificar.component.scss']  
})
export class PlatoModificarComponent implements OnInit {
  platoForm!: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  platoActual: Plato1 | null = null; 

  constructor(
    private fb: FormBuilder, 
    private platoService: PlatoService,  
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    const numPlato = this.router.getCurrentNavigation()?.extras.state?.['numPlato'];
    if (numPlato) {
      this.obtenerPlato(numPlato);
    }
  }

  inicializarFormulario(): void {
    this.platoForm = this.fb.group({
      numPlato: ['', [Validators.required]],  
      descripcion: [''],
      tiempo: [''],
      precio: [''],  
      tipoPlato: [''],  
      aptoCeliaco: [false],
      aptoVegetarianos: [false],
      aptoVeganos: [false],
      imagen: ['', [this.urlValidator()]],
      ingredientes: this.fb.array([])
    });
  }

  get fc() {
    return this.platoForm.controls; 
  }

  get ingredientes(): FormArray {
    return this.platoForm.get('ingredientes') as FormArray;
  }

  obtenerPlato(numPlato: number) {
    this.platoService.obtenerPlato(numPlato).subscribe({
      next: (plato: Plato1) => {
        this.platoActual = plato;
        this.platoForm.patchValue({ ...plato, ingredientes: [] });
      },
      error: (error) => {
        console.error('Error al obtener el plato:', error);
        this.mensaje = 'Error al cargar los datos del plato';
      }
    });
  }

  agregarIngrediente(): void {
    this.ingredientes.push(this.fb.group({
      ingrediente: ['', Validators.required],
      cantidadNecesaria: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarIngrediente(index: number): void {
    this.ingredientes.removeAt(index);
  }

    urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;  
    }
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;  
    const isValid = pattern.test(control.value.trim());
    return isValid ? null : { invalidUrl: { value: control.value } };
  };
    }

  actualizarPlato(): void {
    if (this.platoForm.invalid) {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
      return;
    }

    const numPlato = Number(this.platoForm.value.numPlato);
    if (isNaN(numPlato)) {
      this.mensaje = 'Número de plato inválido. Debe ser un número.';
      return;
    }

    const platoActualizado: Partial<Plato1> = {
      ...this.platoActual,
      ...this.platoForm.value,
      tiempo: this.platoForm.value.tiempo ? Number(this.platoForm.value.tiempo) : undefined,
      precio: this.platoForm.value.precio ? Number(this.platoForm.value.precio) : undefined,
      tipoPlato: this.platoForm.value.tipoPlato ? Number(this.platoForm.value.tipoPlato) : undefined,
      ingredientes: this.ingredientes.value.map((ing: any) => ({
        ingrediente: ing.ingrediente,
        cantidadNecesaria: Number(ing.cantidadNecesaria)
      }))
    };

    this.platoService.actualizarPlato(numPlato, platoActualizado).subscribe({
      next: () => {
        this.mensaje = 'Plato actualizado exitosamente';
        this.router.navigate(['cartaComida/Lista']);
      },
      error: (error) => {
        console.error('Error al actualizar el plato:', error);
        this.mensaje = `Error al actualizar el plato: ${error.error?.message || error.message || 'Ocurrió un error desconocido'}`;
      }
    });
  }

  enviar(): void {
    this.enviado = true;
    this.actualizarPlato();
  }
}
