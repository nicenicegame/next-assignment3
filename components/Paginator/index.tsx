import { PageSelector, StyledPaginator } from './style'

type PaginatorProps = {
  onPageChange: (page: number) => void
  currentPage: number
  maxPage: number
}

const Paginator = ({ currentPage, maxPage, onPageChange }: PaginatorProps) => {
  return (
    <StyledPaginator>
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.71005 9.87999L2.83005 5.99999L6.71005 2.11999C6.80263 2.02741 6.87607 1.9175 6.92617 1.79653C6.97628 1.67557 7.00207 1.54592 7.00207 1.41499C7.00207 1.28406 6.97628 1.15441 6.92617 1.03345C6.87607 0.912482 6.80263 0.802571 6.71005 0.70999C6.61747 0.617408 6.50755 0.543968 6.38659 0.493863C6.26563 0.443758 6.13598 0.417969 6.00505 0.417969C5.87412 0.417969 5.74447 0.443758 5.6235 0.493863C5.50254 0.543968 5.39263 0.617408 5.30005 0.70999L0.710047 5.29999C0.617343 5.3925 0.543796 5.50239 0.493614 5.62337C0.443433 5.74434 0.417603 5.87402 0.417603 6.00499C0.417603 6.13596 0.443433 6.26564 0.493614 6.38661C0.543796 6.50759 0.617343 6.61748 0.710047 6.70999L5.30005 11.3C5.69005 11.69 6.32005 11.69 6.71005 11.3C7.09005 10.91 7.10005 10.27 6.71005 9.87999Z"
            fill="black"
          />
        </svg>
        Previous
      </button>
      <PageSelector>
        <select
          value={currentPage}
          onChange={(e) => onPageChange(+e.target.value)}
        >
          {[...Array(maxPage)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <span>of {maxPage}</span>
      </PageSelector>
      <button
        disabled={currentPage >= maxPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.28995 9.87999L5.16995 5.99999L1.28995 2.11999C1.19736 2.02741 1.12392 1.9175 1.07382 1.79653C1.02371 1.67557 0.997925 1.54592 0.997925 1.41499C0.997925 1.28406 1.02371 1.15441 1.07382 1.03345C1.12392 0.912482 1.19736 0.802571 1.28995 0.70999C1.38253 0.617408 1.49244 0.543968 1.6134 0.493863C1.73437 0.443758 1.86401 0.417969 1.99495 0.417969C2.12588 0.417969 2.25552 0.443758 2.37649 0.493863C2.49745 0.543968 2.60736 0.617408 2.69995 0.70999L7.28995 5.29999C7.67995 5.68999 7.67995 6.31999 7.28995 6.70999L2.69995 11.3C2.60743 11.3927 2.49754 11.4662 2.37657 11.5164C2.2556 11.5666 2.12591 11.5924 1.99495 11.5924C1.86398 11.5924 1.73429 11.5666 1.61332 11.5164C1.49235 11.4662 1.38246 11.3927 1.28995 11.3C0.909946 10.91 0.899946 10.27 1.28995 9.87999Z"
            fill="black"
          />
        </svg>
      </button>
    </StyledPaginator>
  )
}

export default Paginator
