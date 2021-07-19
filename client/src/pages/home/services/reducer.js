import {SET_CATEGORIES, SET_CATEGORIES_FETCH, SET_POSTS} from "../../../config/actionTypes";

const initialState = {
    posts: [],
    categories: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {...state, posts: action.payload}
        case SET_CATEGORIES:
            return {...state, categories: action.payload}
        case SET_CATEGORIES_FETCH:
            return {...state, isCategoriesFetch: action.payload}
        default:
            return state
    }
}


export default reducer
