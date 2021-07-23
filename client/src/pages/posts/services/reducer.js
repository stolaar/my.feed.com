import {
    SET_CATEGORY_POSTS,
    SET_CATEGORY_POSTS_FETCHED, SET_SEARCH_RESULTS,
} from "../../../config/actionTypes";

const initialState = {
    posts: [],
    count: 0,
    isCategoryPostsFetch: false,
    searchResults: [],
    searchResultsCount: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY_POSTS:
            return {...state, posts: action.payload?.rows || [], postsCount: action.payload?.count || 0}
        case SET_CATEGORY_POSTS_FETCHED:
            return {...state, isCategoryPostsFetch: action.payload}
        case SET_SEARCH_RESULTS:
            return {...state, searchResults:action.payload?.rows || [], searchResultsCount: action.payload?.count || 0}
        default:
            return state
    }
}


export default reducer
