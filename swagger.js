// swagger.js
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Technical Test Mustika API',
      version: '1.0.0',
      description: 'A simple documentation for Technical Test Mustika API',
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            password: {
              type: 'string',
              description: 'The hashed password of the user',
            },
          },
          example: {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password:
              '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36TstbIFkWglsA2F/5.uHUu',
          },
        },
        Order: {
          type: 'object',
          required: ['product', 'price', 'qty', 'user_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the order',
            },
            product: {
              type: 'string',
              description: 'The name of the product',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'The price of the product',
            },
            qty: {
              type: 'integer',
              description: 'The quantity of the product',
            },
            total: {
              type: 'number',
              format: 'float',
              description: 'The total price for the quantity of the product',
            },
            user_id: {
              type: 'integer',
              description: 'The id of the user who placed the order',
            },
          },
          example: {
            id: 1,
            product: 'Laptop',
            price: 999.99,
            qty: 2,
            total: 1999.98,
            user_id: 1,
          },
        },
      },
    },
    paths: {
      '/api/v1/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'John Doe',
                    },
                    email: {
                      type: 'string',
                      example: 'johndoe@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'password123',
                    },
                  },
                  required: ['name', 'email', 'password'],
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User registered successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'johndoe@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'password123',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        type: 'object',
                        properties: {
                          user: {
                            $ref: '#/components/schemas/User',
                          },
                          token: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid password',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/users': {
        get: {
          tags: ['User'],
          summary: 'Get all users',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'q',
              in: 'query',
              description: 'The search query',
              schema: {
                type: 'string',
                default: '',
              },
            },
            {
              name: 'take',
              in: 'query',
              description: 'The number of users to return',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
            {
              name: 'skip',
              in: 'query',
              description: 'The number of users to skip',
              schema: {
                type: 'integer',
                default: 0,
              },
            },
          ],
          responses: {
            200: {
              description: 'Get all users successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['User'],
          summary: 'Store a new user',
          security: [
            {
              Authorization: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User stored successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/users/{id}': {
        get: {
          tags: ['User'],
          summary: 'Get a user by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the user',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'Get user by id successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['User'],
          summary: 'Update a user by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the user',
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'User updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['User'],
          summary: 'Delete a user by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the user',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'User deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/orders': {
        get: {
          tags: ['Order'],
          summary: 'Get all orders',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'q',
              in: 'query',
              description: 'The search query',
              schema: {
                type: 'string',
                default: '',
              },
            },
            {
              name: 'take',
              in: 'query',
              description: 'The number of orders to return',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
            {
              name: 'skip',
              in: 'query',
              description: 'The number of orders to skip',
              schema: {
                type: 'integer',
                default: 0,
              },
            },
          ],
          responses: {
            200: {
              description: 'Get all orders successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Order',
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Order'],
          summary: 'Store a new order',
          security: [
            {
              Authorization: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Order stored successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/Order',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/orders/{id}': {
        get: {
          tags: ['Order'],
          summary: 'Get an order by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the order',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'Get order by id successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/Order',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Order not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Order'],
          summary: 'Update an order by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the order',
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Order updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      data: {
                        $ref: '#/components/schemas/Order',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Order not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            422: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                      errors: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            msg: {
                              type: 'string',
                            },
                            param: {
                              type: 'string',
                            },
                            location: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Order'],
          summary: 'Delete an order by id',
          security: [
            {
              Authorization: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'The id of the order',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            200: {
              description: 'Order deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Order not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
}

const specs = swaggerJsdoc(options)

module.exports = {
  specs,
  swaggerUi,
}
