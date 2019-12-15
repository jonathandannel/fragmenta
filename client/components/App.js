import { createElement as h } from 'react';
import Register from './Register';
import Login from './Login';
import { appStyles } from './styles';

const App = () => {
	const styles = appStyles();

	return h('div', { className: styles.main }, h(Register), h(Login));
};

export default App;
