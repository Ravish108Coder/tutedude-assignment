# Certificate Request and Management System

## Overview

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application designed to facilitate the request, approval, and management of certificates for various courses. It features user authentication, role-based access control, certificate request submission, approval/rejection by admins, certificate generation, and storage on Google Drive.

## Features

- User Authentication: Users can register, log in, and log out securely using bcrypt for password hashing and JWT for token-based authentication.
- Role-Based Access Control: Admins have access to features such as approving/rejecting certificate requests and viewing/download certificates of all users, while regular users can request certificates and view their own approved certificates.
- Certificate Request Workflow: Users can submit requests for certificates on completed courses. Admins can approve or reject these requests.
- Certificate Generation: Certificates are dynamically generated using PDF-lib, with user-specific information such as student name, course name, completion date, and certificate ID.
- Google Drive Integration: Approved certificates are uploaded to Google Drive using the Google Drive API. Public URLs and thumbnail links are provided for easy access.
- Responsive Design: The application is designed to be usable on various devices and screen sizes.

## Technologies Used

- **Frontend**: React.js, Fetch (for HTTP requests), Material-Tailwind (for UI components)
- **Backend**: Node.js, Express.js, MongoDB (for data storage), JWT (for authentication), bcrypt (for password hashing)
- **Certificate Generation**: pdf-lib
- **Google Drive Integration**: Google Drive API
- **Others**: OAuth Playground, Console.cloud.google.com

## Refrence

- See .env.sample file in both frontend and backend file for layout of .env file, how it will look like

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Ravish108Coder/tutedude-assignment.git
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm run dev
   cd ../backend
   npm run dev
   ```

3. Set up environment variables:

   - Create a `.env` file in the `backend` directory and configure environment variables such as MongoDB connection string, JWT secret, Google Drive API credentials, etc.

4. Run the application:

   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd ../frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. **User Registration/Login**:
   - Users can register for a new account or log in with their existing credentials.

2. **Certificate Request**:
   - Once logged in, users can submit requests for certificates on completed courses by providing necessary details.

3. **Admin Approval**:
   - Admins can view pending certificate requests and approve/reject them accordingly.

4. **Certificate Management**:
   - Approved certificates are stored securely and can be viewed/downloaded by the user or admins.

5. **Google Drive Integration**:
   - Certificates are automatically uploaded to Google Drive upon approval, with public URLs and thumbnail links provided for easy access.

## Contributors

- [Ravish Kumar](https://github.com/Ravish108Coder) - Project Lead & Developer

## License

This project is licensed under the [MIT License](LICENSE).
