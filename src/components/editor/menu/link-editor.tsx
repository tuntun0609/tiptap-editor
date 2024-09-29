import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Icon } from './icon'
import { Input } from '@/components/ui/input'
import { memo, useState } from 'react'
import { ToggleButton } from './toggle-button'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export const LinkEditor = ({
  onConfirm,
}: {
  onConfirm?: (url: string, openInNewTab: boolean) => void
}) => {
  const [url, setUrl] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(false)

  const handleConfirm = () => {
    onConfirm?.(url, openInNewTab)
    setUrl('')
    setOpenInNewTab(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToggleButton pressed={false}>
          <Icon name="Link" />
        </ToggleButton>
      </PopoverTrigger>
      <PopoverContent asChild sideOffset={8}>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="open-in-new-tab"
              checked={openInNewTab}
              onCheckedChange={(checked) => setOpenInNewTab(checked)}
            />
            <Label htmlFor="open-in-new-tab">在新的标签页中打开</Label>
          </div>
          <Button
            className="mt-2"
            variant="outline"
            size="sm"
            onClick={handleConfirm}>
            确定
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const MemoLinkEditor = memo(LinkEditor)
