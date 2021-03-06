import React, {useState, useRef} from 'react'
import {NavLink} from 'react-router-dom'

import {useQuery} from '@apollo/client'
import faker from 'faker'
import {nanoid} from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import {POST} from 'Router/routes'

import {Column, Container, Post, PostAuthor, PostBody} from './styles'

import ExpensiveTree from '../ExpensiveTree'
import Paginator from "../Paginator";
import PageSizeSelector from "../PageSizeSelector";

function Root() {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsLimit, setPostsLimit] = useState(5)
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')
  const {data, loading} = useQuery(postsQuery, {
    variables: {
      page: currentPage,
      limit: postsLimit
    }
  })

  const countRef = useRef(count);
  countRef.current = count;

  function handlePush() {
    setFields([...fields, {name: faker.name.findName(), id: nanoid()}])
  }
  /* Closure bug fixed with useRef */
  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 2500)
  }

  const posts = data?.posts.data || []
  const totalPostsCount = data?.posts.meta.totalCount || 0

  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
            /* Key in the map method */
            <Post mx={4}
                  key={post.id}>
              <NavLink href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}

        <PageSizeSelector postsLimit={postsLimit} setPostsLimit={setPostsLimit}/>
        <Paginator currentPage={currentPage}
                   postsLimit={postsLimit}
                   setCurrentPage={setCurrentPage}
                   totalPostsCount={totalPostsCount}/>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br/>
          <input
            value={value}
            onChange={({target}) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree/>

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type='button' onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button type='button' onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type='button' onClick={handlePush}>
          Add more
        </button>
        <ol>
          {fields.map((field, index) => (
            <li key={index}>
              {field.name}:<br/>
              <input type="text"/>
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root;

