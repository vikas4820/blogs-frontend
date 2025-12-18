import { Routes } from '@angular/router';
import { FrontendComponent } from './layouts/frontend-component/frontend-component';
import { BackendComponent } from './layouts/backend-component/backend-component';
import { LoginComponent } from './auth/login-component/login-component';
import { RegisterComponent } from './auth/register-component/register-component';
import { HomeComponent } from './pages/frontend/home-component/home-component';
import { BlogComponent } from './pages/frontend/blog-component/blog-component';
import { AuthorComponent } from './pages/frontend/author-component/author-component';
import { AboutUsComponent } from './pages/frontend/about-us-component/about-us-component';
import { ContactUsComponent } from './pages/frontend/contact-us-component/contact-us-component';
import { PrivacyPolicyComponent } from './pages/frontend/privacy-policy-component/privacy-policy-component';
import { TermsConditionsComponent } from './pages/frontend/terms-conditions-component/terms-conditions-component';
import { DashboardComponent } from './pages/backend/dashboard-component/dashboard-component';
import { ForgetPasswordComponent } from './auth/forget-password-component/forget-password-component';
import { RessetPasswordComponent } from './auth/resset-password-component/resset-password-component';
import { BlogsComponent } from './pages/backend/blogs-component/blogs-component';
import { BlogsCategoryComponent } from './pages/backend/blogs-category-component/blogs-category-component';
import { BlogsCategoryFormComponent } from './pages/backend/blogs-category-form-component/blogs-category-form-component';
import { BlogsFormComponent } from './pages/backend/blogs-form-component/blogs-form-component';
import { authGuard } from './guards/auth-guard';
import { UsersComponent } from './pages/backend/users-component/users-component';
import { UsersFormComponent } from './pages/backend/users-form-component/users-form-component';
import { UserProfileComponent } from './pages/backend/user-profile-component/user-profile-component';
import { UnauthorizedComponent } from './shared/unauthorized-component/unauthorized-component';
import { NotFoundComponent } from './shared/not-found-component/not-found-component';

export const routes: Routes = [

    {
        path: '',
        component: FrontendComponent,
        children: [
            { path: '', component: HomeComponent }, 
            { path: 'blog/:slug/:id', component: BlogComponent }, 
            { path: 'author', component: AuthorComponent, canActivate: [authGuard] }, 
            { path: 'contact-us', component: ContactUsComponent }, 
            { path: 'about-us', component: AboutUsComponent }, 
            { path: 'privacy-policy', component: PrivacyPolicyComponent }, 
            { path: 'terms-conditions', component: TermsConditionsComponent }, 
        ]
    },

    {
        path: 'user',
        component: BackendComponent,
        children: [
            { path: '', component: DashboardComponent, canActivate: [authGuard], data: { roles: ['admin', 'user'] } },
            { path: 'blogs', component: BlogsComponent, canActivate: [authGuard], data: { roles: ['admin', 'user'] } },
            { path: 'blogs/create', component: BlogsFormComponent, canActivate: [authGuard], data: { roles: ['admin', , 'user'] } },
            { path: 'blogs/edit/:id', component: BlogsFormComponent, canActivate: [authGuard], data: { roles: ['admin', 'user'] } },
            { path: 'blogs-category', component: BlogsCategoryComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
            { path: 'blogs-category/create', component: BlogsCategoryFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
            { path: 'blogs-category/edit/:id', component: BlogsCategoryFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
            { path: 'all-users', component: UsersComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
            { path: 'all-users/edit/:id', component: UsersFormComponent, canActivate: [authGuard], data: { roles: ['admin'] } },
            { path: 'profile', component: UserProfileComponent, canActivate: [authGuard], data: { roles: ['admin', 'user'] } },
        ]
    },

    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent }, 
            { path: 'signup', component: RegisterComponent },
            { path: 'reset-password', component: RessetPasswordComponent },
            { path: 'forgot-password', component: ForgetPasswordComponent }
        ]
    }, 
    
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: NotFoundComponent } 
    
];
