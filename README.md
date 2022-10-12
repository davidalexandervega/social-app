# social infinity

A social media web application initially designed as a tool for experimenting with ideas around user interaction. It also serves as a portfolio-style demonstration.

This project was created using React, Redux, Express, and PostgreSQL, with Cloudinary as a file host.

[live site](https://social-infinity.herokuapp.com/)

## Features

Users can:

- Register, login
- Set profile pictures, banners, bio
- Change their username or password
- Create posts and attach images
- Like and reply to posts and replies
- Follow each other
- Check and interact with their notifications

## Setup

Requirements:

- Node.js v16.16.0
- npm v8.15.1^
- PostgreSQL 14.4^

In order to run this application, fork this repository and then in both `client/` and `api/`, run:

```
npm install
```

An `.env` file is required in `api/` with the following parameters:

```
NODE_ENV=*either development or production*
PORT=*port for local hosting*
SECRET_KEY=*a chosen secret key to sign jwt with*
CLOUDINARY_CLOUD_NAME=*the cloudinary library name*
CLOUDINARY_API_KEY=*the cloudinary API key*
CLOUDINARY_API_SECRET=*the cloudinary API secret*
CLOUDINARY_URL=*the cloudinary library connection URL*
DB_CONNECTION_URI=*the postgres database connection URI*
```

## Commands

To run this application locally, ensure `NODE_ENV` is set to development. In `api/`,run:

```
npm run dev
```

In `client/`, run:

```
npm run start
```

The API and client servers run on ports 4000 and 3000, respectively.
