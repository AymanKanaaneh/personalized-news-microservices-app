# Personalized News Update Aggregator

This project implements a microservice-based application designed to aggregate news and technology updates tailored to user preferences. It leverages AI to identify the most interesting articles and delivers them via user email address.

## Technologies Used

Microservices Architecture: The application is built as a collection of independent, loosely coupled services for scalability and maintainability.

- Dapr: An event-driven, portable runtime for building microservices.
- Docker: A platform used to containerize and manage the microservices.
- RabbitMQ: A message broker for the communication between the microservices.
- MongoDB & Mongoose:  For user data storage and management.
- Express: For build the RESTful API services.
- Joi: For defining schemas and validating data.
- Winston: For logging and managing log messages.
- google generative-ai: For AI API generating news content.
- Nodemailer: for sending emails and making REST requests against IMAP and SMTP servers..
- Swagger: For documenting and visualizing APIs in the microservices application.

## Running the Application

Prerequisites:

Docker and Docker Compose (https://docs.docker.com/)
WSL (for Windows) (https://learn.microsoft.com/en-us/windows/wsl/)
A code editor or IDE of your choice
Clone the Repository:

git clone https://github.com/AymanKanaaneh/zionet-personalized-news-microservices-app.git
Use code with caution.

Build and Start Services:

Navigate to the project directory:

cd zionet-personalized-news-microservices-app

Run the Docker Compose setup to start the services and their Dapr sidecars:

docker-compose up -d


This command builds Docker images for each service and starts them in detached mode (background).

## Architecture:
- User Manager Service: Processes POST and PUT requests for user registration, preference updates, and sends emails pushes to the RabbitMQ queue via Dapr.
- News Aggregation engine service: Receives POST requests and retrieves email queue messages from RabbitMQ. It fetches user preferences from the User Accessor service, generates news using an AI API, and sends news emails using the nodemailer library.
- User Accessor Service: Performs actions on MongoDB, registers users, retreive preferences and update it. 
- RabbitMQ: Used as the messaging system for the exchange of requests between the User Manager and News Aggregation engine services.
- Dapr: Handles the communication between the User Manager, User Accessor, News Aggregation engine services and the RabbitMQ queue.
- MongoDB: The database used to store and retrieve users and their prefernces entries.

## Usage:
The User Manager service exposes the following endpoints on http://user-manager:3000
- `POST /user/register`: Register a new user
- `POST /user/news/emailsqueue/:emailAddress`: Sends emails addresses pushes to the RabbitMQ queue via Dapr.
- `PUT /user/prefernces`: Interact with the User Accessor service to update preferences. Include preference and email data in JSON format within the request body."

# Testing

## Using Swagger UI

### Access Swagger UI

Open the URLs for each service's Swagger documentation in separate browser tabs:
- **User Manager Service**: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)
- **User Accessor Service**: [http://localhost:3100/api-docs/](http://localhost:3100/api-docs/)
- **News Aggregation Engine Service**: [http://localhost:3200/api-docs/](http://localhost:3200/api-docs/)

### Explore Endpoints

Each Swagger UI instance will display a list of available API endpoints for the corresponding service. Click on an 

### Send Test Requests

In the "Try it out" section below each endpoint, you can directly enter test data for parameters and the request body (if required). Click the "Execute" button to send a test request to the service. Swagger UI will display the server's response, including status code, headers, and response body.

### Verifying Responses

Carefully examine the response code to ensure it aligns with the expected outcome (e.g., 200 for success, 400 for bad request). Compare the response body with the specified schema to verify that the data is returned in the correct format and structure.

![Personalized News Update Aggregator Diagram](https://github.com/user-attachments/assets/f438523d-a701-4082-967b-9f8b04b393b4)

