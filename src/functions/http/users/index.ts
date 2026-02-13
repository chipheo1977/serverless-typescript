export default {
  // CREATE USER
  createUser: {
    handler: 'src/functions/http/users/create.handler',
    events: [
      {
        http: {
          path: 'users',
          method: 'post',
          cors: true,
        },
      },
    ],
  },
    // GET USER BY ID
  getUserById: {
    handler: 'src/functions/http/users/getById.handler',
    events: [
      {
        http: {
          path: 'users/{id}',
          method: 'get',
          cors: true,
        },
      },
    ],
  },
  // LIST USERS
  listUsers: {
    handler: 'src/functions/http/users/list.handler',
    events: [
      {
        http: {
          path: 'users',
          method: 'get',
          cors: true,
        },
      },
    ],
  },
  // UPDATE USER
  updateUser: {
    handler: 'src/functions/http/users/update.handler',
    events: [
      {
        http: {
          path: 'users/{id}',
          method: 'put',
          cors: true,
        },
      },
    ],
  },
  // DELETE USER
  deleteUser: {
    handler: 'src/functions/http/users/delete.handler',
    events: [
      {
        http: {
          path: 'users/{id}',
          method: 'delete',
          cors: true,
        },
      },
    ],
  },
}
