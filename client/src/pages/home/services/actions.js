import {setErrors} from "../../../services/errors/actions";
import axios from "axios";
import {get_posts_api} from "../../../config/endpoints";
import {SET_CATEGORIES, SET_CATEGORIES_FETCH, SET_POSTS} from "../../../config/actionTypes";
import {setTabs} from "../../../services/navigation/actions";

export const getCategories = () => async dispatch => {
    try {
        const {data} = await axios.get(get_posts_api.path)
        dispatch(setCategories(data))
        dispatch(setTabs(data))
    } catch (err) {
        dispatch(setErrors(err))
    } finally {
        dispatch(setCategoriesFetch(true))
    }
}

export const setPosts = payload => ({type: SET_POSTS, payload})
export const setCategoriesFetch = payload => ({type: SET_CATEGORIES_FETCH, payload})
export const setCategoryPostsFetch = payload => ({type: SET_CATEGORIES_FETCH, payload})
export const setCategories = payload => ({type: SET_CATEGORIES, payload})
