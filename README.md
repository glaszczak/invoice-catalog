# Invoice Catalog Service

This application is designed as a catalog to manage invoices, built using the NestJS framework.

## Features

### HTTP Service

- **/health** Endpoint: Monitors the application's health status and availability. It also provides the connection state to the AMQP broker and the count of emitted events.
  
- **/invoices** Endpoint: Returns a list of invoices in JSON format.
  
- **/invoice** Endpoint: Allows for adding, updating or removing invoices from the service. 

- **Data Validation**: Proper validation checks are implemented for individual invoice fields.

### AMQP Communication

- **RabbitMQ Events**: The service emits an event to a RabbitMQ queue whenever a new invoice is added, updated or removed.

### Database Communication

MongoDB Storage: All invoices are stored, retrieved, updated, and removed from a MongoDB database.

## Installation and Setup

At the root of the project create a `.env` file based on `.env.example` and adjust the variables.

```bash
$ npm install
```

## Development

```bash
# start services within docker containers
$ docker-compose up --build -V

# start the application on the local machine
$ npm run start:dev

# stop services
$ docker-compose down -v
```

RabbitMQ management platform:
http://localhost:15672/

## Testing 

```
# check application and RabbitMQ status
curl http://localhost:3000/health | jq

# get all invoices
curl http://localhost:3000/invoices | jq

# get single invoice
curl -X GET -H "Content-Type: application/json" http://localhost:3000/invoice/[INVOICE_ID] | jq

# create an invoice
curl -X POST -H "Content-Type: application/json" -d '{"purchaseDate":"2023-10-17","supplier":"Testing Supplier","customer":"Testing Customer","products":["Testing Product 1","Testing Product 2"],"netPrice":100,"tax":23}' localhost:3000/invoice | jq

# delete single invoice
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/invoice/[INVOICE_ID] | jq

# update single invoice
curl -X PATCH -H "Content-Type: application/json" -d '{[FIELD_TO_UPDATE]:[VALUE_TO_UPDATE]}' http://localhost:3000/invoice/[INVOICE_ID] | jq

```
