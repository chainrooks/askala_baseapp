import fs from 'fs';
import { execSync } from 'child_process';

class MotokoDeployment {
    constructor() {
        this.metadataFile = 'deployment/lesson-metadata.json';
        this.canisterName = 'backend';
        this.network = process.env.DFX_NETWORK || 'local';
    }

    // 🎯 INI BAGIAN UTAMA UNTUK CALL KE ICP MOTOKO
    async deployMetadata() {
        console.log('🚀 Deploying metadata to ICP Motoko backend...');

        const metadata = JSON.parse(fs.readFileSync(this.metadataFile, 'utf8'));

        // Convert to Motoko format
        const motokoData = this.convertToMotokoFormat(metadata.lessons);
        
        // console.log(`📋 Deploying ${motokoData.length} lessons to canister: ${this.canisterName}`);
        console.log(`📋 Deploying ${metadata.lessons.length} lessons to canister: ${this.canisterName}`);

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
        const motokoRecords = lessons.map(lesson => this.formatLessonForMotoko(lesson));

        const candidArg = `vec {${motokoRecords.join('; ')}}`;

        // DFX command untuk call function di Motoko
        const command = [
            'dfx', 'canister', 'call',
            '--network', this.network,
            this.canisterName,
            'bulkUpdateOrCreateLessonMetadata',
            `'(${candidArg})'`
        ].join(' ');

        // console.log('🔧 Executing:', command);
        execSync(command, { stdio: 'inherit' });
    }

    // 🎯 METHOD 2: Update lessons satu per satu
    async individualUpdateLessons(lessons) {
        console.log('📡 Updating lessons individually...');

        for (const lesson of lessons) {
            const motokoFormatted = this.formatLessonForMotoko(lesson);

            // // DFX command untuk update individual lesson
            const command = [
                'dfx', 'canister', 'call',
                '--network', this.network,
                this.canisterName,
                'updateOrCreateLessonMetadata',
                `'${motokoFormatted}'`
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

    formatLessonForMotoko(lesson) {
        return `(record {
        slug = "${lesson.slug}";
        title = "${lesson.title}";
        code = "${lesson.code}";
        description = "${lesson.description}";
        contentHash = "${lesson.contentHash}";
        version = "${lesson.version}";
        createdAt = "${lesson.createdAt}";
        updatedAt = "${lesson.updatedAt}";
        })`;
    }

    formatBulkLessonForMotoko(lesson) {
            return `record {
            slug = "${lesson.slug}";
            title = "${lesson.title}";
            code = "${lesson.code}";
            description = "${lesson.description}";
            contentHash = "${lesson.contentHash}";
            version = "${lesson.version}";
            createdAt = "${lesson.createdAt}";
            updatedAt = "${lesson.updatedAt}";
        }`;
    }

    // Convert JavaScript metadata to Motoko format
    convertToMotokoFormat(lessons) {
        return lessons.map(lesson => ({            
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            code : lesson.code,
            contentHash: lesson.contentHash,
            version: lesson.version,
            createdAt: lesson.createdAt,
            updatedAt: lesson.updatedAt
        }));
    }
}

// ===== Entry Point =====
(async () => {
    try {
        const motokoDeployment = new MotokoDeployment();
        motokoDeployment.deployMetadata();
        console.log('🔧 Deployment ...');
    } catch (error) {
        console.error('🚨 Error:', error.message);
    }
})();