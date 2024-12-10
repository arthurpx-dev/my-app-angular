import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeycloakAngularModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app-angular';
}
