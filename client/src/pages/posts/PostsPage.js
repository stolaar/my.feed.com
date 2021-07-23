import React, {useEffect} from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import Post from "../../components/feed/post/Post";
import {makeStyles} from "@material-ui/core";
import {useParams} from "react-router";
import {getCategories, setPosts} from "../home/services/actions";
import PageHelmet from "../../components/seo/PageHelmet";

const useStyles = makeStyles({
    posts: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
})

function PostsPage() {
    const dispatch = useDispatch()
    const { posts, categories, isCategoriesFetch } = useSelector(state => state.feed)
    const classes = useStyles()
    const {category} = useParams()

    useEffect(() => {
        if(!isCategoriesFetch) {
            dispatch(getCategories())
        } else {
            const posts = categories.find(value => value.label === category)?.posts || []
            dispatch(setPosts(posts))
        }
    }, [category, categories, isCategoriesFetch, dispatch])

    return (
        <MainContainer>
            <PageHelmet title={category} />
            <div className={classes.posts}>
                {posts.map(post => (
                    <Post key={post.title} {...post} />
                ))}
            </div>
        </MainContainer>
    )
}

export default PostsPage
