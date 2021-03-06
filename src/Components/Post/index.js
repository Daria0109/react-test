import React, {useEffect, useState} from 'react'
import {useHistory, useRouteMatch} from 'react-router'
import {sortableContainer, sortableElement} from 'react-sortable-hoc'

import {useQuery} from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import {POST, ROOT} from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles'
import postsQuery from "../../GraphQL/Queries/posts.graphql";

const SortableContainer = sortableContainer(({children}) => (
  <div>{children}</div>
))

const SortableItem = sortableElement(({value}) => (
  <PostComment mb={2}>{value}</PostComment>
))

const Post = React.memo(() => {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const {
    params: {postId},
  } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleSortEnd = ({oldIndex, newIndex}) => {
    setComments(arrayMove(comments, newIndex, oldIndex))
  }

  const {data: postsData, loading: postsQueryLoading} = useQuery(postsQuery)
  const totalPostsCount = postsData?.posts.meta.totalCount

  const {data: postData, loading: postQueryLoading} = useQuery(postQuery, {variables: {id: postId}})
  const post = postData?.post || {}

  /* fixed comments rendering */
  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments.data)
    }
  }, [post])

  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      {postQueryLoading && postsQueryLoading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>Need to add next/previous links</h4>
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user?.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>
              <button type='button'
                      disabled={postId === '1'}
                      onClick={() => history.push(POST(postId - 1))}>Prev</button>
              <button type='button'
                      disabled={postId === String(totalPostsCount)}
                      onClick={() => history.push(POST(Number(postId) + 1))}>Next</button>
            </div>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
            Comments:
            <SortableContainer onSortEnd={handleSortEnd}>
              {comments.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={comment.id}
                  mb={3}
                  value={comment.body}
                />
              ))}
            </SortableContainer>
          </Column>
        </>
      )}
    </Container>
  )
})

export default Post
