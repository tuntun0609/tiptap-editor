import { cn } from '@/lib/utils'
import { forwardRef, HTMLProps } from 'react'

export type DividerProps = {
  horizontal?: boolean
} & HTMLProps<HTMLDivElement>

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
      'bg-neutral-200 dark:bg-neutral-800',
      horizontal
        ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
        : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
      className
    )

    return <div className={dividerClassName} ref={ref} {...rest} />
  }
)

Divider.displayName = 'Divider'
