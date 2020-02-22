import { render } from 'lit-html'
import app from './templates/app'
import menu from './templates/menu'
import { addRoute } from './templates/router'
import list, { addToDoItem, incrementToDoId } from './templates/to-do-list'
// import './components/clock'

const List = list({items: [
  addToDoItem(incrementToDoId(), 'aaaa'),
  addToDoItem(incrementToDoId(), 'aaaa')
]})

const Menu = menu({
  color: 'tertiary',
  title: 'Lista',
  routes: [
    addRoute('/', 'Lista', List)
  ]
})
const App = app({children: Menu})

render(App, document.body)