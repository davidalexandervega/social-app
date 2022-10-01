# social infinity

A social media web application initially designed as a tool for experimenting with ideas around user interaction. It also serves as a portfolio-style demonstration.

This project was created using React, Redux, Django, and PostgreSQL.

## Features

Users can:
• register, login
• set profile pictures, banners, bio
• change their username or password
• create posts and attach images
• like and reply to posts and replies
• follow each other
• check and interact with their notifications

## Setup

Requirements:
• Node.js v16.16.0
• npm v8.15.1^
• Python v3.10.5
• pip 22.0.4^
• PostgreSQL 14.4^

In order to run this application, fork this repository and then in `api/`, run:

```
pip install -r requirements.txt
```

In `client/`, run:

```
npm install
```

An `.env` file is required in `api/api` with the following parameters:

```
SECRET_KEY=*a chosen secret key*
DB_HOST=*the database hostname*
DB_PORT=*the database port*
DB_NAME=*the name of the database*
DB_USER=*the database username*
DB_PASSWORD=*the database password*
```

The project uses Cloudinary as an image host. Another `.env` file is therefore required in `api/app` with the following parameter:

```
CLOUDINARY_URL=*the cloudinary library connection URL*
```

## Commands

To start the API locally on port 8000, in `api/`, run:

```
python manage.py runserver
```

To run the client locally on port 3000, in `client/`, run:

```
npm start
```
