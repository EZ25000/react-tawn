import * as c from './constants';
import {setCurrentQuestionNumber, setHeaderText, setQuizData, setQuizStatus} from "./quiz";

export function apiDataHasErrored(bool) {
    return {
        type: c.API_DATA_HAS_ERRORED,
        dataHasErrored: bool
    };
}

export function apiDataIsLoading(bool) {
    return {
        type: c.API_DATA_IS_LOADING,
        dataIsLoading: bool
    };
}

export function fetchDataFromApi(url) {
    return (dispatch) => {
        dispatch(apiDataIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(apiDataIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setCurrentQuestionNumber(data.Quiz.Questions[0].Number));
                dispatch(setQuizData(data));
                dispatch(setHeaderText(data.Quiz.Name))})
            .catch(() => {
                dispatch(apiDataHasErrored(true));
                dispatch(apiDataIsLoading(false));
                dispatch(setQuizStatus('errored'));
            });
    };
}