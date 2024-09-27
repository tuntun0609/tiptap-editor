'use client'

import './index.css'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import Mathematics from '@tiptap-pro/extension-mathematics'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import { TextMenu } from './menu'
import { TooltipProvider } from '../ui/tooltip'

const TiptapEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Mathematics.configure({
        shouldRender: (state, pos, node) => {
          const $pos = state.doc.resolve(pos)
          return (
            node.type.name === 'text' &&
            $pos.parent.type.name !== 'codeBlock' &&
            $pos.parent.type.name !== 'heading'
          )
        },
      }),
      Superscript,
      Subscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
      <p>Hello World! 🌎️</p>
      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>
          That’s a boring paragraph followed by a fenced code block:
        </p>
        <pre><code>for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
      <h1>This is a 1st level heading</h1>
      <h2>This is a 2nd level heading</h2>
      <h3>This is a 3rd level heading</h3>
      <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
      <p>This is a paragraph.</p>
      <hr>
      <p>And this is another paragraph.</p>
      <hr>
      <p>But between those paragraphs are horizontal rules.</p>
      <p>
        I like lists. Let’s add one:
      </p>
      <ul>
        <li>This is a bullet list.</li>
        <li>And it has three list items.</li>
        <li>Here is the third one.</li>
      </ul>
      <p>
        Do you want to see one more? I bet! Here is another one:
      </p>
      <ol>
        <li>That’s a different list, actually it’s an ordered list.</li>
        <li>It also has three list items.</li>
        <li>And all of them are numbered.</li>
      </ol>
      <p>
        Lists would be nothing without list items.
      </p>
      <p>This isn’t bold.</p>
      <p><strong>This is bold.</strong></p>
      <p><b>And this.</b></p>
      <p>something<code>This is code.$a=b$</code>something</p>
      <p><em>This is italic.</em></p>
      <p><s>But that’s strike through.</s></p>
      <p><del>And this.</del></p>
      <p><strike>This too.</strike></p>
      <p><u>This is underlined though.</u></p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">A list item</li>
        <li data-type="taskItem" data-checked="false">And another one</li>
      </ul>
      <p>
        Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
      </p>
      <h1>
        This editor supports $\\LaTeX$ math expressions.
      </h1>
      <p>
        Did you know that $3 * 3 = 9$? Isn't that crazy? Also Pythagoras' theorem is $a^2 + b^2 = c^2$.<br />
        Also the square root of 2 is $\\sqrt{2}$. If you want to know more about $\\LaTeX$ visit <a href="https://katex.org/docs/supported.html" target="_blank">katex.org</a>.
      </p>
      <code>
        <pre>$\\LaTeX$</pre>
      </code>
      <p>
        Do you want go deeper? Here is a list of all supported functions:
      </p>
      <ul>
        <li>$\\sin(x)$</li>
        <li>$\\cos(x)$</li>
        <li>$\\tan(x)$</li>
        <li>$\\log(x)$</li>
        <li>$\\ln(x)$</li>
        <li>$\\sqrt{x}$</li>
        <li>$\\sum_{i=0}^n x_i$</li>
        <li>$\\int_a^b x^2 dx$</li>
        <li>$\\frac{1}{x}$</li>
        <li>$\\binom{n}{k}$</li>
        <li>$\\sqrt[n]{x}$</li>
        <li>$\\left(\\frac{1}{x}\\right)$</li>
        <li>$\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right.$</li>
      </ul>
      <p>superscript<sup>This is superscript.</sup></p>
      <p>subscript<sub>This is subscript.</sub></p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th colspan="3">Description</th>
          </tr>
          <tr>
            <td>Cyndi Lauper</td>
            <td>Singer</td>
            <td>Songwriter</td>
            <td>Actress</td>
          </tr>
        </tbody>
      </table><p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
      <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
      <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
      <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
      <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
      <p><span style="font-family: var(--title-font-family)">Then there are CSS variables, the new hotness.</span></p>
      <p><span style="color: #958DF1">Oh, for some reason that’s purple.</span></p>
    `,
  })

  return (
    <TooltipProvider>
      <div className="relative">
        <EditorContent editor={editor} />
        {editor && <TextMenu editor={editor} />}
      </div>
    </TooltipProvider>
  )
}

export default TiptapEditor
