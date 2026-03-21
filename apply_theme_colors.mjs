import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');

// Walk directory recursively
function walkSync(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
            filelist.push(filepath);
        }
    }
    return filelist;
}

const allFiles = walkSync(SRC_DIR);
let modifiedCount = 0;

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    const isAdmin = file.includes('\\admin\\') || file.includes('/admin/');

    if (isAdmin) {
        // Phase 3: Admin purple -> orange
        content = content.replace(/purple-(\d+)/g, 'orange-$1');
        
        // Phase 4: Admin #181728 -> gray-900
        content = content.replace(/text-\[\#181728\]/gi, 'text-gray-900');
        content = content.replace(/bg-\[\#181728\]/gi, 'bg-gray-900');
        content = content.replace(/border-\[\#181728\]/gi, 'border-gray-900');
        // Catch any bare hex
        content = content.replace(/['"]#181728['"]/g, "'#111827'"); // Nearest text-gray-900 hex
    } else {
        // Phase 2: Frontend #181728 -> brand-dark
        content = content.replace(/text-\[\#181728\]/gi, 'text-brand-dark');
        content = content.replace(/bg-\[\#181728\]/gi, 'bg-brand-dark');
        content = content.replace(/border-\[\#181728\]/gi, 'border-brand-dark');
        content = content.replace(/from-\[\#181728\]/gi, 'from-brand-dark');
        content = content.replace(/to-\[\#181728\]/gi, 'to-brand-dark');
        content = content.replace(/fill-\[\#181728\]/gi, 'fill-brand-dark');
        // Catch any bare hex values used in styles or props
        content = content.replace(/['"]#181728['"]/g, "'var(--brand-dark)'");
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
}

console.log(`Successfully updated colors in ${modifiedCount} files!`);
