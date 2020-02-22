import { html, directive } from 'lit-html'

const routerDirective = directive(({routes}) => (part) => {
  let path = ''
  setInterval(() => {
    // console.log(path)  
    if (location.pathname !== path) {
      path = location.pathname

      const result = routes.filter(({url}) => url === path).map(({component}) => component)

      part.setValue(result)
      part.commit()
    }
  }, 0)
});

export function addRoute(url, label, component) {
  return {url, label, component}
}

export function loadUrl(url, title, data = {}) {
  history.pushState(data, title, url)
}
export default function({routes}) { 
  return html`
    ${routerDirective({routes})}
  `;
}