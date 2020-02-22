import { html } from 'lit-html'
import router, { loadUrl } from './router'

export function addMenuItem(url, label) {
  return {url, label}
}

function closeMenu() {
  const menuCtrl = document.querySelector('ion-menu-controller')
  menuCtrl.close()
}

export default function({color, routes, title}) { 
  return html`
    <style>
      .content {
        padding-top: 64px;
        cursor: pointer;
        z-index: 1;
      }
    </style>
    <!-- <link href="./core.css" type="stylesheet"/> -->
    <ion-menu side="start" id="first" contentId="content-menu">
      <ion-header>
        <ion-toolbar color="${color}" >
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        ${routes.map(({url, label}) => html`
          <ion-list *ngFor="let item of items">
            <!-- <a href="${url}"> -->
              <ion-item @click=${() => {loadUrl(url, label); closeMenu();}}> ${label}</ion-item>
            <!-- </a> -->
          </ion-list>
        `)}
      </ion-content>
    </ion-menu>


    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      <ion-title>${title}</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-router-outlet id="content-menu" class="content" contentId="content-menu" main>
      ${router({routes})}
    </ion-router-outlet>
  `;
}