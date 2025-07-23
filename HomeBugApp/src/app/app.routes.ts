import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Register } from './register/register';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Landing,

    },
    {
        path: 'register',
        component: Register
    },
    {
        path: '**',
        component: NotFound
    },
];
