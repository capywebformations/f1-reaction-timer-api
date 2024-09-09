import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'F1 Reaction Timer API',
      version: '1.0.0',
      description: 'API documentation for the F1 Reaction Timer project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: "User's email address",
            },
            password: {
              type: 'string',
              description: "User's password",
            },
            role: {
              type: 'boolean',
              description: 'User role (false = admin, true = user)',
            },
          },
          required: ['email', 'password'],
        },
        Timer: {
          type: 'object',
          properties: {
            user_id: {
              type: 'string',
              description: 'ID of the user who submitted the reaction time',
            },
            time: {
              type: 'number',
              description: 'Reaction time in milliseconds',
            },
          },
          required: ['user_id', 'time'],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // console.log('Swagger docs available at /api-docs');
};
