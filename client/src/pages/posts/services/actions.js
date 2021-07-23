import {setErrors} from "../../../services/errors/actions";
import axios from "axios";
import {SET_CATEGORY_POSTS, SET_CATEGORY_POSTS_FETCHED, SET_SEARCH_RESULTS} from "../../../config/actionTypes";
import buildQueryString from "../../../utils/buildQueryString";

export const getCategoryPosts = ({query = {page: 1}, category}) => async dispatch => {
    try {
        const queryString = buildQueryString(query)
        const {data: {count, rows}} = await axios.get(`/api/feed/${category}${queryString}`)

        dispatch(setCategoryPosts({count, rows}))
    } catch (err) {
        dispatch(setErrors(err))
    } finally {
        dispatch(setCategoryPostsFetched(true))
    }
}

export const searchPosts = (query = {page: 1, search: ''}) => async dispatch => {
    try {
        const queryString = buildQueryString(query)
        const {data: {count, rows}} = await axios.get(`/api/feed/search${queryString}`)

        dispatch(setSearchResults({count, rows}))
    } catch (err) {
        dispatch(setErrors(err))
    } finally {
        dispatch(setCategoryPostsFetched(true))
    }
}

export const setCategoryPosts = payload => ({type: SET_CATEGORY_POSTS, payload})
export const setSearchResults = payload => ({type: SET_SEARCH_RESULTS, payload})
export const setCategoryPostsFetched = payload => ({type: SET_CATEGORY_POSTS_FETCHED, payload})
