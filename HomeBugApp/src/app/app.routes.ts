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
import { AfterUploadNotFound } from './after-upload-not-found/after-upload-not-found';
import { Admin } from './admin/admin';
import { BugMap } from './bug-map/bug-map';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'bugmap', component: BugMap },
    { path: 'contact', component: Contact },
    { path: 'encyclopedia', component: Encyclopedia},

    { path: 'profile', component: UserProfile, canActivate: [authGuard] },
    { path: 'encyclopedia/known/:id', component: KnownBug, canActivate: [authGuard] },
    { path: 'search', component: SearchPage, canActivate: [authGuard] },
    { path: 'search/uploaded', component: AfterUpload, canActivate: [authGuard] },
    { path: "search/notfound", component: AfterUploadNotFound, canActivate: [authGuard] },
    { path: 'search/unknown/:id', component: UnknownBug, canActivate: [authGuard] },

    { path: 'admin', component: Admin, canActivate: [authGuard, adminGuard] },

    { path: '**', component: NotFound },
];
