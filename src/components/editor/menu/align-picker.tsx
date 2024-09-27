import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from './icon'
import { ToggleButton } from './toggle-button'
import { Editor, useEditorState } from '@tiptap/react'
import { icons } from 'lucide-react'
import { memo, useMemo } from 'react'
import { cn } from '@/lib/utils'

import styles from './index.module.css'

export interface AlignPickerOptionItem {
  icon: keyof typeof icons
  name: string
  id: string
  onClick: () => void
  isActive: () => boolean
}

export const AlignPicker = ({ editor }: { editor: Editor }) => {
  const options = useEditorState({
    editor,
    selector: (ctx): AlignPickerOptionItem[] => [
      {
        name: '左对齐',
        id: 'align-left',
        icon: 'AlignLeft',
        onClick: () => ctx.editor.chain().focus().setTextAlign('left').run(),
        isActive: () => ctx.editor.isActive({ textAlign: 'left' }),
      },
      {
        name: '居中对齐',
        id: 'align-center',
        icon: 'AlignCenter',
        onClick: () => ctx.editor.chain().focus().setTextAlign('center').run(),
        isActive: () => ctx.editor.isActive({ textAlign: 'center' }),
      },
      {
        name: '右对齐',
        id: 'align-right',
        icon: 'AlignRight',
        onClick: () => ctx.editor.chain().focus().setTextAlign('right').run(),
        isActive: () => ctx.editor.isActive({ textAlign: 'right' }),
      },
      {
        name: '两端对齐',
        id: 'justify',
        icon: 'AlignJustify',
        onClick: () => ctx.editor.chain().focus().setTextAlign('justify').run(),
        isActive: () => ctx.editor.isActive({ textAlign: 'justify' }),
      },
    ],
  })

  const activeItem = useMemo(() => {
    return options.find((option) => option.isActive())
  }, [options])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToggleButton
          pressed={false}
          className={cn('w-12 flex items-center gap-1', styles.popoverArrowBtn)}
          tooltip="对齐">
          <Icon name={activeItem?.icon ?? 'AlignLeft'} />
          <Icon className={cn(styles.popoverArrow)} name="ChevronDown" />
        </ToggleButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        asChild
        align="start"
        sideOffset={8}
        alignOffset={-4}
        className="px-1 py-2 w-[200px]">
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <ToggleButton
              key={option.id}
              pressed={option.isActive()}
              className={cn(
                'w-full flex items-center gap-2 justify-start pl-4',
                styles.popoverArrowBtn
              )}
              onClick={option.onClick}>
              <Icon name={option.icon} />
              {option.name}
            </ToggleButton>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const MemoAlignPicker = memo(AlignPicker)
