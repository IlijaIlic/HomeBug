import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Register } from './register/register';
import { NotFound } from './not-found/not-found';
import { Login } from './login/login';
import { UserProfile } from './user-profile/user-profile';
import { SearchPage } from './search-page/search-page';
import { UnknownBug } from './unknown-bug/unknown-bug';
import { Encyclopedia } from './encyclopedia/encyclopedia';
import { KnownBug } from './known-bug/known-bug';
import { Contact } from './contact/contact';
import { AfterUpload } from './after-upload/after-upload';

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
        path: 'login',
        component: Login
    },
    {
        path: 'profile',
        component: UserProfile
    },
    {
        path: 'encyclopedia',
        component: Encyclopedia
    },
    {
        path: 'encyclopedia/known',
        component: KnownBug
    },
    {
        path: 'search',
        component: SearchPage
    },
    {
        path: 'search/uploaded',
        component: AfterUpload
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'search/unknown',
        component: UnknownBug
    },

    {
        path: '**',
        component: NotFound
    },
];
