import { createElement as h } from 'react';

import {
  BrowserRouter,
  Link,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { AppBar } from '@material-ui/core';

import Register from './Register';
import Login from './Login';

import { appStyles } from './styles';

const App = () => {
	const styles = appStyles();

	return h(BrowserRouter, null, 
		 h('div', { className: styles.main }, 
			 h(AppBar, { className: styles.appBar }),
			 h(Switch, null, 
				h(Route, { path: '/register'},
					h(Register), 
				),
				h(Route, { path: '/login'},
					h(Login), 
				),
			 )
		 ),
	)
};

export default App;
