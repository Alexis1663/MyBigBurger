import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListeRecettesComponent } from './components/liste-recettes/liste-recettes.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'liste-recettes',
        component: ListeRecettesComponent
    }
];
