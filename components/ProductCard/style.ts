import styled from 'styled-components'

export const StyledProductCard = styled.div`
  cursor: pointer;
  width: 350px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ProductCardHeader = styled.div`
  padding: 1rem;
  width: 100%;

  .product-name {
    font-size: 20px;
    margin-bottom: 4px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .product-brand {
    font-size: 12px;
    color: rgba(190, 190, 190, 1);
  }
`

export const ProductCardImage = styled.div`
  position: relative;
  width: 90%;
  height: 180px;
`

export const ProductCardFooter = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    position: relative;
    font-size: 24px;
    color: #6bbbff;
  }

  .discount {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    text-decoration: line-through;
    color: #fe6969;
    font-size: 12px;
  }
`
