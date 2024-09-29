import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { BubbleMenu, Editor, useEditorState } from '@tiptap/react'
import { useCallback, useState } from 'react'
import { Icon } from './icon'

export const LinkMenu = ({ editor }: { editor: Editor }) => {
  const { link, target } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes('link')
      return { link: attrs.href, target: attrs.target }
    },
  })
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [openInNewTab, setOpenInNewTab] = useState<boolean | null>(null)

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('link')
    return isActive
  }, [editor])

  const handleConfirm = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
      setIsEditing(false)
    }
  }

  const handleUnsetLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setIsEditing(false)
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: 'bottom',
        offset: [0, 0],
        maxWidth: 'calc(100vw - 16px)',
        appendTo: document.body,
        onHidden: () => {
          setIsEditing(false)
          setUrl(null)
          setOpenInNewTab(null)
        },
      }}>
      <div className="flex flex-row items-center gap-1 p-2 border bg-white rounded-md dark:bg-zinc-800">
        {isEditing ? (
          <div className="flex flex-col gap-2 w-[300px]">
            <Input
              placeholder="https://example.com"
              value={url ?? ''}
              onChange={(e) => setUrl(e.target.value)}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="open-in-new-tab"
                checked={openInNewTab ?? false}
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
        ) : (
          <div className="flex flex-col gap-2">
            <a
              href={link}
              target={target}
              title={link}
              className="text-sm text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
              {link}
            </a>
            <div className="flex flex-row items-center gap-1">
              <Button
                className="flex items-center gap-1"
                variant="outline"
                size="sm"
                onClick={handleUnsetLink}>
                <Icon name="Unlink" />
                取消链接
              </Button>
              <Button
                className="flex items-center gap-1"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrl(link)
                  setOpenInNewTab(target === '_blank')
                  setIsEditing(true)
                }}>
                <Icon name="Pencil" />
                编辑
              </Button>
            </div>
          </div>
        )}
      </div>
    </BubbleMenu>
  )
}
