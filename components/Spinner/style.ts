import styled from 'styled-components'

export const StyledSpinner = styled.div`
  width: 160px;
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  overflow: hidden;

  button {
    padding: 12px;
    border: none;
    background-color: white;
    font-size: 20px;
    cursor: pointer;
  }

  span {
    flex: 1;
    text-align: center;
  }
`
