import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { libros } from '../types/types';
import { ApiLibrosService } from '../services/api-libros.service';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `

  
    <table class = "table">
      <thead>
        <tr class = "columnas">
          <th scope="col">#</th>
          <th scope="col">Título</th>
          <th scope="col">Año</th>
          <th scope="col">Género</th>
          <th scope="col">Descripción</th>
        </tr>
      </thead>

  <tbody>
  @for(libro of libros; track libro.id; let i = $index) {
    <tr>
        <td>{{i + 1}}</td>
        <td>{{libro.titulo}}</td>
        <td>{{libro.fecha}}</td>
        <td>{{libro.genero}}</td>
        <td class="butcenter">
        <button class= "buttondesc"(click)="mostrarDescripcion(libro.id)">Ver Descripcion</button> 
        </td>
    </tr>
     
     
  }
  </tbody>
</table>


<div class = "descripcion">

@if(descripcion){
  <h3 class="titdesc">Descripción:</h3>
  <p>{{ descripcion }}</p>
}

</div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() home: libros[] | null = [];
  
  libros: any[] =[];
  descripcion: string | undefined;
  selectedLibroId: number | undefined;

  constructor (private apiLibros: ApiLibrosService) {}

ngOnInit(): void {
  this.apiLibros.getLibros().subscribe(data => {
    this.libros = data;
  }, error => {
    console.error('Error en la descripcion:', error);
  
  });
}

mostrarDescripcion(id: number): void {
  this.apiLibros.getDescripcionById(id).subscribe(data => {
    this.descripcion = data.descripcion;
    this.selectedLibroId = id;
  }, error => {
    console.error('Error de descripcion:', error);
  });

}}