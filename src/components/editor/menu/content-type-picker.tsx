import { icons } from 'lucide-react'
import { memo, useMemo } from 'react'
import { ToggleButton } from './toggle-button'
import { Icon } from './icon'
import { Editor, useEditorState } from '@tiptap/react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import styles from './index.module.css'

export interface ContentTypePickerOptionItem {
  icon: keyof typeof icons
  name: string
  id: string
  onClick: () => void
  disabled: () => boolean
  isActive: () => boolean
}

export const useContentTypePicker = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): ContentTypePickerOptionItem[] => [
      {
        icon: 'Pilcrow',
        name: '正文',
        id: 'paragraph',
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setParagraph()
            .run(),
        disabled: () => !ctx.editor.can().setParagraph(),
        isActive: () =>
          ctx.editor.isActive('paragraph') &&
          !ctx.editor.isActive('orderedList') &&
          !ctx.editor.isActive('bulletList') &&
          !ctx.editor.isActive('taskList'),
      },
      {
        icon: 'Heading1',
        name: '一级标题',
        id: 'heading1',
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 1 })
            .run(),
        disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
        isActive: () => ctx.editor.isActive('heading', { level: 1 }),
      },
      {
        icon: 'Heading2',
        name: '二级标题',
        id: 'heading2',
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 2 })
            .run(),
        disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
        isActive: () => ctx.editor.isActive('heading', { level: 2 }),
      },
      {
        icon: 'Heading3',
        name: '三级标题',
        id: 'heading3',
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 3 })
            .run(),
        disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
        isActive: () => ctx.editor.isActive('heading', { level: 3 }),
      },
      {
        icon: 'Heading4',
        name: '四级标题',
        id: 'heading4',
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 4 })
            .run(),
        disabled: () => !ctx.editor.can().setHeading({ level: 4 }),
        isActive: () => ctx.editor.isActive('heading', { level: 4 }),
      },
      {
        icon: 'List',
        name: '无序列表',
        id: 'bulletList',
        onClick: () => ctx.editor.chain().focus().toggleBulletList().run(),
        disabled: () => !ctx.editor.can().toggleBulletList(),
        isActive: () => ctx.editor.isActive('bulletList'),
      },
      {
        icon: 'ListOrdered',
        name: '有序列表',
        id: 'orderedList',
        onClick: () => ctx.editor.chain().focus().toggleOrderedList().run(),
        disabled: () => !ctx.editor.can().toggleOrderedList(),
        isActive: () => ctx.editor.isActive('orderedList'),
      },
      {
        icon: 'ListTodo',
        name: '待办列表',
        id: 'todoList',
        onClick: () => ctx.editor.chain().focus().toggleTaskList().run(),
        disabled: () => !ctx.editor.can().toggleTaskList(),
        isActive: () => ctx.editor.isActive('taskList'),
      },
    ],
  })
}

export const ContentTypePicker = ({ editor }: { editor: Editor }) => {
  const options = useContentTypePicker(editor)

  const activeItem = useMemo(
    () => options.find((option) => option.isActive()),
    [options]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToggleButton
          className={cn('w-12 flex items-center gap-1', styles.popoverArrowBtn)}
          tooltip="内容类型">
          <Icon name={activeItem?.icon ?? 'Pilcrow'} />
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
              onClick={option.onClick}
              pressed={option.isActive()}
              className={cn(
                'w-full flex items-center gap-2 justify-start pl-4',
                styles.popoverArrowBtn
              )}>
              <Icon name={option.icon} />
              {option.name}
            </ToggleButton>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const MemoContentTypePicker = memo(ContentTypePicker)
