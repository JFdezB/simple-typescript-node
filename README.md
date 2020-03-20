# Simple TypeScript Node Application

This is a simple application with Hapi, sequelize and PostgreSQL.

## Installation

You need docker and docker-compose to run it or you can install you PostgreSQL database locally and run it.

### Configuration

You have to add a `.env` file on the root of the project, you have to put the next lines inside it:

```
DB_HOST=postgres
DB_USER=postgres
DB_PASS=postgres
DB_DATABASE=postgres
```
The `DB_HOST` field should be setted as `localhost` if you run it without docker-compose.

The `DB_PASS` field must be the same that you set on the `docker-compose.yaml` in the `POSTGRES_PASSWORD` field.


### docker-compose method:

```bash
docker-compose up -d
```

### locally method:

```
npm install
npm run build
npm start
```

## Usage

The server will run on the port 3000 and you will can access to the swagger documentation at [http://localhost:3000/documentation](http://localhost:3000/documentation)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)