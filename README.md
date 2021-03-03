# Back-End-t

## Overview
A node backend for the Lambda School Anywhere Fitness build week project built by Tara.

## Base URL
https://af-backend-t.herokuapp.com/

## Auth Endpoints
Method | Endpoint | Requires | Returns
--- | --- | --- | ---
POST | /api/auth/register | email, username, password, role | Newly created user with auto-generated userId
POST | /api/auth/login | username, password | Logged in user data and JWT token for authorization