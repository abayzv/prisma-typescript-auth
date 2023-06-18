export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "PRISMA EXPRESS  API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  tags: [
    {
      name: "Auth",
    },
    {
      name: "Role",
    },
    {
      name: "Permission",
    },
    {
      name: "User",
    },
    {
      name: "Payments",
    },
    {
      name: "Transaction",
    },
    {
      name: "Logs",
    },
    {
      name: "Classroom",
    },
    {
      name: "List",
    },
    {
      name: "Subject",
    },
    {
      name: "Score",
    },
    {
      name: "Score Category",
    },
  ],
  paths: {
    "/api/v1/users/me": {
      get: {
        tags: ["Auth"],
        summary: "Me",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "string",
                  password: "string",
                  name: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "super@admin.com",
                  password: "P@ssw0rd",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  refreshToken: "{{refresh-token}}",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/refreshToken": {
      post: {
        tags: ["Auth"],
        summary: "Refresh Token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  refreshToken: "{{refresh-token}}",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/revokeRefreshTokens": {
      post: {
        tags: ["Auth"],
        summary: "Revoke Refresh Token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  userId: "{{userId}}",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles": {
      get: {
        tags: ["Role"],
        summary: "View All Roles",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "530",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"212-FtmEuPxcc8xR4uq+cJHKvw+xAks"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Tue, 06 Jun 2023 13:16:23 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: 1,
                      name: "superadmin",
                      createdAt: "2023-06-04T11:16:50.887Z",
                      updatedAt: "2023-06-04T11:16:50.887Z",
                    },
                    {
                      id: 2,
                      name: "admin",
                      createdAt: "2023-06-04T11:16:51.024Z",
                      updatedAt: "2023-06-04T11:16:51.024Z",
                    },
                    {
                      id: 3,
                      name: "teacher",
                      createdAt: "2023-06-04T11:16:51.118Z",
                      updatedAt: "2023-06-04T11:16:51.118Z",
                    },
                    {
                      id: 4,
                      name: "student",
                      createdAt: "2023-06-04T11:16:51.212Z",
                      updatedAt: "2023-06-04T11:16:51.212Z",
                    },
                    {
                      id: 5,
                      name: "parent",
                      createdAt: "2023-06-04T11:16:51.306Z",
                      updatedAt: "2023-06-04T11:16:51.306Z",
                    },
                  ],
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Role"],
        summary: "Create Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/{id}": {
      get: {
        tags: ["Role"],
        summary: "Role Details",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Role"],
        summary: "Delete Role",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/assign/{id}": {
      post: {
        tags: ["Role"],
        summary: "Assign Role Permissions",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  permissions: "Array[number]",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "integer",
            },
            required: true,
            example: "2",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/{roleId}": {
      put: {
        tags: ["Role"],
        summary: "Update Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "roleId",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/unassign/{id}": {
      delete: {
        tags: ["Role"],
        summary: "Delete Role Permission",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/permissions": {
      get: {
        tags: ["Permission"],
        summary: "View All Permissions",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "440",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"1b8-7y6IRpzIKV/ZMVH17KDkD4ULqyk"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Tue, 06 Jun 2023 13:14:38 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: 2,
                      name: "View User",
                      createdAt: "2023-06-04T11:16:50.601Z",
                      updatedAt: "2023-06-05T16:10:48.802Z",
                    },
                    {
                      id: 1,
                      name: "Create User",
                      createdAt: "2023-06-04T11:16:50.365Z",
                      updatedAt: "2023-06-05T16:16:25.305Z",
                    },
                    {
                      id: 3,
                      name: "Update User",
                      createdAt: "2023-06-04T11:16:50.696Z",
                      updatedAt: "2023-06-05T16:16:25.305Z",
                    },
                    {
                      id: 4,
                      name: "Delete User",
                      createdAt: "2023-06-04T11:16:50.792Z",
                      updatedAt: "2023-06-05T16:16:25.305Z",
                    },
                  ],
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Permission"],
        summary: "Create Permission",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  action: "string (GET || POST || PUT || DELETE)",
                  menu: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/permissions/5": {
      put: {
        tags: ["Permission"],
        summary: "Update Permission",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  action: "string (GET || POST || PUT || DELETE)",
                  menu: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Permission"],
        summary: "Delete Permission",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/users": {
      get: {
        tags: ["User"],
        summary: "View All Users",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "1174",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"496-EWGxgmbzmgBsGNltSHzfHs006Fw"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Mon, 05 Jun 2023 17:03:37 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "01320016-bb7b-4756-8bb5-db35d4ff504f",
                      role: {
                        name: "student",
                      },
                      email: "tama@gmail.com",
                      profile: {
                        name: "Pertamawati",
                        birthDate: null,
                        address: null,
                        gender: null,
                        religion: "islam",
                        photo: null,
                      },
                      createdAt: "2023-06-04T11:16:53.501Z",
                      updatedAt: "2023-06-05T17:01:49.691Z",
                    },
                    {
                      id: "0494dc61-9150-407b-837c-cf67d87101eb",
                      role: {
                        name: "admin",
                      },
                      email: "admin@admin.com",
                      profile: {
                        name: "Admin",
                        birthDate: null,
                        address: null,
                        gender: null,
                        religion: null,
                        photo: null,
                      },
                      createdAt: "2023-06-04T11:16:52.620Z",
                      updatedAt: "2023-06-04T11:16:52.620Z",
                    },
                    {
                      id: "8578458b-c399-4d2b-86d1-55c8f8ef64a8",
                      role: {
                        name: "superadmin",
                      },
                      email: "super@admin.com",
                      profile: {
                        name: "Super Admin",
                        birthDate: null,
                        address: null,
                        gender: null,
                        religion: null,
                        photo: null,
                      },
                      createdAt: "2023-06-04T11:16:52.074Z",
                      updatedAt: "2023-06-04T11:16:52.074Z",
                    },
                    {
                      id: "a0443bb1-3317-4d69-a781-9d4d99cab21f",
                      role: {
                        name: "teacher",
                      },
                      email: "bayu@gmail.com",
                      profile: {
                        name: "Aji Bayu Nugroho",
                        birthDate: null,
                        address: null,
                        gender: null,
                        religion: null,
                        photo: null,
                      },
                      createdAt: "2023-06-04T11:16:53.024Z",
                      updatedAt: "2023-06-04T11:34:24.548Z",
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["User"],
        summary: "Create User",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "yuzong@gmail.com",
                  password: "P@ssw0rd",
                  confirmPassword: "P@ssw0rd",
                  name: "Yu Zong",
                  birthDate: "2022-05-01",
                  address: "China",
                  gender: "Laki-Laki",
                  religion: "Budha",
                  roleId: 4,
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "38",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"26-fFNOqhIOVDss9Ior8d4xJiKqCds"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Fri, 09 Jun 2023 02:12:50 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "User Created Succesfully",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["User"],
        summary: "View User Detail",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "231",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"e7-JsFbXnzPgJpS3Mq+BgcLGLrMR+w"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Mon, 05 Jun 2023 17:01:33 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: {
                    email: "admin@admin.com",
                    role: "admin",
                    profile: {
                      name: "Admin",
                      birthDate: null,
                      address: null,
                      gender: null,
                      religion: null,
                      photo: null,
                    },
                    createdAt: "2023-06-04T11:16:52.620Z",
                    updatedAt: "2023-06-04T11:16:52.620Z",
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["User"],
        summary: "Update user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  birthDate: "yyyy-mm-dd",
                  address: "string",
                  gender: "string",
                  religion: "string",
                  photo: "string",
                  password: "string",
                  confirmPassword: "string",
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "01320016-bb7b-4756-8bb5-db35d4ff504f",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["User"],
        summary: "Delete User",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/users/role/{id}": {
      put: {
        tags: ["User"],
        summary: "Change User Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  roleID: "number",
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "01320016-bb7b-4756-8bb5-db35d4ff504f",
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "38",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"26-ANBBL0hlcfMwfGfgLvI1e5CaHQk"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Mon, 05 Jun 2023 17:01:49 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Role Changed Succesfully",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/payments": {
      get: {
        tags: ["Payments"],
        summary: "View All Payments",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "388",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"184-qFys6m6TPVhGu5T+KY89uDilMAg"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:52:21 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "0e101cd8-a03b-44dc-8b1a-3f20116343ee",
                      name: "Seragam",
                      type: "registration",
                      amount: 120000,
                      createdAt: "2023-06-17T17:36:35.104Z",
                      updatedAt: "2023-06-17T17:36:35.104Z",
                    },
                    {
                      id: "26e0d158-67f7-4b95-b12f-11a72346a3dd",
                      name: "SPP",
                      type: "semester",
                      amount: 1000000,
                      createdAt: "2023-06-17T15:07:36.965Z",
                      updatedAt: "2023-06-17T15:07:36.965Z",
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Payments"],
        summary: "Create Payment",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  type: "string",
                  amount: "number",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/payments/{id}": {
      get: {
        tags: ["Payments"],
        summary: "View Payment Details",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      put: {
        tags: ["Payments"],
        summary: "Update Payment",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  type: "string",
                  amount: "number",
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "2d374401-1f0b-4df0-86b5-a35dfdcdacd1",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Payments"],
        summary: "Delete Payment",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/transactions": {
      get: {
        tags: ["Transaction"],
        summary: "View All Transaction",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "515",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"203-VkpwHPYxkRBxhinrPuxAE3Oc2Lw"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:52:36 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "096580fb-0a54-4fa6-8d86-7fd80ebbc5fb",
                      referenceNumber: "INV-129142-1647",
                      user: "Pertamawati",
                      total: 1000000,
                      paymentMethod: "qris",
                      status: "pending",
                      createdAt: "2023-06-17T16:47:51.437Z",
                      updatedAt: "2023-06-17T16:47:51.437Z",
                    },
                    {
                      id: "452f8abd-e5b9-4b7b-b213-92860e1fceb9",
                      referenceNumber: "INV-196275-1507",
                      user: "Pertamawati",
                      total: 1000000,
                      paymentMethod: "qris",
                      status: "pending",
                      createdAt: "2023-06-17T15:07:37.912Z",
                      updatedAt: "2023-06-17T15:07:37.912Z",
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/transactions/{id}": {
      get: {
        tags: ["Transaction"],
        summary: "View Transaction Details",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Transaction"],
        summary: "Delete Transaction",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/transactions/add": {
      post: {
        tags: ["Transaction"],
        summary: "Add Transaction",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  payment: [
                    {
                      id: "string",
                      notes: "string",
                    },
                  ],
                  userId: "string",
                  paymentMethodId: "number",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "1033",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"409-mEGyz06jR1qKA0WXah1tYvcDLaU"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Fri, 09 Jun 2023 14:22:05 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Transaction Success",
                  data: {
                    id: "a307dae2-bbba-41e4-832b-9d0bcf9e3ccc",
                    userId: "aa0174ba-9ebf-4685-a0e4-de271fd021d3",
                    paymentMethod: {
                      name: "qris",
                    },
                    status: "pending",
                    details: {
                      status_code: "201",
                      status_message: "QRIS transaction is created",
                      transaction_id: "5284dd2c-2a18-4d9f-9357-0ba45efffed8",
                      order_id: "a307dae2-bbba-41e4-832b-9d0bcf9e3ccc",
                      merchant_id: "G028898782",
                      gross_amount: "1000000.00",
                      currency: "IDR",
                      payment_type: "qris",
                      transaction_time: "2023-06-09 21:22:04",
                      transaction_status: "pending",
                      fraud_status: "accept",
                      actions: [
                        {
                          name: "generate-qr-code",
                          method: "GET",
                          url: "https://api.sandbox.midtrans.com/v2/qris/5284dd2c-2a18-4d9f-9357-0ba45efffed8/qr-code",
                        },
                      ],
                      qr_string:
                        "00020101021226620014COM.GO-JEK.WWW011993600914302889878270210G0288987820303UMI51440014ID.CO.QRIS.WWW0215AID7111686201870303UMI5204352953033605802ID5911Citra Media6006MALANG61056512654101000000.006247503652ffe6e8-ff5f-4df4-b6f2-5a6f36f926f60703A0163047EE4",
                      acquirer: "gopay",
                      expiry_time: "2023-06-09 21:37:04",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/transactions/{id}/status": {
      get: {
        tags: ["Transaction"],
        summary: "Get Status",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "673",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"2a1-S3b0Wpd0n+KJxanpzGIt84B6i/U"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Fri, 09 Jun 2023 16:53:01 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: {
                    transaction_time: "2023-06-09 21:22:04",
                    gross_amount: "1000000.00",
                    currency: "IDR",
                    order_id: "a307dae2-bbba-41e4-832b-9d0bcf9e3ccc",
                    payment_type: "qris",
                    signature_key:
                      "b0fa2baf8f0393bceaf1fc28a47bf880177fff54812b8d8c427548756bf737f8cec4f143d409d49327f1fa02751e0e63e0398052b717c91d465424988bfd1578",
                    status_code: "407",
                    transaction_id: "5284dd2c-2a18-4d9f-9357-0ba45efffed8",
                    transaction_status: "expire",
                    fraud_status: "accept",
                    expiry_time: "2023-06-09 21:37:04",
                    status_message: "Success, transaction is found",
                    merchant_id: "G028898782",
                    acquirer: "gopay",
                    qrCode:
                      "http://localhost:5000/api/v1/transactions/5284dd2c-2a18-4d9f-9357-0ba45efffed8/qrcode",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/transactions/{id}/cancel": {
      post: {
        tags: ["Transaction"],
        summary: "Cancel Transaction",
        requestBody: {
          content: {},
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "396",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"18c-1Al3skb5+pqKo5U4udEcnjAEAiM"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Fri, 09 Jun 2023 14:12:37 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: {
                    status_code: "200",
                    status_message: "Success, transaction is canceled",
                    transaction_id: "07d3779b-60ab-4904-b68b-ca1f3daaf363",
                    order_id: "7e334bb6-e622-4bbe-b103-2b788e834f6b",
                    merchant_id: "G028898782",
                    gross_amount: "1000000.00",
                    currency: "IDR",
                    payment_type: "qris",
                    transaction_time: "2023-06-09 21:10:38",
                    transaction_status: "cancel",
                    fraud_status: "accept",
                    acquirer: "gopay",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/transactions/charge": {
      post: {
        tags: ["Transaction"],
        summary: "Change Payment",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  payment_type: "string",
                  gross_amount: "number",
                  order_id: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/transactions/{id}/qrcode": {
      get: {
        tags: ["Transaction"],
        summary: "Get QR Code (Qris or GOPAY only)",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/logs": {
      get: {
        tags: ["Logs"],
        summary: "Get All Logs",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "2253",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"8cd-7yfmtoKbQ3u8z4b2JS4P5lUttJQ"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:52:45 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "01b8b5b8-d901-4766-889e-8ecb9681189d",
                      action: "Create subject",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Success create subject",
                      createdAt: "2023-06-18T07:28:05.639Z",
                    },
                    {
                      id: "0dbdd044-36a1-4020-9b8c-e00b5026732f",
                      action: "Login",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "User was logged in",
                      createdAt: "2023-06-17T15:15:40.956Z",
                    },
                    {
                      id: "0dd76ec0-63b4-473b-9997-be43837e3401",
                      action: "Create subject",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Success create subject",
                      createdAt: "2023-06-18T07:27:56.934Z",
                    },
                    {
                      id: "10a6deb9-644d-4a8a-85a8-69e8e34ca59b",
                      action: "Login",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "User was logged in",
                      createdAt: "2023-06-18T02:55:24.093Z",
                    },
                    {
                      id: "148d8106-8dbf-43de-a2b4-6d4db027d775",
                      action: "Update Score",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Score Successfully Updated",
                      createdAt: "2023-06-18T09:49:19.865Z",
                    },
                    {
                      id: "221a8111-4647-4b17-ba4a-2fa8486a68b7",
                      action: "Update Score",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Score Successfully Updated",
                      createdAt: "2023-06-18T09:46:31.301Z",
                    },
                    {
                      id: "272f6459-50be-4eb0-bc7a-6b6f61ee3b08",
                      action: "Generate Score",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Socre Successfully Generated",
                      createdAt: "2023-06-18T09:40:56.271Z",
                    },
                    {
                      id: "2908ea63-18a7-4ed6-98ea-f463c86bbe8c",
                      action: "Update Score",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Score Successfully Updated",
                      createdAt: "2023-06-18T09:49:11.886Z",
                    },
                    {
                      id: "3ac271fe-f004-4d86-ad01-9bd715f8a568",
                      action: "Assign student to classroom",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "Success Assign Student",
                      createdAt: "2023-06-18T03:04:33.580Z",
                    },
                    {
                      id: "3f2fbd23-18d8-49bb-a04d-6c365ca7f622",
                      action: "Login",
                      userId: "ebbef2b1-bcec-419d-9f3b-c9b60f65192c",
                      userName: "Super Admin",
                      description: "User was logged in",
                      createdAt: "2023-06-18T07:23:20.092Z",
                    },
                  ],
                  totalPage: "4",
                  page: "1",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/classrooms": {
      get: {
        tags: ["Classroom"],
        summary: "View All Classroom",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "348",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"15c-brqy4NOqy4Zk3FCCWh7IiXvt5Wc"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:53:01 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "6cb3fc06-83ae-4cd7-a5bc-9d5ef82901e8",
                      name: "XII RPL 1",
                      teacerId: "23df16cc-f232-44dc-b870-747b0087da81",
                      teacherName: "Aji Bayu Nugroho",
                      student: 0,
                    },
                    {
                      id: "789efd9c-4d5a-4da6-a74e-54f15ed677aa",
                      name: "XII IPA 2",
                      teacerId: "7b6b9617-4470-44f9-aa88-ac7d25aae1bc",
                      teacherName: "Yu Zong",
                      student: 1,
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Classroom"],
        summary: "Create Classroom",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  teacherId: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/classrooms/{id}": {
      get: {
        tags: ["Classroom"],
        summary: "View CLassroom Details",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      put: {
        tags: ["Classroom"],
        summary: "Update Classrooms",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  teacherId: "string",
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "70503af1-70ab-4b86-bbaf-1c4ecdf6f394",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Classroom"],
        summary: "Delete Classroom",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/classrooms/{id}/assign": {
      post: {
        tags: ["Classroom"],
        summary: "Assign Student",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  studentId: "Array[studentId : string]",
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/list/teachers": {
      get: {
        tags: ["List"],
        summary: "Teacher",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "153",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"99-cL9+ac436kTJWhDwJ9FnP7cg6QA"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:51:32 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: "23df16cc-f232-44dc-b870-747b0087da81",
                      label: "Aji Bayu Nugroho",
                    },
                    {
                      value: "7b6b9617-4470-44f9-aa88-ac7d25aae1bc",
                      label: "Yu Zong",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/list/classrooms": {
      get: {
        tags: ["List"],
        summary: "Clasroom",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "148",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"94-CQ7kTw9suD1rlDM/hjGt1HfJ2Cw"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:51:23 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: "6cb3fc06-83ae-4cd7-a5bc-9d5ef82901e8",
                      label: "XII RPL 1",
                    },
                    {
                      value: "789efd9c-4d5a-4da6-a74e-54f15ed677aa",
                      label: "XII IPA 2",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/list/permissions": {
      get: {
        tags: ["List"],
        summary: "Permission",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "144",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"90-R3V9UcmTuQgOZuaFHIWqDlkHZCw"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:51:15 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: 1,
                      label: "Create User",
                    },
                    {
                      value: 2,
                      label: "View User",
                    },
                    {
                      value: 3,
                      label: "Update User",
                    },
                    {
                      value: 4,
                      label: "Delete User",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/list/roles": {
      get: {
        tags: ["List"],
        summary: "Role",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "160",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"a0-pOIBVy6u24zfXx7gJgfvowxJbsw"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:51:07 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: 1,
                      label: "superadmin",
                    },
                    {
                      value: 2,
                      label: "admin",
                    },
                    {
                      value: 3,
                      label: "teacher",
                    },
                    {
                      value: 4,
                      label: "student",
                    },
                    {
                      value: 5,
                      label: "parent",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/list/subjects": {
      get: {
        tags: ["List"],
        summary: "Subject",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "286",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"11e-Cp3uOTdtCV2wNorCi0+l2YWoG0Y"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:51:03 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: "e8a512b2-737d-444e-a7a3-5e48c63f6764",
                      label: "Bahasa Indonesia",
                    },
                    {
                      value: "452c2c52-6eba-4e98-a99e-96e603aea479",
                      label: "Geografi",
                    },
                    {
                      value: "13fb0d25-cc9e-4962-a482-5900b8a59398",
                      label: "Agama",
                    },
                    {
                      value: "35b63701-d30d-4978-a483-1cefd4538c23",
                      label: "Biologi",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/list/score-categories": {
      get: {
        tags: ["List"],
        summary: "Score Category",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "167",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"a7-UVqKrmAR66wdQNhWDAzv3v3oRb0"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:50:52 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      value: "319bc736-b6ad-4850-898d-38f150978758",
                      label: "Ulangan Harian",
                    },
                    {
                      value: "ebf6870c-cf83-420a-9c7f-8d8967b56ccc",
                      label: "Ulangan Tengah Semester",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/subjects": {
      get: {
        tags: ["Subject"],
        summary: "View All Subject",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "389",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"185-XYECRR1NtUqX8ijtoFz8Bosu6kE"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:53:09 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "13fb0d25-cc9e-4962-a482-5900b8a59398",
                      name: "Agama",
                      teacher: [],
                    },
                    {
                      id: "35b63701-d30d-4978-a483-1cefd4538c23",
                      name: "Biologi",
                      teacher: [],
                    },
                    {
                      id: "452c2c52-6eba-4e98-a99e-96e603aea479",
                      name: "Geografi",
                      teacher: [],
                    },
                    {
                      id: "e8a512b2-737d-444e-a7a3-5e48c63f6764",
                      name: "Bahasa Indonesia",
                      teacher: [
                        {
                          name: "Aji Bayu Nugroho",
                          photo: null,
                        },
                      ],
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Subject"],
        summary: "Create Subject",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "Geografi",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/subjects/{id}": {
      get: {
        tags: ["Subject"],
        summary: "View Subject Details",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      put: {
        tags: ["Subject"],
        summary: "Update Subject",
        requestBody: {
          content: {},
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Subject"],
        summary: "Delete Subject",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/scores/generate": {
      post: {
        tags: ["Score"],
        summary: "Create Score List",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  subjectId: "Array(string)",
                  classId: "string",
                  scoreCategoryId: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "32",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"20-/qeYH99m5oBEldc+hGUWa7GGFYo"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 09:17:30 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Score list created",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/scores": {
      put: {
        tags: ["Score"],
        summary: "Update Student Score",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  userId: "string",
                  subjectId: "Array(string)",
                  scoreCategoryId: "string",
                  score: "number",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "46",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"2e-vM8Mn8ljIS7ZMRW5ZBcp73I83Zs"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 09:37:22 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Score updated",
                  data: {
                    count: 1,
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Score"],
        summary: "Delete Score",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/score-categories": {
      get: {
        tags: ["Score Category"],
        summary: "View All Score Categories",
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "264",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"108-btIxayYprSSLMyVV2bP5ngJHhs4"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 11:48:22 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  data: [
                    {
                      id: "319bc736-b6ad-4850-898d-38f150978758",
                      name: "Ulangan Harian",
                      createdAt: "2023-06-17T15:07:37.457Z",
                    },
                    {
                      id: "ebf6870c-cf83-420a-9c7f-8d8967b56ccc",
                      name: "Ulangan Tengah Semester",
                      createdAt: "2023-06-18T09:12:07.142Z",
                    },
                  ],
                  totalPage: "1",
                  page: "1",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Score Category"],
        summary: "Create Score Category",
        requestBody: {
          content: {},
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "206",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"ce-QEHEz0Xgss+4bXxxy1iv/72WypQ"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 12:00:48 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Score category created successfully",
                  data: {
                    id: "1e2ea7cf-880b-49c9-b402-883c105695da",
                    name: "Ulangan Semester",
                    createdAt: "2023-06-18T12:00:48.075Z",
                    updatedAt: "2023-06-18T12:00:48.075Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/score-categories/{id}": {
      put: {
        tags: ["Score Category"],
        summary: "Update Score Category",
        requestBody: {
          content: {},
        },
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "OK",
            headers: {
              "Content-Security-Policy": {
                schema: {
                  type: "string",
                  example:
                    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
                },
              },
              "Cross-Origin-Embedder-Policy": {
                schema: {
                  type: "string",
                  example: "require-corp",
                },
              },
              "Cross-Origin-Opener-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "Cross-Origin-Resource-Policy": {
                schema: {
                  type: "string",
                  example: "same-origin",
                },
              },
              "X-DNS-Prefetch-Control": {
                schema: {
                  type: "string",
                  example: "off",
                },
              },
              "X-Frame-Options": {
                schema: {
                  type: "string",
                  example: "SAMEORIGIN",
                },
              },
              "Strict-Transport-Security": {
                schema: {
                  type: "string",
                  example: "max-age=15552000; includeSubDomains",
                },
              },
              "X-Download-Options": {
                schema: {
                  type: "string",
                  example: "noopen",
                },
              },
              "X-Content-Type-Options": {
                schema: {
                  type: "string",
                  example: "nosniff",
                },
              },
              "Origin-Agent-Cluster": {
                schema: {
                  type: "string",
                  example: "?1",
                },
              },
              "X-Permitted-Cross-Domain-Policies": {
                schema: {
                  type: "string",
                  example: "none",
                },
              },
              "Referrer-Policy": {
                schema: {
                  type: "string",
                  example: "no-referrer",
                },
              },
              "X-XSS-Protection": {
                schema: {
                  type: "integer",
                  example: "0",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "*",
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example: "application/json; charset=utf-8",
                },
              },
              "Content-Length": {
                schema: {
                  type: "integer",
                  example: "209",
                },
              },
              ETag: {
                schema: {
                  type: "string",
                  example: 'W/"d1-H+XO+PVcXsqzdjdsKsN3dd/wIsg"',
                },
              },
              Date: {
                schema: {
                  type: "string",
                  example: "Sun, 18 Jun 2023 12:05:42 GMT",
                },
              },
              Connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "Keep-Alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
                example: {
                  message: "Score category updated successfully",
                  data: {
                    id: "1e2ea7cf-880b-49c9-b402-883c105695da",
                    name: "Ulangan Ulang Tahun",
                    createdAt: "2023-06-18T12:00:48.075Z",
                    updatedAt: "2023-06-18T12:05:42.194Z",
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Score Category"],
        summary: "Delete Score Category",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
  },
};
