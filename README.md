# node_short_url

This is a Node.js-based URL Shortener application designed with user-specific URL management and session-based authentication using browser cookies.

The primary goal of this project is to allow registered users to shorten long URLs, manage their personal links, and view analytics (like version history or clicks) related only to the URLs they’ve created.

🔐 Authentication & Session Management
The app uses browser cookies to identify and authenticate users. Upon successful login or session initiation, a cookie is stored in the user’s browser. This cookie is used to:

Validate each request coming to the server side

Identify the user making the request

Ensure that only the URLs created by that user are fetched or modified

This ensures user-level access control, providing a secure and personalized experience where users cannot view or edit URLs that belong to others.

🔗 URL Shortening Features
Generate unique short URLs for any valid long URL

Store and retrieve original URLs from a MongoDB database

Allow only the creator of the short URL to view its analytics

Optionally track metadata like creation time, total clicks, and version history

🛠️ Technologies Used
Node.js + Express – Server and routing logic

MongoDB + Mongoose – Database and ORM

Cookie-parser / Express-session – For cookie and session management

EJS or JSON-based APIs – For rendering views or exposing data (depending on your stack)

ShortID / NanoID – For generating unique short URLs

🚀 Use Case
This project is ideal for learning:

Building secure session-based apps with Node.js

Implementing user-based data access

Designing a basic SaaS-like URL shortening service
