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
```

## Initializing Data Base

To create a user admin, follow these query:
```
INSERT INTO user(email, last_name, name, nid, password, role, username) 
VALUES("admin@example.com", "", "Admin", "105454449", "$2a$10$EWHE8s6qdqQe/70bXmxb4OkQOCux.Cn.56ot/C63lQhlsfBuSAQf2", "ADMIN", "admin");
```
This will create a admin user 
<br>
**Username**: admin
<br>
**Password**: admin123 

## Initializing  React

To initialize the React frontend for the CUE Schedule Management System, follow these steps:

1. Clone this repository.
2. Open a terminal and navigate to the project's root directory.
3. Navigate to the frontend directory: `cd frontend`.
4. Install the required dependencies by running: `npm install`.

Make sure you have npm installed on your system before running the `npm install` command. If you don't have npm installed, please refer to the official npm documentation for instructions on how to install it.

After completing these steps, you can proceed with the "Getting Started" section to run the CUE Schedule Management System.

## Getting Started
To run the CUE Schedule Management System, follow these steps:

Clone this repository.
Open a terminal and navigate to the project's root directory.
Start the Spring backend application:
Build and run the backend module using your preferred IDE.
Once the backend application is running, open your web browser and type http://localhost:3000/login to access the login page.
Use the following credentials to log in as an admin user:
Username: admin
Password: [password you set for the admin user during database initialization]
After logging in, you will have access to the admin dashboard, where you can start creating students and professors, manage courses, and generate schedules.
Note: Make sure to replace [password you set for the admin user during database initialization] with the actual password you set for the admin user when running the database initialization query.

Feel free to explore the application and start managing schedules efficiently!
