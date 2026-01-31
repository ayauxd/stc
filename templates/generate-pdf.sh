#!/bin/bash
# Generate PDF from HTML invoice
# Usage: ./generate-pdf.sh <input.html> [output.pdf]

INPUT="$1"
OUTPUT="${2:-${INPUT%.html}.pdf}"

if [ -z "$INPUT" ]; then
  echo "Usage: ./generate-pdf.sh <input.html> [output.pdf]"
  echo "Example: ./generate-pdf.sh invoices/softworks/INV-2026-001.html"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "Error: File not found: $INPUT"
  exit 1
fi

# Convert to absolute path
INPUT_ABS="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"
OUTPUT_ABS="$(cd "$(dirname "$OUTPUT")" 2>/dev/null && pwd)/$(basename "$OUTPUT")" || OUTPUT_ABS="$(pwd)/$(basename "$OUTPUT")"

echo "Generating PDF..."
echo "  Input:  $INPUT_ABS"
echo "  Output: $OUTPUT_ABS"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$OUTPUT_ABS" \
  "$INPUT_ABS" 2>&1

if [ $? -eq 0 ]; then
  echo "✓ PDF generated successfully"
  echo "  Opening PDF..."
  open "$OUTPUT_ABS"
else
  echo "✗ PDF generation failed"
  exit 1
fi
