# CUE Schedule Management System

The CUE Schedule Management System is an innovative project designed to streamline the scheduling process and enhance organization . This web-based platform leverages a algorithms to create schedules automatically and user-friendly interfaces to provide comprehensive scheduling capabilities for students, professors, and administrators.

The CUE Schedule Management System is a web-based application developed using Spring, React, and MySQL. It provides comprehensive scheduling capabilities for academic institutions, allowing students, faculty, and administrators to manage and generate schedules efficiently.

## Technologies Used

- Spring (Backend framework)
- React (Frontend framework)
- MySQL (Database)

## Database Configuration

To configure the database for the CUE Schedule Management System, follow these steps:

1. Create a database named `proyecto_nuclear`.
2. Open the `application.properties` file in the backend module.
3. Set the following database connection properties:

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/proyecto_nuclear
spring.datasource.username=root
spring.datasource.password=admin123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
