import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  Quote, Code, Image as ImageIcon, Minus, Undo, Redo,
  Table as TableIcon, ChevronDown, Plus, Trash2, Grid
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

/* ─── Table dropdown ─── */
const TableDropdown = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hovered, setHovered] = useState({ r: 0, c: 0 });
  const ref = useRef(null);
  const GRID = 8; // max grid preview size

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const insertTable = (r, c) => {
    editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: true }).run();
    setOpen(false);
  };

  const isInTable = editor.isActive('table');

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Insert / Edit Table"
        style={{
          background: isInTable ? 'rgba(48,200,138,0.2)' : 'transparent',
          border: '1px solid',
          borderColor: isInTable ? '#30c88a' : 'var(--student-border)',
          color: isInTable ? '#30c88a' : 'var(--student-text-muted)',
          borderRadius: '6px',
          padding: '6px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s',
          fontSize: '0.72rem',
          fontWeight: 600
        }}
      >
        <TableIcon size={14} />
        <ChevronDown size={11} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          zIndex: 999,
          background: 'var(--student-card)',
          border: '1px solid var(--student-border)',
          borderRadius: '10px',
          padding: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          minWidth: '200px'
        }}>
          {/* Grid picker */}
          <p style={{ fontSize: '0.7rem', color: 'var(--student-text-muted)', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Insert table — {hovered.r > 0 ? `${hovered.r}×${hovered.c}` : 'hover to size'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID}, 18px)`, gap: '2px', marginBottom: '12px' }}>
            {Array.from({ length: GRID * GRID }).map((_, i) => {
              const r = Math.floor(i / GRID) + 1;
              const c = (i % GRID) + 1;
              const active = r <= hovered.r && c <= hovered.c;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered({ r, c })}
                  onClick={() => insertTable(hovered.r, hovered.c)}
                  style={{
                    width: 18, height: 18,
                    borderRadius: '3px',
                    background: active ? 'rgba(48,200,138,0.5)' : 'transparent',
                    border: `1px solid ${active ? '#30c88a' : 'var(--student-border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.1s'
                  }}
                />
              );
            })}
          </div>

          {/* Table manipulation controls (only when cursor is in a table) */}
          {isInTable && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid var(--student-border)', margin: '4px 0 10px' }} />
              <p style={{ fontSize: '0.68rem', color: 'var(--student-text-muted)', margin: '0 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Edit table</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { label: '+ Row above', action: () => editor.chain().focus().addRowBefore().run() },
                  { label: '+ Row below', action: () => editor.chain().focus().addRowAfter().run() },
                  { label: '+ Col before', action: () => editor.chain().focus().addColumnBefore().run() },
                  { label: '+ Col after', action: () => editor.chain().focus().addColumnAfter().run() },
                  { label: '− Delete row', action: () => editor.chain().focus().deleteRow().run(), danger: true },
                  { label: '− Delete col', action: () => editor.chain().focus().deleteColumn().run(), danger: true },
                  { label: '✕ Delete table', action: () => { editor.chain().focus().deleteTable().run(); setOpen(false); }, danger: true },
                ].map(({ label, action, danger }) => (
                  <button
                    key={label}
                    onClick={action}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${danger ? 'rgba(255,80,80,0.4)' : 'var(--student-border)'}`,
                      color: danger ? '#ff6b6b' : 'var(--student-text)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = danger ? 'rgba(255,80,80,0.1)' : 'rgba(48,200,138,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const NotesEditor = ({ content, onChange, placeholder = 'Start writing your notes here...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Underline,
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
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

        {/* Table button */}
        <div className="notes-toolbar-group">
          <TableDropdown editor={editor} />
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
