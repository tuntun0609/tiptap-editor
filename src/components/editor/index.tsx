'use client'

import './index.css'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
const TiptapEditor = () => {
  const editor = useEditor({
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
      <p>something<code>This is code.</code>something</p>
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
    `,
  })

  return <EditorContent editor={editor} />
}

export default TiptapEditor
