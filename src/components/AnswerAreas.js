import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, FormGroup,
         FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { Radio } from 'bootstrap';
export function MarkAnswerArea(props) {
    const {answer, possibleMarks, onAnswerSelected} = props;
    let options = [];

    for (let i = possibleMarks.UpperValue; i >= possibleMarks.LowerValue; i--){
        options.push(<Button
                active={+answer === i}
                bsStyle="primary"
                href="#"
                key={possibleMarks.Id+i}
                value={i}
                onClick={() => {onAnswerSelected({id: possibleMarks.QuizQuestionId, value: String(i)})}}
            >
            {i}
            </Button>
        )
    }

    return <ButtonGroup justified>{options}</ButtonGroup>;
}

export function OpenAnswerArea(props) {
    const {answer, onAnswerSelected, questionId} = props;
    return (
        <FormGroup controlId="formControlsTextarea">
            <FormControl
                componentClass="textarea"
                placeholder="Ваш ответ"
                value={answer}
                onChange={(e) => {onAnswerSelected({id: questionId, value: e.target.value})}}
            />
        </FormGroup>
    )
}

export function SingleChoiceAnswerArea(props) {
    const {answer, possibleAnswers, onAnswerSelected} = props;
    return (
        <ListGroup>
            {possibleAnswers.map((option) =>
                <ListGroupItem
                    key={option.Id}
                    onClick={() => {onAnswerSelected({id: option.QuizQuestionId, value: option.AnswerText})}}
                    active={answer === option.AnswerText}
                >
                    <Radio
                        name={`radioGroup${option.QuizQuestionId}`}
                        checked={answer === option.AnswerText && 'checked'}
                        inline>{option.AnswerText}</Radio
                    >
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

MarkAnswerArea.propTypes = {
    answer: PropTypes.string,
    possibleMarks: PropTypes.object.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

OpenAnswerArea.propTypes = {
    answer: PropTypes.string,
    questionId: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

SingleChoiceAnswerArea.propTypes = {
    answer: PropTypes.string,
    possibleAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};