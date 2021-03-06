import styled from "styled-components";

export const PageSizeBlock = styled.div`
  display: flex;
  margin-top: 7px;
`
export const PageSizePicker = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid darkgray;
  cursor: pointer;
  background-color: ${props => props.localPostsLimit === props.propsPostsLimit
    ? 'grey'
    : 'white'};
`
