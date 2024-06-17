import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-liste-recettes',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './liste-recettes.component.html',
  styleUrl: './liste-recettes.component.scss'
})
export class ListeRecettesComponent {

}
