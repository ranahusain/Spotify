# Spotify Clone Full Stack App

This is a full-stack music streaming web application inspired by Spotify. Built using the MERN stack, the app includes user authentication, music playback, premium subscriptions with Stripe, admin song management, and media storage using Supabase.

## Features

### Authentication
- Google Sign Up and Login using OAuth
- Email Sign Up with OTP verification via NodeMailer
- Protected routes
- Conditional rendering based on login and role
- Toast notifications for success and error messages
- Login required to access music player and streaming

### Premium
- Premium subscription through Stripe (test mode with dummy card)
- Only premium users can create playlists
- Cron Job to expire subscriptions and update `isPremium` status
- `isPremium` flag stored in MongoDB

### Homepage
- Search for songs
- View artist details
- Play songs at any time
- Music player only visible to logged-in users
- Add songs to playlist directly from the "All Songs" section
- Create playlists (premium users only)
- View existing playlists

### Playlist
- View and manage your own playlists

### Profile
- Upload and crop profile picture at time of upload
- Profile pictures stored in Supabase Buckets
- MongoDB stores image reference

### Admin
- Admin users can upload and manage songs
- Role-based access control (admin or user)

### Storage and Backend
- Supabase Buckets for image and audio file storage
- MongoDB for storing user data, roles, song metadata, and playlist information
- Cron Job to automate subscription expiry

## Tech Stack

- Frontend: React with Context API and Conditional Rendering
- Backend: Node.js with Express
- Database: MongoDB
- Auth: Google OAuth and Email OTP (NodeMailer)
- Payments: Stripe (test mode)
- File Storage: Supabase Buckets

## Dependencies

The following are core dependencies used across the project

**Frontend**
- react
- react-dom
- next
- axios
- react-toastify
- react-easy-crop
- zustand or context (depending on state management choice)
- react-hook-form
- next-auth (if Google login is handled via next-auth)
- tailwindcss
- @headlessui/react

**Backend**
- express
- mongoose
- nodemailer
- dotenv
- cors
- stripe
- jsonwebtoken
- bcrypt
- node-cron or cron

**Storage**
- @supabase/storage-js or supabase-js

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone
```

### 2. Environment Variables
Create two .env files — one for the frontend and one for the backend.

Example variables (you may need to modify based on your implementation):

Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```


Backend .env
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODEMAILER_USER=your_email
NODEMAILER_PASS=your_app_password
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Install Dependencies
   
FrontEnd
npm install

Backend
npm install

### 4. Run the App

Frontend
npm run dev


Backend

nodemon index.js

### 5. Stripe Test Mode

To test Stripe payments, use the dummy card:

```
Card: 4242 4242 4242 4242
Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Contributing
Suggestions, improvements, or bug reports are welcome. If you want to add a feature, clone the repo and create a pull request.


---

Let me know if you're using `Next.js` App Router or Pages Router so I can adjust the dependencies or folder structure in the README accordingly. Also happy to update this with your actual GitHub repo link once you're ready.


