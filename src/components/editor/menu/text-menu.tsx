import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { BubbleMenu, Editor, isTextSelection } from '@tiptap/react'
import CodeBlock from '@tiptap/extension-code-block'
import Table from '@tiptap/extension-table'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { ToggleButton } from './toggle-button'
import { Icon } from './icon'
import { MemoContentTypePicker } from './content-type-picker'
import { Divider } from './divider'
import { useCallback } from 'react'
import { MemoAlignPicker } from './align-picker'

export const TextMenu = ({ editor }: { editor: Editor }) => {
  const shouldShow = useCallback(
    (props: {
      editor: Editor
      view: EditorView
      state: EditorState
      oldState?: EditorState
      from: number
      to: number
    }) => {
      const { view } = props

      // 把不需要展示文字浮窗菜单的节点类型过滤掉
      if (
        [CodeBlock.name, Table.name, Link.name, HorizontalRule.name].some(
          (name) => editor.isActive(name)
        )
      ) {
        return false
      }

      if (!view || editor.view.dragging) {
        return false
      }

      const {
        state: {
          doc,
          selection,
          selection: { empty, from, to },
        },
      } = editor

      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(selection)

      if (empty || isEmptyTextBlock || !editor.isEditable) {
        return false
      }

      return true
    },
    [editor]
  )

  return (
    <BubbleMenu
      tippyOptions={{
        animation: 'fade',
        popperOptions: {
          placement: 'top-start',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
              },
            },
          ],
        },
        maxWidth: 'calc(100vw - 16px)',
      }}
      shouldShow={shouldShow}
      pluginKey="text-menu"
      editor={editor}
      updateDelay={100}>
      <div className="flex flex-row items-center gap-1 p-1 border bg-white rounded-md dark:bg-zinc-800">
        <MemoContentTypePicker editor={editor} />
        <Divider />
        <MemoAlignPicker editor={editor} />
        <Divider />
        <ToggleButton
          onPressedChange={(pressed) => {
            if (pressed) {
              editor.chain().focus().toggleBold().run()
            } else {
              editor.chain().focus().unsetBold().run()
            }
          }}
          pressed={editor.isActive('bold')}
          tooltip="加粗">
          <Icon name="Bold" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={(pressed) => {
            if (pressed) {
              editor.chain().focus().toggleItalic().run()
            } else {
              editor.chain().focus().unsetItalic().run()
            }
          }}
          pressed={editor.isActive('italic')}
          tooltip="斜体">
          <Icon name="Italic" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={(pressed) => {
            if (pressed) {
              editor.chain().focus().toggleStrike().run()
            } else {
              editor.chain().focus().unsetStrike().run()
            }
          }}
          pressed={editor.isActive('strike')}
          tooltip="删除线">
          <Icon name="Strikethrough" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={(pressed) => {
            if (pressed) {
              editor.chain().focus().toggleUnderline().run()
            } else {
              editor.chain().focus().unsetUnderline().run()
            }
          }}
          pressed={editor.isActive('underline')}
          tooltip="下划线">
          <Icon name="Underline" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={(pressed) => {
            if (pressed) {
              editor.chain().focus().toggleCode().run()
            } else {
              editor.chain().focus().unsetCode().run()
            }
          }}
          pressed={editor.isActive('code')}
          tooltip="内联代码">
          <Icon name="Code" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={() => {
            editor.chain().focus().toggleCodeBlock().run()
          }}
          pressed={editor.isActive('codeBlock')}
          tooltip="代码块">
          <Icon name="FileCode" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={() => {
            editor.chain().focus().toggleSuperscript().run()
          }}
          pressed={editor.isActive('superscript')}
          tooltip="上标">
          <Icon name="Superscript" />
        </ToggleButton>
        <ToggleButton
          onPressedChange={() => {
            editor.chain().focus().toggleSubscript().run()
          }}
          pressed={editor.isActive('subscript')}
          tooltip="下标">
          <Icon name="Subscript" />
        </ToggleButton>
      </div>
    </BubbleMenu>
  )
}
