import * as ReadableAPI from "../utils/api";

export const GET_CATEGORIES = "GET_CATEGORIES";



export const fetchCategories = () => dispatch =>
ReadableAPI.getCategories().then(data => dispatch(getCategories(data)));

export const getCategories = categories => ({
type: GET_CATEGORIES,
categories
});