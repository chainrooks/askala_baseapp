// deploy-scripts/deploy-to-motoko.js
const { execSync } = require('child_process');
const fs = require('fs');

class MotokoDeployment {
    constructor() {
        this.metadataFile = 'deployment/lesson-metadata.json';
        this.canisterName = 'learning_manager';
        this.network = process.env.DFX_NETWORK || 'local';
    }

    // 🎯 INI BAGIAN UTAMA UNTUK CALL KE ICP MOTOKO
    async deployMetadata() {
        console.log('🚀 Deploying metadata to ICP Motoko backend...');

        const metadata = JSON.parse(fs.readFileSync(this.metadataFile, 'utf8'));

        // Convert to Motoko format
        const motokoData = this.convertToMotokoFormat(metadata.lessons);

        console.log(`📋 Deploying ${motokoData.length} lessons to canister: ${this.canisterName}`);

        try {
            // 🔥 CALL KE MOTOKO CANISTER - Method 1: Bulk Update
            await this.bulkUpdateLessons(motokoData);

            // 🔥 CALL KE MOTOKO CANISTER - Method 2: Individual Updates (alternative)
            // await this.individualUpdateLessons(motokoData);

            console.log('✅ Metadata deployed successfully');

        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            throw error;
        }
    }

    // 🎯 METHOD 1: Bulk update semua lessons sekaligus
    async bulkUpdateLessons(lessons) {
        console.log('📡 Bulk updating lessons...');

        // Convert array to Motoko format
        const motokoArray = lessons.map(lesson => this.formatLessonForMotoko(lesson));

        // DFX command untuk call function di Motoko
        const command = [
            'dfx', 'canister', 'call',
            '--network', this.network,
            this.canisterName,
            'bulkUpdateLessonMetadata',
            `'(${JSON.stringify(motokoArray)})'`
        ].join(' ');

        console.log('🔧 Executing:', command);
        execSync(command, { stdio: 'inherit' });
    }

    // 🎯 METHOD 2: Update lessons satu per satu
    async individualUpdateLessons(lessons) {
        console.log('📡 Updating lessons individually...');

        for (const lesson of lessons) {
            const motokoLesson = this.formatLessonForMotoko(lesson);

            // DFX command untuk update individual lesson
            const command = [
                'dfx', 'canister', 'call',
                '--network', this.network,
                this.canisterName,
                'updateLessonMetadata',
                `'("${lesson.slug}", ${JSON.stringify(motokoLesson)})'`
            ].join(' ');

            console.log(`📝 Updating lesson: ${lesson.slug}`);
            execSync(command, { stdio: 'inherit' });
        }
    }

    // 🎯 METHOD 3: Call specific functions
    async callMotokoFunction(functionName, params) {
        const command = [
            'dfx', 'canister', 'call',
            '--network', this.network,
            this.canisterName,
            functionName,
            `'(${params})'`
        ].join(' ');

        console.log(`🔧 Calling ${functionName}:`, command);
        const result = execSync(command, { encoding: 'utf8' });
        return result.trim();
    }

    // Format lesson untuk Motoko
    formatLessonForMotoko(lesson) {
        return {
            id: `"${lesson.id}"`,
            slug: `"${lesson.slug}"`,
            title: `"${lesson.title}"`,
            description: `"${lesson.description}"`,
            tags: `[${lesson.tags.map(tag => `"${tag}"`).join(', ')}]`,
            difficulty: `"${lesson.difficulty}"`,
            estimatedTime: lesson.estimatedTime,
            contentHash: `"${lesson.contentHash}"`,
            version: lesson.version,
            createdAt: `"${lesson.createdAt}"`,
            updatedAt: `"${lesson.updatedAt}"`
        };
    }

    // Parse Motoko result dari string ke object
    parseMotokResult(result) {
        try {
            // Motoko returns dalam format khusus, perlu parsing
            // Contoh: (opt record { id = "javascript-basics"; title = "JavaScript Basics"; ... })

            // Simple parsing untuk demo - sesuaikan dengan format actual Motoko
            const cleanResult = result.replace(/opt\s+/g, '').replace(/record\s+/g, '');
            return JSON.parse(cleanResult);

        } catch (error) {
            console.error('Failed to parse Motoko result:', result);
            return null;
        }
    }

    // Convert JavaScript metadata to Motoko format
    convertToMotokoFormat(lessons) {
        return lessons.map(lesson => ({
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            tags: lesson.tags,
            difficulty: lesson.difficulty,
            estimatedTime: lesson.estimatedTime,
            contentHash: lesson.contentHash,
            version: lesson.version,
            createdAt: lesson.createdAt,
            updatedAt: lesson.updatedAt
        }));
    }
}