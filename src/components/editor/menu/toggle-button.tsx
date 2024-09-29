import { Toggle } from '@/components/ui/toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ToggleProps } from '@radix-ui/react-toggle'
import { forwardRef, memo, ReactNode } from 'react'

export const ToggleButton = forwardRef<
  HTMLButtonElement,
  ToggleProps & {
    tooltip?: ReactNode
  }
>(({ children, tooltip, ...props }, ref) => {
  const content = (
    <Toggle ref={ref} {...props} className={cn('w-8 h-8 p-0', props.className)}>
      {children}
    </Toggle>
  )

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{content}</div>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>{tooltip}</TooltipContent>
      </Tooltip>
    )
  }

  return content
})

ToggleButton.displayName = 'ToggleButton'

export const MemoToggleButton = memo(ToggleButton)
