import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom'
import './index.css';
import App from './calculator/index';
import His from './history/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/history' component={His}/>
        </Switch>
    </HashRouter>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
