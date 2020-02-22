import { LitElement, html, customElement, property } from 'lit-element';
import * as moment from 'moment'

@customElement('choco-clock')
export default class Clock extends LitElement {
  @property({ type: String })
  date = this.getDate();

  constructor() {
    super()
    setInterval(() => this.date = this.getDate(), 1000)
  }

  getDate() {
    return moment().format('HH:mm:ss')
  }

  render() {
    return html`
      ${this.date}
    `
  }
}
