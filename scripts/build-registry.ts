#!/usr/bin/env node
/**
 * Generate docs/skills.json from skill SKILL.md files and build ZIP artifacts.
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';

const rootDir = process.cwd();
const skillsDir = join(rootDir, 'skills');
const outputDir = join(rootDir, 'docs');
const outputFile = join(outputDir, 'skills.json');
const publicZipsDir = join(outputDir, 'zips');
const baseUrl = process.env.SKILLS_REGISTRY_BASE_URL?.replace(/\/$/, '') ?? '';

function walkForSkillFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkForSkillFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === 'SKILL.md') {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizePath(pathValue) {
  return pathValue.split('\\').join('/');
}

function createZip(skillFolderPath, zipFilePath) {
  rmSync(zipFilePath, { force: true });
  try {
    execFileSync('zip', ['-r', zipFilePath, '.'], { cwd: skillFolderPath, stdio: 'ignore' });
  } catch (error) {
    console.error('Failed to create zip. Ensure "zip" is installed on your system.');
    throw error;
  }
}

function main() {
  if (!existsSync(skillsDir)) {
    console.warn('No skills directory found. Writing empty registry.');
  }

  const skillFiles = existsSync(skillsDir) ? walkForSkillFiles(skillsDir) : [];
  const skills = [];

  if (skillFiles.length > 0) {
    mkdirSync(publicZipsDir, { recursive: true });
  }

  for (const filePath of skillFiles) {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    const name = typeof parsed.data.name === 'string' ? parsed.data.name.trim() : '';
    const description =
      typeof parsed.data.description === 'string' ? parsed.data.description.trim() : '';
    const relPath = normalizePath(relative(rootDir, filePath));
    const folder = normalizePath(relative(skillsDir, dirname(filePath))) || '.';

    if (!name || !description) {
      console.warn(`Skipping ${relPath} (missing name or description).`);
      continue;
    }

    const skillFolderPath = dirname(filePath);
    const zipFileName = `${name}.zip`;
    const zipFilePath = join(publicZipsDir, zipFileName);
    const zipUrl = baseUrl ? `${baseUrl}/zips/${zipFileName}` : `zips/${zipFileName}`;

    createZip(skillFolderPath, zipFilePath);

    skills.push({
      name,
      description,
      path: relPath,
      folder,
      zipUrl,
    });
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(
    outputFile,
    JSON.stringify({ generatedAt: new Date().toISOString(), skills }, null, 2) + '\n',
    'utf-8'
  );

  console.log(`Wrote ${skills.length} skills to ${normalizePath(relative(rootDir, outputFile))}`);
}

main();
