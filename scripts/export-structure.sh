#!/bin/bash

# Create timestamp for the export
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_DIR="public/docs/dev/notes/tree"
ARCHIVE_DIR="$EXPORT_DIR/archive"

# Create necessary directories
mkdir -p "$EXPORT_DIR"
mkdir -p "$ARCHIVE_DIR"
mkdir -p "$EXPORT_DIR/current"

# Archive previous exports
ARCHIVE_SUBDIR="${ARCHIVE_DIR}/${TIMESTAMP}_archive"
mkdir -p "$ARCHIVE_SUBDIR"

if [ -f "$EXPORT_DIR/project-structure.md" ]; then
    mv "$EXPORT_DIR"/*.md "$ARCHIVE_SUBDIR/"
fi

# Function to export tree structure
export_tree() {
    local path=$1
    local depth=$2
    local output=$3
    local title=$4
    
    echo "# 🌳 $title" > "$output"
    echo "*Generated: $(date '+%Y-%m-%d %H:%M:%S')*" >> "$output"
    echo "\n## Directory Structure" >> "$output"
    tree "$path" -L "$depth" --dirsfirst -I 'node_modules|.git|dist|build|backup' >> "$output"
}

# Export main structures
echo "🔄 Exporting project structures..."

# Main project structure
export_tree "." 3 "$EXPORT_DIR/current/main-structure.md" "SHELTR Main Structure"

# Source directory structure
export_tree "./src" 4 "$EXPORT_DIR/current/src-structure.md" "SHELTR Source Structure"

# Documentation structure
export_tree "./public/docs" 4 "$EXPORT_DIR/current/docs-structure.md" "SHELTR Documentation Structure"

# Components structure
export_tree "./src/components" 4 "$EXPORT_DIR/current/components-structure.md" "SHELTR Components Structure"

# Features structure
export_tree "./src/features" 4 "$EXPORT_DIR/current/features-structure.md" "SHELTR Features Structure"

# Technical directories
export_tree "./src/auth" 3 "$EXPORT_DIR/current/auth-structure.md" "SHELTR Auth Structure"
export_tree "./src/layouts" 3 "$EXPORT_DIR/current/layouts-structure.md" "SHELTR Layouts Structure"
export_tree "./src/pages" 3 "$EXPORT_DIR/current/pages-structure.md" "SHELTR Pages Structure"

# Create combined structure file
echo "📑 Creating combined structure document..."

cat << EOF > "$EXPORT_DIR/project-structure.md"
# 🌳 SHELTR Project Structure
*Generated: $(date '+%Y-%m-%d %H:%M:%S')*
*Version: 0.4.9*

## Table of Contents
1. [Main Structure](#main-structure)
2. [Source Structure](#source-structure)
3. [Documentation Structure](#documentation-structure)
4. [Components Structure](#components-structure)
5. [Features Structure](#features-structure)
6. [Technical Structures](#technical-structures)

EOF

# Append all structures to combined file
for file in "$EXPORT_DIR/current"/*.md; do
    echo "\n---\n" >> "$EXPORT_DIR/project-structure.md"
    tail -n +2 "$file" >> "$EXPORT_DIR/project-structure.md"
done

# Create a compressed archive
echo "📦 Creating backup archive..."
tar -czf "$ARCHIVE_DIR/${TIMESTAMP}_structure_backup.tar.gz" -C "$EXPORT_DIR/current" .

echo "✅ Export completed successfully!"
echo "📍 Structures exported to: $EXPORT_DIR"
echo "📍 Archive created at: $ARCHIVE_DIR/${TIMESTAMP}_structure_backup.tar.gz" 