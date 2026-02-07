import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Due or die | API',
            version: '1.0.0',
            description:
                'Documentação da API do To-do-list Due or Die com Swagger, utilizando as tecnologias Express, TypeScript e Firestore (Firebase)',
        },
        servers: [
            {
                url:
                    process.env.ENVIRONMENT === 'production'
                        ? process.env.RENDER_EXTERNAL_URL ||
                          'https://seu-app.onrender.com'
                        : 'http://localhost:8080',
            },
        ],
        components: {
            schemas: {
                // Users
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '123' },
                        name: { type: 'string', example: 'Talyslan' },
                        email: {
                            type: 'string',
                            example: 'talyslan@email.com',
                        },
                    },
                },
                CreateUserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: { type: 'string', example: 'Talyslan' },
                        email: {
                            type: 'string',
                            example: 'talyslan@email.com',
                        },
                    },
                },
                UpdateUserInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Novo Nome' },
                        email: { type: 'string', example: 'novo@email.com' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
