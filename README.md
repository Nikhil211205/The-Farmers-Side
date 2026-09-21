# The Farmers Side

A premium organic wellness e-commerce platform built with React, Vite, Express, Node.js, and MongoDB.

## Project structure

- client/: Vite + React frontend
- server/: Express + MongoDB backend API

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment variables

Copy the sample values and fill in real credentials.

## MongoDB setup

- Install MongoDB locally or use MongoDB Atlas
- Set MONGODB_URI in server/.env

## Razorpay setup

- Create a Razorpay account
- Add key_id and key_secret in server/.env

## Admin user setup

Create a user with the role `admin` in MongoDB or seed via Mongo shell.

## Notes

This is a production-style starter with a premium lifestyle storefront, secure API structure, and reusable frontend architecture. Replace placeholder contact and brand data with real details before launch.
