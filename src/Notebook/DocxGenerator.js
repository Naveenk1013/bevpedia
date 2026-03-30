import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ImageRun,
  PageNumber,
  Header,
  Footer,
  PageReference,
} from 'docx';
import { saveAs } from 'file-saver';

/**
 * Generates a DOCX blob from the ScholarNotebook state.
 */
export async function generateScholarDocx(payload) {
  const { 
    title, 
    author, 
    metadata, 
    sections, 
    formatting, 
    references = [],
    analysis_results = []
  } = payload;

  const {
    font = 'Times New Roman',
    fontSize = 12,
    lineSpacing = 1.5,
    margins = 1,
    includePageNumbers = true,
    pageNumberPosition = 'bottom',
    includeTitlePage = true,
  } = formatting;

  // 1. Create Document
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: fontSize * 2, // docx uses half-points
            font: font,
          },
          paragraph: {
            spacing: {
              line: lineSpacing * 240, // 240 is 1 line height in docx
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: margins * 1440, // 1440 twips = 1 inch
              right: margins * 1440,
              bottom: margins * 1440,
              left: margins * 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: formatting.headerText || '',
                    size: 18,
                    color: "94a3b8",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: formatting.footerText || '',
                    size: 18,
                    color: "94a3b8",
                  }),
                  ...(includePageNumbers && pageNumberPosition === 'bottom' ? [
                    new TextRun({ text: " — Page ", size: 18 }),
                    new TextRun({ children: [PageNumber.CURRENT], size: 18 }),
                  ] : []),
                ],
              }),
            ],
          }),
        },
        children: [
          // ── Title Page ──
          ...(includeTitlePage ? [
            new Paragraph({ spacing: { before: 2400 }, alignment: AlignmentType.CENTER, children: [
              new TextRun({ text: title, bold: true, size: (fontSize + 6) * 2 }),
            ]}),
            new Paragraph({ spacing: { before: 1200 }, alignment: AlignmentType.CENTER, children: [
              new TextRun({ text: author, size: (fontSize + 2) * 2 }),
            ]}),
            ...(metadata.affiliations ? [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: metadata.affiliations, italic: true, size: fontSize * 2 }),
              ]}),
            ] : []),
            ...(metadata.email ? [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: metadata.email, size: (fontSize - 1) * 2, color: "2563eb" }),
              ]}),
            ] : []),
            ...(metadata.keywords ? [
              new Paragraph({ spacing: { before: 1200 }, alignment: AlignmentType.CENTER, children: [
                new TextRun({ text: "Keywords: ", bold: true }),
                new TextRun({ text: metadata.keywords }),
              ]}),
            ] : []),
            new Paragraph({ text: "", pageBreakBefore: true }),
          ] : []),

          // ── Main Content Sections ──
          ...sections.flatMap((sec, sIdx) => {
            const sectionChildren = [
              new Paragraph({
                text: sec.title,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 },
              }),
              ...sec.body.split('\n').filter(p => p.trim()).map(p => 
                new Paragraph({
                  text: p,
                  spacing: { after: 120 },
                })
              ),
            ];

            // Tables
            if (sec.tables && sec.tables.length > 0) {
              sec.tables.forEach(tbl => {
                const tableRows = tbl.rows.map((row, rIdx) => 
                  new TableRow({
                    children: row.map(cell => 
                      new TableCell({
                        children: [new Paragraph({ text: cell || '', bold: rIdx === 0 })],
                        shading: rIdx === 0 ? { fill: "f1f5f9" } : undefined,
                      })
                    ),
                  })
                );
                sectionChildren.push(
                    new Paragraph({ text: `Table ${sIdx + 1}: ${tbl.caption}`, italic: true, spacing: { before: 200 } }),
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: tableRows,
                        spacing: { after: 200 }
                    })
                );
              });
            }

            // Images (Placeholder approach for Base64)
            if (sec.images && sec.images.length > 0) {
                sec.images.forEach((img, iIdx) => {
                    // Extract base64 data
                    const base64Data = img.dataUrl.split(',')[1];
                    try {
                        sectionChildren.push(
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new ImageRun({
                                        data: Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)),
                                        transformation: { width: 400, height: 300 },
                                    }),
                                ],
                            }),
                            new Paragraph({ 
                                text: `Figure ${iIdx + 1}: ${img.caption}`, 
                                alignment: AlignmentType.CENTER, 
                                italic: true, 
                                spacing: { after: 200 } 
                            })
                        );
                    } catch (e) {
                        console.error('Error adding image to docx:', e);
                    }
                });
            }

            return sectionChildren;
          }),

          // ── AI Analysis Results ──
          ...(analysis_results.length > 0 ? [
            new Paragraph({ text: "AI Analysis Results", heading: HeadingLevel.HEADING_1, pageBreakBefore: true }),
            ...analysis_results.flatMap(r => [
                new Paragraph({ text: `Query: ${r.query}`, bold: true, spacing: { before: 200 } }),
                new Paragraph({ text: r.result, spacing: { after: 120 } })
            ])
          ] : []),

          // ── References ──
          ...(references.length > 0 ? [
            new Paragraph({ text: "References", heading: HeadingLevel.HEADING_1, pageBreakBefore: true }),
            ...references.map(ref => 
                new Paragraph({ text: ref.citation || `${ref.authors} (${ref.year}). ${ref.title}.`, spacing: { after: 120 } })
            )
          ] : [])
        ],
      },
    ],
  });

  // 2. Generate and Save
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title.replace(/[^a-zA-Z0-9 _-]/g, '_')}.docx`);
}
