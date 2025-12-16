import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const rolesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decoded = jwtHelper.decodeToken(token);
  const allowedRoles = route.data?.['roles'];

  if (!allowedRoles?.includes(decoded?.role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
