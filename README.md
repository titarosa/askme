AskME 

Welcome to AskME. This is a random Q&A full-stack web application allows users to post questions and answers on a dashboard. All questions and answers are anonymous and can be liked or disliked by other users. 

## Features
* Ask any question!
* Like and Dislike questions.
* Comment on & answer questions. 

## Connecting to the PostgreSQL Database
To connect to the PostgreSQL database for this project, follow these steps:
- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.
- You will need access to the Render account where the PostgreSQL database is hosted.

### Step 1: Clone the Repository

Clone the repository to your local machine:

git clone <repository-url>
cd <repository-directory>

### Step 2: Set Up Your Environment

Create a .env File:

In the root of the project directory, create a file named .env.

Fill out the .env file:

DB_NAME=askme_db
DB_USER=<your_username>
DB_PASSWORD=<your_password>
DATABASE_URL=postgres://<username>:<password>@<hostname>:<port>/<databasename>

### Accessing Database Credentials

To connect to the PostgreSQL database, you will need the following credentials:
- Hostname
- Port (default is `5432`)
- Database Name
- Username
- Password

If you do not have access to the Render account, please contact a team member to obtain these credentials securely.

## License
This project is licensed under the MIT License
