import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiLibrosService } from './services/api-libros.service';
import { Observable } from 'rxjs';
import { libros } from './types/types';
import { HomeComponent } from './home/home.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { RecomendadosComponent } from './recomendados/recomendados.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, HomeComponent, RouterOutlet, RecomendadosComponent, RouterLink],
  template: `
  
  <header class="todo">
    
    <h1 class = "tittle">Lista de libros de {{title}}!</h1>
      @if(ResultadoLibros$ | async; as listaLibros){
        <app-home [home] = "listaLibros"/>

    }
  
 
  
  <div class = "butt">
      Gracias por visitar nuestra página, usted puede <button class="btrec" a routerLink = "/recomendados">Recomendar un libro</button>        
  </div>
 
<router-outlet/>
  
 </header>
  `,

  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit{
  
  public ResultadoLibros$!: Observable<libros[]>
  title = 'Sthepen King';

  
  constructor(private apiLibros: ApiLibrosService){}

  ngOnInit(): void {
    this.ResultadoLibros$ = this.apiLibros.getAll()
  }
}
