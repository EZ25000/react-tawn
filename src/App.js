import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import CentredContainer from "./components/CentredContainer";
import Quiz from './components/Quiz';
import QuizNavigation from './components/QuizNavigation';
import { ProgressBar } from 'react-bootstrap';

import {
    setQuizStatus, setHeaderText, setCurrentQuestionNumber,
    saveAnswer, setQuizData
} from './actions/quiz';

import { fetchDataFromApi } from './actions/apiData';


class App extends Component {
    componentDidMount() {
        this.props.setQuizStatus('started');
        this.props.fetchDataFromApi('https://gtiw.gtinvest.com:44300/api/QuizPassings/GetById?passingId=D4FCA825-9E5C-400E-B653-E37581262524');
    }

    renderQuiz() {
        if (this.props.dataHasErrored) {
            return <CentredContainer heading="При загрузке произошла ошибка"/>;
        }

        if (this.props.dataIsLoading) {
            return <CentredContainer heading="Загрузка...">
                <ProgressBar active now={100}/>
            </CentredContainer>;
        }

        if (!this.props.quizData || this.props.quizData.Quiz.Questions.length === 0) {
            return <CentredContainer heading="Нет данных"/>;
        }

        const questions = this.props.quizData.Quiz.Questions;
        const currentQuestionData = questions[this.props.currentQuestionNumber - 1];
        const questionsGroupText = (currentQuestionData.GroupId && currentQuestionData.QuizQuestionTypeId !== 5)
            ? questions.find((q) => {
                return q.Id === currentQuestionData.GroupId
            }).QuestionText
            : ' ';
        const currentQuestionUserAnswer = this.props.quizData.Answers.find((q) => {
            return q.id === currentQuestionData.Id
        });

        return (
            <div>
                <Quiz
                    quizQuestions={questions}
                    questionData={currentQuestionData}
                    userAnswer={currentQuestionUserAnswer && currentQuestionUserAnswer.value}
                    questionsGroupText={questionsGroupText}
                    onAnswerSelected={this.props.saveAnswer}
                />
                <QuizNavigation
                    prevDisabled={!!(currentQuestionData.Number - 1 === 0 || (currentQuestionData.GroupId && currentQuestionData.Number - 2 === 0))}
                    nextDisabled={currentQuestionData.Number === questions.length}
                    prevClickHandler={this.prevQuestion.bind(this)}
                    finishClickHandler={this.finishQuiz.bind(this)}
                    nextClickHandler={this.nextQuestion.bind(this)}
                />
            </div>
        );
    }

    finishQuiz() {
        this.props.setQuizStatus('finished');
        this.props.setHeaderText('Опрос завершен');
    }

    nextQuestion() {
        let currentQuestionNumber = this.props.currentQuestionNumber;
        this.props.setCurrentQuestionNumber(++currentQuestionNumber);
    }

    prevQuestion() {
        let currentQuestionNumber = this.props.currentQuestionNumber;

        if (this.props.quizData.Quiz.Questions[currentQuestionNumber - 2].QuizQuestionTypeId === 1) {
            currentQuestionNumber--;
        }

        this.props.setCurrentQuestionNumber(--currentQuestionNumber);
    }

    render() {
        return (
            <div className="App">
                <AppHeader headerText={this.props.quizHeading}/>

                {(this.props.quizStatus === 'started' || this.props.quizStatus === 'errored') &&
                this.renderQuiz()}

                {this.props.quizStatus === 'finished' &&
                <CentredContainer>
                    <h1>Благодарим за участие в опросе</h1>
                    <p>Ваши ответы будут отправленны на обработку</p>
                    <ProgressBar active now={100}/>
                </CentredContainer>}
            </div>
        );
    }
}

App.propTypes = {
    setQuizStatus: PropTypes.func.isRequired,
    setQuizData: PropTypes.func.isRequired,
    setHeaderText: PropTypes.func.isRequired,
    setCurrentQuestionNumber: PropTypes.func.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    fetchDataFromApi: PropTypes.func.isRequired,

    quizStatus: PropTypes.string.isRequired,
    quizHeading: PropTypes.string.isRequired,
    currentQuestionNumber: PropTypes.number,
    quizData: PropTypes.object,

    dataHasErrored: PropTypes.bool.isRequired,
    dataIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        quizStatus: state.quiz.status,
        quizHeading: state.quiz.heading,
        currentQuestionNumber: state.quiz.currentQuestionNumber,
        quizData: state.quiz.quizData,

        dataHasErrored: state.apiDataHasErrored,
        dataIsLoading: state.apiDataIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setQuizStatus,
        setQuizData,
        setHeaderText,
        setCurrentQuestionNumber,
        saveAnswer,
        fetchDataFromApi
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
