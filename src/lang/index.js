import en from './en'
import es from './es'

var locale = window.navigator.language;
const code = locale.substr(0,2);

export default (
  code === 'es' ?
    es :
    en
);