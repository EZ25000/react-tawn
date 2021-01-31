import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'bootstrap';

function QuizNavigation(props) {
  return (
      <ButtonToolbar bsClass="btn-toolbar flex-centered">
          <ButtonGroup bsSize="md">
              <Button
                  bsStyle="primary"
                  type="button"
                  disabled={props.prevDisabled}
                  onClick={props.prevClickHandler}
              >
                  <Glyphicon glyph="menu-left"/>
                  &nbsp; Назад
              </Button>
              <Button
                  bsStyle="primary"
                  type="button"
                  onClick={props.finishClickHandler}
              >
                  Завершить
              </Button>
              <Button
                  bsStyle="primary"
                  type="button"
                  disabled={props.nextDisabled}
                  onClick={props.nextClickHandler}
              >
                  Далее &nbsp;
                  <Glyphicon glyph="menu-right"/>
              </Button>
          </ButtonGroup>
      </ButtonToolbar>
  );
}



QuizNavigation.propTypes = {
  prevDisabled: PropTypes.bool.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  prevClickHandler: PropTypes.func.isRequired,
  finishClickHandler: PropTypes.func.isRequired,
  nextClickHandler: PropTypes.func.isRequired
};

export default QuizNavigation;
