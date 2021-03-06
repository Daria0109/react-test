import styled from "styled-components";

export const PagesControl = styled.button`
  width: 35px;
  height: 35px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid darkgray;
  cursor: pointer;
  background-color: #fff;
  font-size: 22px;
`
export const PaginatorBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;
`
export const PagePicker = styled.button`
  width: 25px;
  height: 25px;
  margin-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid darkgray;
  cursor: pointer;
  background-color: ${props => props.localCurrentPage === props.propsCurrentPage
    ? 'grey'
    : 'white'};
`
