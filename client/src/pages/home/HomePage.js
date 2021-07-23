import React, {useEffect} from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "./services/actions";
import {makeStyles} from "@material-ui/core";
import Category from "../../components/feed/category/Category";
import PageHelmet from "../../components/seo/PageHelmet";

const useStyles = makeStyles({
    posts: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
})

function HomePage() {
  const dispatch = useDispatch()
  const { categories, isCategoriesFetch } = useSelector(state => state.feed)
  const classes = useStyles()

  useEffect(() => {
   if(!isCategoriesFetch) dispatch(getCategories())
  }, [dispatch, isCategoriesFetch])

  return (
    <MainContainer>
        <PageHelmet title={'My feed'} />
      <div className={classes.posts}>
        {categories.map(post => (
          <Category key={post.title} {...post} />
        ))}
      </div>
    </MainContainer>
  )
}

export default HomePage
