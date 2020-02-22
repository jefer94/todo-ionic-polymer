import { html } from 'lit-html'

export default function({children}) { 
  return html`
    <app-root>
      <ion-app>
        ${children}
        <ion-router-outlet></ion-router-outlet>
      </ion-app>
    </app-root>
  `;
}
