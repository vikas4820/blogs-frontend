import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('access_token');

  if (!token) {
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  if (jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('access_token');
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  const decoded: any = jwtHelper.decodeToken(token);
  const userRole = decoded?.role?.name;

  const allowedRoles: string[] = route.data['roles'] ?? [];
  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    router.navigate(['/unauthorized']); 
    return false;
  }

  return true;
};
