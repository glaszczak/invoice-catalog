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

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up
```
