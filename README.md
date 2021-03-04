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

## Instructor Endpoints
Method | Endpoint | Requires | Returns
--- | --- | --- | ---
GET | /api/instructor | N/A | A list of all scheduled classes
POST | /api/instructor | name, type, startTime, duration, intensityLevel, location, registered, maxRegistered, date | The newly created class
PUT | /api/instructor/:id | Any key you would like to update | 	Updates the specific key value(s) from a class with the given id
DELETE | /api/instructor/:id | Deletes the class with the given id

## User Endpoints
Method | Endpoint | Requires | Returns
--- | --- | --- | ---
GET | /api/users | N/A | Returns a list of all users
GET | /api/users/:id | user id | Returns the user with the given id