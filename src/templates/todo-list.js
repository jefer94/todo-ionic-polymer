import { html, directive } from 'lit-html'
import alert from './alert'
import lang from '../lang'

let listEvent = true
let cache = []

const keyItems = '__TO_DO_ITEMS__'
const keyId = '__TO_DO_LAST_ID__'

let autoIncrementToDoId = JSON.parse(localStorage.getItem(keyId) || '0')


export function incrementToDoId() {
  return ++autoIncrementToDoId
}


const listDirective = directive(() => (part) => {
  let path = ''
  const key = '__TO_DO_ITEMS__'
  const keyId = '__TO_DO_LAST_ID__'
  const storeItems = JSON.parse(localStorage.getItem(key) || '[]')
  const storeId = JSON.parse(localStorage.getItem(keyId) || '0')

  cache = JSON.parse(localStorage.getItem(keyItems) || '[]')

  setInterval(() => {
    // console.log(path)  
    if (listEvent) {
      listEvent = false
      path = location.pathname

      const result = cache.map(({id, label}) => html`
        <ion-item>
          <ion-label>${label}</ion-label>
          <ion-badge slot="end" color="danger" @click=${() => removeFromCache(id)}>${lang.remove}</ion-badge>
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

  document.querySelector('#input').value = ''

  localStorage.setItem(keyId, JSON.stringify(id))
  localStorage.setItem(keyItems, JSON.stringify(cache))

  alert(lang.createMessage, 'success')
}

function removeFromCache(id) {
  cache = cache.filter(v => v.id !== id)
  listEvent = true

  localStorage.setItem(keyItems, JSON.stringify(cache))

  alert(lang.removeMessage, 'danger')
}

export default function({items}) {
  let input = ''
  
  return html`
    <style>
      .list {
        max-width: 500px;
        width: 100vw;
      }

      .list-wrapper {
        display: flex;
        width: 100vw;
        height: calc(100vh - 64px);
        overflow-y: auto;
        justify-content: center;
      }
    </style>
    <div class="list-wrapper">
      <div class="list">
        <ion-item>
          <ion-label position="floating">${lang.new}</ion-label>
          <ion-input @change=${v => input = v.target.value} id="input"></ion-input>
        </ion-item>
        <ion-button expand="block" @click=${() => addFromCache(incrementToDoId(), input)}>${lang.add}</ion-button>

        <ion-list>
          ${listDirective({items})}
        </ion-list>
        <!-- <choco-clock></choco-clock> -->
      </div>
    </div>
  `;
}
