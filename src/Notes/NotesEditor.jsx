import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  Quote, Code, Image as ImageIcon, Minus, Undo, Redo
} from 'lucide-react';

const MenuButton = ({ onClick, isActive, children, title }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      background: isActive ? 'rgba(48,200,138,0.2)' : 'transparent',
      border: '1px solid',
      borderColor: isActive ? '#30c88a' : 'var(--student-border)',
      color: isActive ? '#30c88a' : 'var(--student-text-muted)',
      borderRadius: '6px',
      padding: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    }}
  >
    {children}
  </button>
);

const NotesEditor = ({ content, onChange, placeholder = 'Start writing your notes here...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Underline,
      Placeholder.configure({ placeholder })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addImageBase64 = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          editor.chain().focus().setImage({ src: reader.result }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="notes-editor-wrapper">
      {/* Toolbar */}
      <div className="notes-toolbar">
        <div className="notes-toolbar-group">
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
            <Bold size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
            <Italic size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
            <UnderlineIcon size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
            <Strikethrough size={15} />
          </MenuButton>
        </div>

        <div className="notes-toolbar-divider" />

        <div className="notes-toolbar-group">
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
            <Heading1 size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
            <Heading2 size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
            <Heading3 size={15} />
          </MenuButton>
        </div>

        <div className="notes-toolbar-divider" />

        <div className="notes-toolbar-group">
          <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
            <List size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List">
            <ListOrdered size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote">
            <Quote size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">
            <Code size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
            <Minus size={15} />
          </MenuButton>
        </div>

        <div className="notes-toolbar-divider" />

        <div className="notes-toolbar-group">
          <MenuButton onClick={addImage} title="Add Image (URL)">
            <ImageIcon size={15} />
          </MenuButton>
          <button
            onClick={addImageBase64}
            title="Upload Image from Device"
            style={{
              background: 'transparent',
              border: '1px solid var(--student-border)',
              color: 'var(--student-text-muted)',
              borderRadius: '6px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '0.7rem',
              fontWeight: 600
            }}
          >
            📎 Upload
          </button>
        </div>

        <div style={{ marginLeft: 'auto' }} />

        <div className="notes-toolbar-group">
          <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={15} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={15} />
          </MenuButton>
        </div>
      </div>

      {/* Editor Canvas */}
      <EditorContent editor={editor} className="notes-editor-content" />
    </div>
  );
};

export default NotesEditor;
