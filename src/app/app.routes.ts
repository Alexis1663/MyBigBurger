import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListeRecettesComponent } from './components/liste-recettes/liste-recettes.component';
import { LoginComponent } from './components/login/login.component';
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import { ListeIngredientsComponent } from './components/liste-ingredients/liste-ingredients.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'liste-recettes',
        component: ListeRecettesComponent
    },
    {
        path: 'recette/:id',
        component: RecipeDetailComponent
    },
    {
        path: 'liste-ingredients',
        component: ListeIngredientsComponent,
        canActivate: [AuthGuard]
    }
];
