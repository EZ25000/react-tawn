const getNewState = (state) => JSON.parse(JSON.stringify(state));

const initialState = {
    status: 'not_started',
    heading: 'Добро пожаловать!',
    currentQuestionNumber: null,
    quizData: null
};

export default function quiz(state = initialState, action) {
    let newState;

    switch (action.type) {
        case 'SET_QUIZ_STATUS':
            newState = getNewState(state);
            newState.status = action.status;
            return newState;

        case 'SET_CURRENT_QUESTION_NUMBER':
            newState = getNewState(state);
            newState.currentQuestionNumber = action.number;
            return newState;

        case 'SET_QUIZ_DATA':
            newState = getNewState(state);
            newState.quizData = action.data;
            return newState;

        case 'SAVE_ANSWER':
            newState = getNewState(state);
            const alreadyExist = newState.quizData.Answers.find((i) => i.id === action.answer.id);
            if(alreadyExist){
                newState.quizData.Answers[newState.quizData.Answers.indexOf(alreadyExist)] = action.answer;
            }else {
                newState.quizData.Answers.push(action.answer);
            }
            return newState;

        case 'SET_HEADING':
            newState = getNewState(state);
            newState.heading = action.text;
            return newState;

        default:
            return state;
    }
}