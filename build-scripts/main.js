async function main() {
    const generator = new ContentHashGenerator();
    const deployer = new MotokoDeployment();

    try {
        // Generate content registry and metadata
        const { contentRegistry } = await generator.generateContentRegistry();

        // Validate content integrity
        generator.validateContentIntegrity(contentRegistry);

        // Deploy to Motoko backend
        await deployer.deployMetadata();

        // Verify deployment
        const verified = await deployer.verifyDeployment();

        if (verified) {
            console.log('🎉 Deployment completed successfully!');
        } else {
            throw new Error('Deployment verification failed');
        }

    } catch (error) {
        console.error('❌ Build/Deploy failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { ContentHashGenerator, MotokoDeployment };