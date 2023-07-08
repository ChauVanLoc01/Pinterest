import {
  FloatingPortal,
  shift,
  useClick,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { ReactNode, useState } from 'react'

type PopoverProps = {
  lable: ReactNode | string
  lableClassName: string
  subNode: ReactNode
  subNodeClassName: string
}

function Popover({
  lable,
  lableClassName,
  subNode,
  subNodeClassName
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [shift()]
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <>
      <button
        className={lableClassName}
        onClick={() => setIsOpen(!isOpen)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {lable}
      </button>
      {isOpen && (
        <FloatingPortal>
          <div
            className={`text-xs text-character lg:text-sm xl:text-base ${subNodeClassName}`}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {subNode}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export default Popover
