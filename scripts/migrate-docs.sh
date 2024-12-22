#!/bin/bash

# Create new directories if they don't exist
mkdir -p public/docs/{about,core,technical,dev/notes/2024-12,guides,archives/{builds,changelogs,checkpoints}/2024-12}

# 1. High-Level Documentation
echo "Migrating High-Level Documentation..."
cp public/docs/project/SHELTR\ Page\ Organization\ Refactor\ Plan.ini public/docs/guides/best-practices.md
cp public/docs/project/SHELTR\ Refactor\ Progress\ Assessment.ini public/docs/dev/notes/2024-12/refactor-assessment.md
cat public/docs/project/roadmap.md >> public/docs/about/roadmap.md
cat public/docs/project/status_report.md >> public/docs/dev/notes/2024-12/status-dec21.md

# 2. Technical Documentation
echo "Migrating Technical Documentation..."
cat public/docs/project/tech_stack.md >> public/docs/core/architecture.md
cat public/docs/project/dashboard_arch.md >> public/docs/core/architecture.md
cat public/docs/project/rbac.md >> public/docs/technical/authentication.md
cat public/docs/project/typescript_errors.md >> public/docs/dev/debugging.md

# 3. User Flow Documentation
echo "Migrating User Flow Documentation..."
cat public/docs/project/user_flows.md >> public/docs/technical/authentication.md
cat public/docs/project/user_flow_testing.md >> public/docs/dev/debugging.md
cat public/docs/project/pages.md >> public/docs/guides/best-practices.md

# 4. Build & Deployment
echo "Migrating Build & Deployment Documentation..."
cat public/docs/project/build_tract.md >> public/docs/archives/builds/2024-12/build-0.4.8.md
cat public/docs/project/buildout_implementation.md >> public/docs/guides/deployment.md
cat public/docs/project/deployment.md >> public/docs/guides/deployment.md

# 5. Historical Records
echo "Migrating Historical Records..."
cat public/docs/project/changelog.md >> public/docs/archives/changelogs/2024-12/index.md
cat public/docs/project/checkpoint.md >> public/docs/archives/checkpoints/2024-12/checkpoint-2024-12-20.md
cp public/docs/project/dec15-restructure.md public/docs/archives/changelogs/2024-12/changelog-2024-12-15.md

# 6. AI Prompts
echo "Migrating AI Prompts..."
cat public/docs/project/prompt_*.md > public/docs/dev/notes/2024-12/ai-prompts.md

# Create backup of old files
echo "Creating backup of original files..."
mkdir -p public/docs/project_backup
cp -r public/docs/project/* public/docs/project_backup/

# Git commands
echo "Adding files to git..."
git add public/docs/
git status
