# React + Vite One App

This is a Tracker App to track the following
-Track your habit
A full-stack web app that helps users track daily and weekly habits, monitor streaks, and visualize progress over time. Built with React, Node.js, MongoDB, and Firebase authentication.
-Track your job application progress
-Track your expenses project

## Stacks used in this project's are

### React

-Used React Router V6 with Browserreact and Routes to configure the app for 09/19/2025 with Navbar and page routes
Folder Structure
-Components
--Navbar.jsx
-pages
--Homepage.jsx
--Signin.jsx
-Router
--AppRoutes.jsx

### Vite

### Tailwind

### NodeJS

### Express

### MongoDB

## Features

- Google Sign-In authentication using Firebase
- Manual signup and login
- Protected dashboard route for authenticated users
- Add, edit, and delete habits
- Track daily and weekly streaks
- Update user profile (name, phone, email)
- Persist data using MongoDB

## Tech Stack

- Frontend: React, React Hook Form, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: Firebase (Google Sign-In + Manual)

:

Progress – Feb 5, 2026

Dashboard Layout: Dynamic sidebar replaces top navbar on login; links for Dashboard, Profile, Logout.

Responsive Design: Mobile-first with hamburger menu; sidebar persists on desktop.

Protected Routes: All dashboard pages (habittrack, expensetrack, jobtrack) nested under <Outlet> and protected.

Habit Tracker Planning: Interactive grid planned (habits, daily note, optional sleep tracker); considering splitting into pages with combined analytics.

UX Improvements: Planning loader / lazy loading for sign-in/sign-out for smoother experience.

Progress - Feb 23, 2026

Habit Tracker Layout

Created file-folder style tabs: Memorable Day, Habits to Track, Sleep Cycle.

Implemented Tab component for switching between different content sections.

Added a fixed Add button for adding new habits/events.

Responsiveness & Styling

Made main container responsive using flex and dynamic height (calc method).

Added scrollable content (overflow-auto) for long habit lists.

Tested on mobile, tablet, and desktop — adjusted container heights for small screens.

Worked on flexible container height to avoid overflow issues on screens below 940px.
