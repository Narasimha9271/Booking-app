# VIHARA VISTA - Hotel Booking Application

## Overview

VIHARA VISTA is a secure hotel booking application built using the MERN stack. It incorporates essential features such as user authentication, hotel management, image uploads, search, sort, and filter functionalities, and online payments. The goal is to provide a seamless and efficient user experience.

## Live Demo

Check out the live demo [here](https://viharavista.onrender.com/).

## Video Demo

[![YouTube Video](https://img.youtube.com/vi/8o9CCnNywRY/0.jpg)](https://www.youtube.com/watch?v=8o9CCnNywRY)

## Features

-   **User Authentication**: Secure login and registration using JWT and HTTP cookies.
-   **Hotel Management**: Add, update, and delete hotels with ease.
-   **Image Uploads**: Integrate Cloudinary for efficient image storage and retrieval.
-   **Search, Sort, and Filter**: Enhanced search capabilities for finding hotels.
-   **Online Payments**: Secure payment processing with Stripe.

## Technologies Used

-   **Frontend**: React, Tailwind CSS, TypeScript
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **Authentication**: JWT, HTTP cookies
-   **Image Handling**: Cloudinary
-   **Payments**: Stripe

## Installation

To run this project locally, follow these steps:

1. Clone the repository

    ```sh
    git clone https://github.com/Narasimha9271/Booking-app.git
    cd Booking-app
    ```

2. Install dependencies for both frontend and backend

    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```

3. Create a `.env` file in the root directory and add your environment variables

    ```
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. Run the application
    ```sh
    npm run dev
    ```

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss what you would like to change.
