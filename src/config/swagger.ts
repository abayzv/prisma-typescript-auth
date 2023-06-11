export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "MAHESADEV BASIC API",
    version: "1.0.0",
    description:
      "MAHESADEV BASIC API adalah API dasar yang digunakan untuk mengelola pengguna, peran (role), dan izin (permission). API ini menyediakan berbagai endpoint yang memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap entitas-entitas utama dalam sistem manajemen ini. Pengguna dapat mendaftar, masuk, mengelola informasi profil, mengatur peran dan izin, serta menjalankan operasi lain yang terkait dengan manajemen pengguna dan akses sistem.",
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
      name: "Roles",
    },
    {
      name: "Permission",
    },
    {
      name: "User",
    },
    {
      name: "Transaction",
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
        tags: ["Roles"],
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
        tags: ["Roles"],
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
    "/api/v1/roles/1": {
      get: {
        tags: ["Roles"],
        summary: "Role Details",
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
    "/api/v1/roles/assign/2": {
      post: {
        tags: ["Roles"],
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
        tags: ["Roles"],
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
    "/api/v1/roles/6": {
      delete: {
        tags: ["Roles"],
        summary: "Delete Role",
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
    "/api/v1/roles/unassign/1": {
      delete: {
        tags: ["Roles"],
        summary: "Delete Role Permission",
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
                  payment_type: "gopay",
                  gross_amount: 2000,
                  order_id: "239922192",
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
    "/api/v1/transactions/{id}": {
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
  },
};
