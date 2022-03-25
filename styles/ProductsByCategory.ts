import styled from 'styled-components'

export const StyledProductsByCategory = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BreadcrumbNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Nav = styled.div`
  display: flex;
  gap: 10px;

  h4 {
    font-weight: normal;
  }

  h4.active {
    font-weight: bold;
  }
`

export const ProductsGrid = styled.div`
  width: 100%;
  margin-top: 2.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 30px;
`

export const OptionsButton = styled.button`
  cursor: pointer;
  font-weight: bold;
  padding: 12px 24px;
  background-color: transparent;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h4 {
    font-size: 24px;
    font-weight: 700;
  }
`

export const CardActions = styled.div`
  span {
    text-decoration: underline;
    font-size: 16px;
    color: #bebebe;
  }
`

export const ConfirmButton = styled.button`
  display: block;
  padding: 12px;
  border: none;
  background: #bebebe;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 700;
`
