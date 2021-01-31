import * as c from './constants';

export function setQuizStatus(status) {
    return {
        type: c.SET_QUIZ_STATUS,
        status
    };
}

export function saveAnswer(answer) {
    return {
        type: c.SAVE_ANSWER,
        answer
    };
}

export function setCurrentQuestionNumber(number) {
    return {
        type: c.SET_CURRENT_QUESTION_NUMBER,
        number
    };
}

export function setHeaderText(text) {
    return {
        type: c.SET_HEADING,
        text
    };
}

export function setQuizData(data) {
    return {
        type: c.SET_QUIZ_DATA,
        data
    };
}