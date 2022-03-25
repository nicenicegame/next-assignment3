import { ReactNode } from 'react'
import { Backdrop, Drawer } from './style'

type FilterSortOptionsProps = {
  children: ReactNode
  isOpen: boolean
  onCloseSideDrawer: () => void
}

const SideDrawer = ({
  children,
  isOpen,
  onCloseSideDrawer
}: FilterSortOptionsProps) => {
  return (
    <>
      <Backdrop isActive={isOpen} onClick={onCloseSideDrawer} />
      <Drawer isActive={isOpen}>
        <div className="drawer-content">{children}</div>
      </Drawer>
    </>
  )
}

export default SideDrawer
