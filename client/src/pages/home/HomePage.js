import React, {useEffect} from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "./services/actions";
import Post from "../../components/feed/post/Post";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    posts: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
})

function HomePage() {
    const dispatch = useDispatch()
    const {posts} = useSelector(state => state.feed)
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return <MainContainer>
        <div className={classes.posts}>
            {posts.map(post => <Post key={post.title} {...post}/>)}
        </div>
    </MainContainer>
}

export default HomePage
