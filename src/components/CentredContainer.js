import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function CentredContainer(props) {

    return (
        <CSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div className="centre-aligned">
                <h3>{props.heading}</h3>
                {props.children}
            </div>
        </CSSTransitionGroup>
    );

}

CentredContainer.propTypes = {
    heading: PropTypes.string
};

export default CentredContainer;