#!/usr/bin/env node

import { execSync } from 'child_process';
import { getVersionString } from '../src/lib/utils/version';

const UPDATE_PROMPT = `
Please update all project documentation with:
Version: ${getVersionString()}
Date: ${new Date().toLocaleDateString()}
`;

// Execute update command
execSync(`echo "${UPDATE_PROMPT}" | npx ts-node scripts/doc-updater.ts`); 