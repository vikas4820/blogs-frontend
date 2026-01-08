import { signal, computed, Injectable } from '@angular/core';

export interface Role {
  name: string;
}

export interface TokenPayload {
  username: string;
  sub: number;    
  roles: any[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})

export class UserState {
  // state
  private _user = signal<TokenPayload | null>(null);
  private _role = signal<Role | null>(null);

  // selectors
  user = computed(() => this._user());  
  role = computed(() => this._role());

  isLoggedIn = computed(() => !!this._user());
  roleName = computed(() => this._role()?.name ?? null);
  isAdmin = computed(() => this._role()?.name === 'admin');

  setFromToken(payload: TokenPayload) {
    this._user.set(payload);
    this._role.set(
      payload.roles?.length
        ? { name: payload.roles[0]?.name }
        : null
    );
  }

  clear() {
    this._user.set(null);
    this._role.set(null);
  }
}
