## Full Stack Boilerplate

#### Tech Stack

- React
- Chakra UI
- Node & Express
- Knex.js
- PostgreSQL

### Requirement

Please add a config.env at the top level of the folder next to server.js and provide the following info:

<code>NODE_ENV=</code>
<code>PORT=</code>

<code>LOCAL_DB_CLIENT=</code>
<code>LOCAL_DB_HOST=</code>
<code>LOCAL_DB_NAME=</code>
<code>LOCAL_DB_USERNAME=</code>
<code>LOCAL_DB_PASSWORD=</code>

<code>STAGE_DB_CLIENT=</code>
<code>STAGE_DATABASE_URL=</code>

<code>PROD_DB_CLIENT=</code>
<code>PROD_DATABASE_URL=</code>

<code>JWT_EXPIRES_IN=</code>
<code>JWT_SECRET=</code>

---

In the client folder, please add .env.local next to src folder

<code>REACT_APP_BASE_URL=http://localhost:5000/api/v1</code>
