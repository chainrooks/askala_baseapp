import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class ContentHashGenerator {
    constructor(contentDir = 'src/askala_baseapp_frontend/src/content/python') {
        this.contentDir = contentDir;
        this.outputFile = 'src/generated/content-registry.ts';
        this.metadataFile = 'deployment/lesson-metadata.json';
    }

    // Generate SHA256 hash for content
    generateHash(content) {
        return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    }

    // Extract metadata from markdown frontmatter
    extractMetadata(content, filePath) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            throw new Error(`No frontmatter found in ${filePath}`);
        }

        const frontmatter = match[1];
        const metadata = {};

        // Parse YAML-like frontmatter
        frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();

                if (key === 'tags') {
                    metadata[key] = value.split(',').map(tag => tag.trim());
                } else if (key === 'estimatedTime') {
                    metadata[key] = parseInt(value);
                } else {
                    metadata[key] = value.replace(/['"]/g, '');
                }
            }
        });
        
        return metadata;
    }

    // Generate content registry and metadata
    async generateContentRegistry() {
        const lessonFiles = globSync(`${this.contentDir}/**/*.md`);
        const contentRegistry = {};
        const lessonMetadata = [];
        
        console.log(`🔄 Generating content registry for ${lessonFiles.length} lessons...`);
        // console.log('🔄 Generating content hashes...');

        for (const filePath of lessonFiles) {
            console.log(`🔍 Reading file: ${filePath}`);
            const content = fs.readFileSync(filePath, 'utf8');
            const slug = path.basename(filePath, '.md');

            const contentHash = this.generateHash(content);
            const metadata = this.extractMetadata(content, filePath);
            
            console.log(`🔍 Processing ${slug}...`)                        
            contentRegistry[slug] = {
                path: `src/askala_baseapp_frontend/src/content/python/${path.basename(filePath)}`,
                hash: contentHash,
                version: metadata.version || '1.0',
                size: Buffer.byteLength(content, 'utf8'),
                is_premium: metadata.premium === 'true',
            };            
            
            // console.log(`🔍 Extracted metadata for ${slug}:`, metadata);
            const lessonMeta = {                
                slug: slug,
                title: metadata.title || slug,
                description: metadata.description || '',                
                code: metadata.code || '',
                contentHash: contentHash,
                version: metadata.version || '1.0',
                // is_premium: metadata.premium || false, // Default to false if not specified
                // javascript convert to boolean
                is_premium: metadata.premium === 'true',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            lessonMetadata.push(lessonMeta);
            console.log(`✅ ${slug}: ${contentHash.substring(0, 8)}...`);
        }

        await this.generateTypeScriptRegistry(contentRegistry);
        await this.generateMetadataFile(lessonMetadata);

        console.log(`📝 Generated registry for ${lessonFiles.length} lessons`);
        return { contentRegistry, lessonMetadata };
    }

    // Write TypeScript registry file
    async generateTypeScriptRegistry(contentRegistry) {
        const registryContent = `// Auto-generated content registry
                // Do not edit manually

                export interface ContentRegistryEntry {
                path: string;
                hash: string;
                version: string
                size: number;
                premium: boolean;
                }

                export const CONTENT_REGISTRY: Record<string, ContentRegistryEntry> = ${JSON.stringify(contentRegistry, null, 2)} as const;

                export const CONTENT_HASHES = {
                ${Object.entries(contentRegistry).map(([slug, entry]) =>
                            `  '${slug}': '${entry.hash}'`
                        ).join(',\n')}
                } as const;
        `;

        const dir = path.dirname(this.outputFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.outputFile, registryContent);
        console.log(`📄 Generated: ${this.outputFile}`);
    }

    // Write JSON metadata for backend
    async generateMetadataFile(lessonMetadata) {
        const metadataContent = {
            lessons: lessonMetadata,
            generatedAt: new Date().toISOString(),
            totalLessons: lessonMetadata.length
        };

        const dir = path.dirname(this.metadataFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.metadataFile, JSON.stringify(metadataContent, null, 2));
        console.log(`📋 Generated: ${this.metadataFile}`);
    }

    // Optional validation
    validateContentIntegrity(contentRegistry) {
        const issues = [];
        
        for (const [slug, entry] of Object.entries(contentRegistry)) {
            if (!fs.existsSync(entry.path)) {
                issues.push(`❌ Missing file: ${entry.path} for lesson ${slug}`);
            }

            if (!/^[a-f0-9]{64}$/.test(entry.hash)) {
                issues.push(`❌ Invalid hash format for lesson ${slug}`);
            }
        }

        if (issues.length > 0) {
            console.error('Content validation failed:');
            issues.forEach(issue => console.error(issue));
            throw new Error('Content validation failed');
        }

        console.log('✅ Content validation passed');
    }
}

// ===== Entry Point =====
(async () => {
    try {
        const generator = new ContentHashGenerator();
        const { contentRegistry } = await generator.generateContentRegistry();
        generator.validateContentIntegrity(contentRegistry);
        console.log('🔧 Content hash generation script is ready to use.');
    } catch (error) {
        console.error('🚨 Error:', error.message);
    }
})();