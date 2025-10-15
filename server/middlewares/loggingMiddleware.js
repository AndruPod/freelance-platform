

export const logger = (req, res, next) => {

    if (req.url === '/graphql') {

        const { operationName } = req.body;

        const start = Date.now();

        console.log('\n🔹 [GraphQL REQUEST]');
        console.log('Operation:', operationName || 'Unnamed');

        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`✅ Completed in ${duration}ms | Status: ${res.statusCode}`);
        });

    }

    next();

}