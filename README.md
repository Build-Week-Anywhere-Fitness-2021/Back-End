# Back-End

## Overview
A node backend for the Lambda School Anywhere Fitness build week project built by one of two Unit 4 students.

## Base URL
https://af-backend-t.herokuapp.com/

## Auth Endpoints
Method | Endpoint | Requires | Returns
--- | --- | --- | ---
POST | /api/auth/register | name, email, username, password, role | Newly created user with auto-generated userId
POST | /api/auth/login | username, password | Logged in user data and JWT token for authorization