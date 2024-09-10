import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiLibrosService } from '../services/api-libros.service';
import { Observable, switchMap} from 'rxjs';
import { recomendados } from '../types/types';
import { HomeComponent } from '../home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from "../formulario/formulario.component";

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [AsyncPipe, HomeComponent, ReactiveFormsModule, FormularioComponent],
  template: `

  <header class = "rec">
    <h1>Libros recomendados</h1>
    <h3>En esta sección cada usuario que nos visita puede recomendarnos un libro.</h3>
    
      @if(ResultadoLibros$ | async; as listaRecomendados){
      
    <table class ="table">
      <thead class ="colum">
        <tr class = "columnas">
          <th scope="col">Título</th>
          <th scope="col">Año</th>
          <th scope="col">Autor</th>
        </tr>
      </thead>
      <tbody>
       @for(recomendados of listaRecomendados; track recomendados.id; let i = $index){
        <tr>
          <td>{{recomendados.titulo}}</td>
          <td>{{recomendados.fecha}}</td>
          <td>{{recomendados.autor}}</td>
        </tr>
        }
      </tbody>
    </table>
      }
   <app-formulario (recomenNew)="onRecomNew($event)" />   
    
  `,
  styleUrl: './recomendados.component.css'
})


export class RecomendadosComponent implements OnInit{
  
  public ResultadoLibros$!: Observable<recomendados[]>

  constructor(private apiRecomendados: ApiLibrosService){}

  ngOnInit(): void {
    this.ResultadoLibros$ = this.apiRecomendados.getAlle()
}

onRecomNew(newRecomendados: recomendados){
  this.ResultadoLibros$ = this.apiRecomendados.createOne(newRecomendados).pipe(switchMap(()=> this.apiRecomendados.getAlle()))
}

}
