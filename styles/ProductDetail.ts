import styled from 'styled-components'

export const StyledProductDetail = styled.div`
  padding: 2rem 0;
`

export const ProductDetailCard = styled.div`
  display: flex;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`

export const ProductImage = styled.div`
  position: relative;
  flex: 1;
  min-height: 650px;
`

export const ProductOptions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem 2.5rem;
`

export const ProductDescriptionCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15);

  h4 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
  }

  p {
    line-height: 32px;
  }
`

export const TopProductOptions = styled.div`
  flex: 1;

  .product-name {
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 700;
  }

  .muted-text {
    font-size: 16px;
    color: #bebebe;
    font-weight: 300;
    margin-bottom: 10px;
  }

  .product-price {
    font-size: 24px;
  }

  .product-discount {
    font-size: 12px;
    text-decoration: line-through;
    color: #fe6969;
  }

  .product-size {
    margin-top: 20px;
  }
`

export const BottomProductOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const AddToCartButton = styled.button`
  text-transform: uppercase;
  height: 64px;
  max-width: 400px;
  width: 100%;
  border-radius: 80px;
  background-color: #6bbbff;
  font-size: 20px;
  font-weight: 700;
  color: white;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`
