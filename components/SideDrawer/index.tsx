import { ReactNode } from 'react'
import { Backdrop, Drawer } from './style'

type FilterSortOptionsProps = {
  id: string
  children: ReactNode
  isOpen: boolean
  onCloseSideDrawer: () => void
}

const SideDrawer = ({
  id,
  children,
  isOpen,
  onCloseSideDrawer
}: FilterSortOptionsProps) => {
  return (
    <>
      <Backdrop isActive={isOpen} onClick={onCloseSideDrawer} />
      <Drawer isActive={isOpen}>
        <div className="drawer-content" id={id}>
          {children}
        </div>
      </Drawer>
    </>
  )
}

export default SideDrawer
