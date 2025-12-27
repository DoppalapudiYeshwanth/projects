# TravelNest

TravelNest is a full-stack travel and stay listing platform inspired by Airbnb. It allows users to explore, create, and review listings across multiple travel categories.

## Tech Stack
Frontend: EJS, Bootstrap 5, Font Awesome, Vanilla JS
Backend: Node.js, Express.js
Database: MongoDB Atlas, Mongoose
Auth & Security: Passport.js, bcrypt, express-session, connect-mongo, connect-flash

## Core Features
- User authentication and authorization
- Full CRUD operations for listings
- Category-based listing system using enum validation
- Category-wise filtering via query parameters
- Image support using scalable images array
- Review and rating system
- Flash messages for success and error handling
- Centralized error handling middleware

## Categories Supported
Trending, Destinations, Hotels, Adventures, Trips, Guides, Car Rentals, Memories

## Category Filtering
/listings -> all listings
/listings?category=Hotels -> only hotel listings
Single index route handles both cases

## Database & Schema
- Listings include title, description, price, location, country, images, category, and owner
- Category enforced using enum at schema level
- Owner stored as ObjectId reference
- Image field designed as array for scalability

## Project Structure
travelnest/
models/
routes/
views/
public/
init/
utils/
app.js
.env

## Setup Instructions
git clone <repo-url>
cd travelnest
npm install

Create .env file
CLOUD_NAME=your_cloud
CLOUD_API_KEY=your_api_key
CLOUD_API_KEY_SECRET=your_api_key_secret
ATLAS_URL=your_mongodb_url
SESSION_SECRET=your_secret

Seed database
node init/index.js

Run server
node app.js
Open http://localhost:8080

## Design Decisions
- Query-based filtering avoids route duplication
- Enum validation ensures category consistency
- Image array allows multi-image support
- Single controller improves maintainability

## Future Enhancements
Search + category filtering
Pagination
Admin dashboard
Booking and payments

## Live Demo
[TravelNest – Your stay is our priority](https://travelnest-your-stay-is-our-priority.onrender.com)


## Author
Yeshwanth Doppalapudi

