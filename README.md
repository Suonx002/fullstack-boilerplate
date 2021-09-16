## Full Stack Boilerplate

#### Tech Stack

- React
- Chakra UI
- Node & Express
- Knex.js
- PostgreSQL

### Features

- Authenications with JSON Web Token for features such as register, login, forgot password, and reset password
- Authorization access with public/private for both client & backend
- State management are handle with Redux and redux persist
- Password are encrypted with bcrypt
- Mailgun for sending emails

### Requirement

Please add a configs.env at the top level of the folder next to server.js and provide the following info:

```
NODE_ENV=
PORT=

LOCAL_DB_CLIENT=
LOCAL_DB_HOST=
LOCAL_DB_NAME=
LOCAL_DB_USERNAME=
LOCAL_DB_PASSWORD=

STAGE_DB_CLIENT=
STAGE_DATABASE_URL=

PROD_DB_CLIENT=
PROD_DATABASE_URL=

JWT_EXPIRES_IN=
JWT_SECRET=


CLIENT_URL=
COMPANY_NAME=
COMPANY_EMAIL=

```

---

In the client folder, please add .env.local next to src folder

```
REACT_APP_BASE_URL=http://localhost:5000/api/v1
```
