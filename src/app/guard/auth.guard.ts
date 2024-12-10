import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Força o usuário a efetuar login se não estiver autenticado no momento.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: isBrowser() ? window.location.origin + state.url : '/default-redirect',
      });
    }

    // Obtenha os papéis necessários da rota.
    const requiredRoles = route.data["roles"];
    // Permitir que o usuário prossiga se nenhuma função adicional for necessária para acessar a rota.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }
    // Permitir que o usuário prossiga se todas as funções necessárias estiverem presentes.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}

// Função de verificação para garantir que o código está sendo executado no cliente (navegador).
function isBrowser() {
  return typeof window !== 'undefined';
}
