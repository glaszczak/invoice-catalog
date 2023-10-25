# Invoice Catalog Service

This application is designed as a catalog to manage invoices, built using the NestJS framework.

## Features

### HTTP Service

- **/health** Endpoint: Monitors the application's health status and availability. It also provides the connection state to the AMQP broker and the count of emitted events.
  
- **/invoices** Endpoint: Returns a list of invoices in JSON format.
  
- **/invoice** Endpoint: Allows for adding or removing invoices from the service. 

- **Data Validation**: Proper validation checks are implemented for individual invoice fields.

### AMQP Communication

- **RabbitMQ Events**: The service emits an event to a RabbitMQ queue whenever a new invoice is added or removed.

## Installation and Setup

At the root of the project create a `.env` file based on `.env.example` and adjust the variables.

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up
```

## Testing 

```
# check application and RabbitMQ status
curl http://localhost:3000/health | jq

# get all invoices
curl http://localhost:3000/invoices | jq

# create an invoice
curl -X POST -H "Content-Type: application/json" -d '{"purchaseDate":"2023-10-17","supplier":"Testing Supplier","customer":"Testing Customer","products":["Testing Product 1","Testing Product 2"],"netPrice":100,"tax":23}' localhost:3000/invoice | jq

# delete single invoice
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/invoice/[INVOICE_ID] | jq
```

RabbitMQ management:
http://localhost:15672/