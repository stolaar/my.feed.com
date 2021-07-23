import React, {useEffect, useRef, useState} from 'react'
import MainContainer from '../../containers/layout/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/feed/post/Post'
import { makeStyles } from '@material-ui/core'
import {useHistory, useLocation, useParams} from 'react-router'
import PageHelmet from '../../components/seo/PageHelmet'
import { setActiveTab } from '../../services/navigation/actions'
import { getCategoryPosts } from './services/actions'
import { getCategories } from '../home/services/actions'
import parseQueryString from '../../utils/parseQueryString'
import Pagination from '../../components/pagination/Pagination'
import buildQueryString from "../../utils/buildQueryString";
import {categoryPageRoute} from "../../config/routes";

const useStyles = makeStyles({
  posts: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '20px'
    }
})

function PostsPage() {
  const dispatch = useDispatch()
  const { isCategoriesFetch } = useSelector(state => state.feed)
  const { posts, postsCount } = useSelector(state => state.posts)
  const {
    activeTab: { value: activeTab }
  } = useSelector(state => state.navigation)
  const classes = useStyles()
  const { category } = useParams()
  const { search } = useLocation()
  const history = useHistory()
  const [page, setPage] = useState(1)
  const containerRef = useRef()

  useEffect(() => {
    dispatch(getCategoryPosts({ query: { page }, category }))

    if (category !== activeTab) {
      dispatch(setActiveTab(category))
    }
  }, [category, dispatch, activeTab, page])

  useEffect(() => {
    if (!isCategoriesFetch) {
      dispatch(getCategories())
    }
  }, [dispatch, isCategoriesFetch])

    useEffect(() => {
        const {page = 1} = parseQueryString(search)
        setPage(+page)
    }, [search])


    useEffect(() => {
        containerRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, [posts, containerRef])

   const onPaginationChange = (e, value) => {
     const queryString = buildQueryString({page: value})
     history.push({search: queryString})
   }

  return (
    <MainContainer containerRef={containerRef}>
      <PageHelmet title={category} />
      <div className={classes.posts}>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination page={page} count={postsCount} onChange={onPaginationChange} />
      </div>
    </MainContainer>
  )
}

export default PostsPage
