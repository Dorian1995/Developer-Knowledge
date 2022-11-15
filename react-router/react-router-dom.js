import React from 'react';

const Register = (props) => {
    return <div>This is register page</div>
};

export default Register;

import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);



