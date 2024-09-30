import { Icon } from './icon'
import { memo } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const ColorPicker = ({
  color,
  onChange,
  onReset,
}: {
  color: string
  onChange?: (color: string) => void
  onReset?: () => void
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <HexColorPicker color={color} onChange={onChange} />
      <div className="w-full flex items-center gap-2">
        <div
          className={cn(
            'w-[calc(200px_-_2.5rem)] overflow-hidden flex-1 h-8 outline-none border border-input rounded-sm px-2 py-0.5 flex items-center gap-2 placeholder:text-muted-foreground'
          )}>
          <span className="text-muted-foreground">#</span>
          <HexColorInput
            className="outline-none border-none"
            placeholder="请输入颜色"
            color={color}
            onChange={onChange}
          />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={onReset}>
              <Icon name="Undo" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>重置</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export const MemoColorPicker = memo(ColorPicker)
