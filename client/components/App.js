import { createElement as h } from 'react';
import LoginForm from './LoginForm';
import { appStyles } from './styles';

const App = () => {
  const styles = appStyles();

  return h('div', { className: styles.main }, h(LoginForm));
};

export default App;
