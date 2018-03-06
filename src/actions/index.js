import * as ReadableAPI from '../utils/api'

export const GET_CATEGORIES = 'GET_CATEGORIES';


export const fetchCategories = () => dispatch => (
    ReadableAPI
        .getCategories()
        .then(categories => dispatch(getCategories(categories)))
);

export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});



