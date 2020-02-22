import { html, directive } from 'lit-html'
import alert from './alert'

let listEvent = true
let cache = []

let autoIncrementToDoId = 0

export function incrementToDoId() {
  return ++autoIncrementToDoId
}


const listDirective = directive(({items}) => (part) => {
  let path = ''
  cache = items
  setInterval(() => {
    // console.log(path)  
    if (listEvent) {
      listEvent = false
      path = location.pathname

      const result = cache.map(({id, label}) => html`
        <ion-item>
          <ion-label>${label}</ion-label>
          <ion-badge slot="end" color="danger" @click=${() => removeFromCache(id)}>Eliminar</ion-badge>
        </ion-item>
      `)

      part.setValue(result)
      part.commit()
    }
  }, 1)
});

export function addToDoItem(id, label) {
  return {id, label}
}

function addFromCache(id, label) {
  cache.push(addToDoItem(id, label))
  listEvent = true
  alert('Elemento agregado', 'success')
}

function removeFromCache(id) {
  cache = cache.filter(v => v.id !== id)
  listEvent = true
  alert('Elemento eliminado', 'danger')
}

export default function({items}) {
  let input = ''
  
  return html`
    <ion-item>
      <ion-label position="floating">Nuevo</ion-label>
      <ion-input @change=${v => input = v.target.value}></ion-input>
    </ion-item>
    <ion-button expand="block" @click=${() => addFromCache(incrementToDoId(), input)}>Agregar</ion-button>

    <ion-list>
      ${listDirective({items})}
    </ion-list>
<!-- 
    <choco-clock></choco-clock> -->
  `;
}
