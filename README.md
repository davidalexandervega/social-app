# social infinity

A social media web application initially designed as a tool for experimenting with ideas around user interaction. It also serves as a portfolio-style demonstration.

This project was created using React, Redux, Express, and PostgreSQL, with Cloudinary as a file host.

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
• PostgreSQL 14.4^

In order to run this application, fork this repository and then in both `client/` and `api/`, run:

```
npm install
```

An `.env` file is required in `api/` with the following parameters:

```
NODE_ENV=*either development or production*
PORT=*port for local hosting*
SECRET_KEY=*a chosen secret key to sign jwt with*
DB_HOST=*the database hostname*
DB_PORT=*the database port*
DB_NAME=*the name of the database*
DB_USER=*the database username*
DB_PASSWORD=*the database password*
CLOUDINARY_URL=*the cloudinary library connection URL*
```

## Commands

To run this application's API and client locally on ports 4000 and 3000 respectively, run:

```
npm run dev
npm run start
```
