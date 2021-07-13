import {setErrors} from "../../../services/errors/actions";
import axios from "axios";
import {get_posts_api} from "../../../config/endpoints";
import {SET_POSTS} from "../../../config/actionTypes";

export const getPosts = () => async dispatch => {
    try {
        const {data} = await axios.get(get_posts_api.path)
        dispatch(setPosts(transformPosts(data)))
    } catch (err) {
        dispatch(setErrors(err))
    }
}

export const setPosts = payload => ({type: SET_POSTS, payload})


// TODO: REMOVE THIS WHEN IMPLEMENT CATEGORIES
const transformPosts = posts => {
    return posts.reduce((acc, curr) => acc.concat(curr.posts), [])
}
