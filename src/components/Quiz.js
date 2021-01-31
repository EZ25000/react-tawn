import React from 'react';
import PropTypes from 'prop-types';
import { MarkAnswerArea, OpenAnswerArea, SingleChoiceAnswerArea } from "./AnswerAreas";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Panel, ListGroup, ListGroupItem } from 'bootstrap';

function Quiz(props) {
    const {quizQuestions, questionData, userAnswer, questionsGroupText, onAnswerSelected} = props;

    function renderAnswerArea() {
        switch (questionData.QuizQuestionTypeId) {
            case 2:
                return <SingleChoiceAnswerArea
                    possibleAnswers={questionData.PossibleAnswers}
                    answer={userAnswer}
                    onAnswerSelected={onAnswerSelected}
                />;
            case 5:
                return <OpenAnswerArea
                    questionId={questionData.Id}
                    answer={userAnswer}
                    onAnswerSelected={onAnswerSelected}
                />;
            case 6:
                return <MarkAnswerArea
                    possibleMarks={questionData.MarkFrame[0]}
                    answer={userAnswer}
                    onAnswerSelected={onAnswerSelected}
                />;
            default:
                return false;
        }
    }

    return (
        <CSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionLeave
            transitionEnter
            transitionAppearTimeout={500}
        >
                {questionsGroupText &&
                <div className="question-group-text">
                    {questionsGroupText}
                </div>}
                <hr/>
                <h3 className="centre-aligned">{questionData.QuestionText}</h3>
                <hr/>
                {questionData.QuizQuestionTypeId === 1
                    ?
                    <ListGroup>
                        {quizQuestions.map((q) => {
                            if (q.GroupId === questionData.Id && q.QuizQuestionTypeId === 6) {
                                return <ListGroupItem key={q.Id}>{q.QuestionText}</ListGroupItem>;
                            }
                            return false;
                        })}
                    </ListGroup>
                    :
                    <Panel>
                        <Panel.Heading>Укажите пожалуйста ваш ответ:</Panel.Heading>
                        <Panel.Body>{renderAnswerArea()}</Panel.Body>
                    </Panel>
                }
        </CSSTransitionGroup>
    );
}

Quiz.propTypes = {
    quizQuestions: PropTypes.array.isRequired,
    questionData: PropTypes.object.isRequired,
    questionsGroupText: PropTypes.string.isRequired,
    userAnswer: PropTypes.string,
    onAnswerSelected: PropTypes.func.isRequired,
};

export default Quiz;
