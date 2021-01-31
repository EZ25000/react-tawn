import { combineReducers } from 'redux';
import { apiDataIsLoading, apiDataHasErrored } from './apiData';
import quiz from './quiz';

export default combineReducers({
    apiDataIsLoading,
    apiDataHasErrored,
    quiz
});