import React, {useEffect, useRef, useState} from 'react'
import MainContainer from '../../containers/layout/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/feed/post/Post'
import { makeStyles } from '@material-ui/core'
import {useHistory, useLocation, useParams} from 'react-router'
import PageHelmet from '../../components/seo/PageHelmet'
import {searchPosts} from './services/actions'
import parseQueryString from '../../utils/parseQueryString'
import Pagination from '../../components/pagination/Pagination'
import buildQueryString from "../../utils/buildQueryString";

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

function SearchPage() {
  const dispatch = useDispatch()
  const { searchResults, searchResultsCount } = useSelector(state => state.posts)

  const classes = useStyles()
  const { category } = useParams()
  const { search: locationSearch } = useLocation()
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const containerRef = useRef()

    useEffect(() => {
        const {page = 1, search: searchString = ''} = parseQueryString(locationSearch)
        setPage(+page)
        setSearch(searchString)
    }, [locationSearch])


    useEffect(() => {
        containerRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, [searchResults, containerRef])

   const onPaginationChange = (e, value) => {
     const queryString = buildQueryString({page: value, search})
     history.push({search: queryString})
   }

   useEffect(() => {
       dispatch(searchPosts({page, search}))
   }, [dispatch, page, search])

  return (
    <MainContainer containerRef={containerRef}>
      <PageHelmet title={category} />
      <div className={classes.posts}>
        {searchResults.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination page={page} count={searchResultsCount} onChange={onPaginationChange} />
      </div>
    </MainContainer>
  )
}

export default SearchPage
