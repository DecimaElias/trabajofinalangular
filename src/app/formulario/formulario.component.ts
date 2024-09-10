import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { recomendados } from '../types/types';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
  
  <p>Complete el siguiente formulario para agregar un libro a la lista.</p>
  <header>
    <form class="formIng" [formGroup]="recomendadosForm"(submit)="handleSubmit()">
    <div>
      <label for="titulo">Título del Libro: </label>
      <input class="input" type="text" id="titulo" formControlName="titulo" placeholder="Ingrese el Nombre">
    </div>
    <div>
      <label for="fecha">Año de publicación: </label>
      <input class="input" type="text" id="fecha" formControlName="fecha" placeholder="Ingrese el Año">
    </div>
    <div>
      <label for="autor">Nombre del Autor: </label>
      <input class="input" type="text" id="autor" formControlName="autor" placeholder="Ingrese el Autor">
    </div>
    <div>
      <button type="submit" class="btIng">Agregar a la lista</button>
    </div>
      </form>
  </header>
  
  `,
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  @Output() recomenNew = new EventEmitter<recomendados>()

  recomendadosForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
  
  });

  get titulo(){
    return this.recomendadosForm.get('titulo') as FormControl
  }
  get fecha(){
    return this.recomendadosForm.get('fecha') as FormControl
  }
  get autor(){
    return this.recomendadosForm.get('autor') as FormControl
  }

  handleSubmit() {
    const newRecomendados = {
      titulo: this.titulo.value,
      fecha: this.fecha.value,
      autor: this.autor.value,
    };
   this.recomenNew.emit(newRecomendados);
  }
  
  
  


}
