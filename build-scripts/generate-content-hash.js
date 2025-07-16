const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { globSync } = require('glob');

class ContentHashGenerator {
    constructor(contentDir = 'src/content/lessons') {
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

                // Handle different data types
                if (key === 'tags') {
                    metadata[key] = value.split(',').map(tag => tag.trim());
                } else if (key === 'estimatedTime') {
                    metadata[key] = parseInt(value);
                } else if (key === 'difficulty') {
                    metadata[key] = value.replace(/['"]/g, '');
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

        console.log('🔄 Generating content hashes...');

        for (const filePath of lessonFiles) {
            const content = fs.readFileSync(filePath, 'utf8');
            const slug = path.basename(filePath, '.md');

            // Generate hash
            const contentHash = this.generateHash(content);

            // Extract metadata
            const metadata = this.extractMetadata(content, filePath);

            // Content registry for frontend
            contentRegistry[slug] = {
                path: `./lessons/${path.basename(filePath)}`,
                hash: contentHash,
                version: 1,
                size: Buffer.byteLength(content, 'utf8')
            };

            // Metadata for backend
            const lessonMeta = {
                id: slug,
                slug: slug,
                title: metadata.title || slug,
                description: metadata.description || '',
                tags: metadata.tags || [],
                difficulty: metadata.difficulty || 'beginner',
                estimatedTime: metadata.estimatedTime || 10,
                contentHash: contentHash,
                version: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            lessonMetadata.push(lessonMeta);
            console.log(`✅ ${slug}: ${contentHash.substring(0, 8)}...`);
        }

        // Generate TypeScript content registry
        await this.generateTypeScriptRegistry(contentRegistry);

        // Generate metadata JSON for backend deployment
        await this.generateMetadataFile(lessonMetadata);

        console.log(`📝 Generated registry for ${lessonFiles.length} lessons`);
        return { contentRegistry, lessonMetadata };
    }

    // Generate TypeScript registry file
    async generateTypeScriptRegistry(contentRegistry) {
        const registryContent = `// Auto-generated content registry
// Do not edit manually

export interface ContentRegistryEntry {
  path: string;
  hash: string;
  version: number;
  size: number;
}

export const CONTENT_REGISTRY: Record<string, ContentRegistryEntry> = ${JSON.stringify(contentRegistry, null, 2)} as const;

export const CONTENT_HASHES = {
${Object.entries(contentRegistry).map(([slug, entry]) =>
            `  '${slug}': '${entry.hash}'`
        ).join(',\n')}
} as const;
`;

        // Ensure directory exists
        const dir = path.dirname(this.outputFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.outputFile, registryContent);
        console.log(`📄 Generated: ${this.outputFile}`);
    }

    // Generate metadata file for backend deployment
    async generateMetadataFile(lessonMetadata) {
        const metadataContent = {
            lessons: lessonMetadata,
            generatedAt: new Date().toISOString(),
            totalLessons: lessonMetadata.length
        };

        // Ensure directory exists
        const dir = path.dirname(this.metadataFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.metadataFile, JSON.stringify(metadataContent, null, 2));
        console.log(`📋 Generated: ${this.metadataFile}`);
    }

    // Validate content integrity
    validateContentIntegrity(contentRegistry) {
        const issues = [];

        for (const [slug, entry] of Object.entries(contentRegistry)) {
            // Check if file exists
            if (!fs.existsSync(entry.path)) {
                issues.push(`❌ Missing file: ${entry.path} for lesson ${slug}`);
            }

            // Validate hash format
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