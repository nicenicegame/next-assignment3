import { StyledPaginator } from './style'

type PaginatorProps = {
  onPagesChange: (page: number) => void
}

const Paginator = () => {
  return (
    <StyledPaginator>
      <button>Previous</button>
      <input type="text" />
      <button>Next</button>
    </StyledPaginator>
  )
}

export default Paginator
