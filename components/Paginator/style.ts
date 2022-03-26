import styled from 'styled-components'

export const StyledPaginator = styled.div`
  display: flex;
  gap: 20px;

  button {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: transparent;
    border: none;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;

    :disabled {
      color: #bebebe;

      svg path {
        fill: #bebebe;
      }
    }
  }
`

export const PageSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  select {
    padding: 12px;
    border-radius: 8px;
  }
`
