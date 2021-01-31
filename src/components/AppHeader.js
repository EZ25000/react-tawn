import React from 'react';
import PropTypes from 'prop-types';
import logo from '../svg/logo.svg';
import '../AppHeader.css';

function AppHeader(props) {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h3 className="App-header-text">{props.headerText}</h3>
        </div>
    );
}

AppHeader.propTypes = {
    headerText: PropTypes.string.isRequired,
};

export default AppHeader;