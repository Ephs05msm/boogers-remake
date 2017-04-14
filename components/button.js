import styled from 'styled-components'

export default styled.button`
  background: red;
  color: white;
  padding: 5px;
  border-radius: 3px;
  border: 2px solid red;
  font: 16px Futura, sans-serif;

  &:hover {
    background: blue;
    border: 2px solid blue;
  }
`