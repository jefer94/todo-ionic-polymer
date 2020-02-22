import { render } from 'lit-html'
import app from './templates/app'
import menu from './templates/menu'
import { addRoute } from './templates/router'
import list, { addToDoItem, incrementToDoId } from './templates/todo-list'
// import './components/clock'

const List = list({items: []})

// const listDirective = directive(({items}) => (part) => {
//   let path = ''
//   cache = items
//   setInterval(() => {
//     // console.log(path)  
//     if (listEvent) {
//       listEvent = false
//       path = location.pathname

//       const result = cache.map(({id, label}) => html`
//         <ion-item>
//           <ion-label>${label}</ion-label>
//           <ion-badge slot="end" color="danger" @click=${() => removeFromCache(id)}>Eliminar</ion-badge>
//         </ion-item>
//       `)

//       part.setValue(result)
//       part.commit()
//     }
//   }, 1)
// });

const Menu = menu({
  color: 'tertiary',
  title: 'Lista',
  routes: [
    addRoute('/', 'Lista', List)
  ]
})
const App = app({children: Menu})

render(App, document.body)