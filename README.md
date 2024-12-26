# Online Chat Application

## Overview
This project is an **Online Chat Application** built using **React Native** and a comprehensive tech stack to provide real-time communication features. The application is designed with scalability, performance, and modern UI principles in mind.

---

## Features
- **Real-Time Chat**: Send and receive messages instantly.
- **User Authentication**: Secure login and registration.
- **Group Chats**: Create and join group conversations.
- **Notifications**: Receive alerts for new messages.
- **Material Design UI**: Clean and modern user interface.

---

## Tech Stack
### Frontend
- **React Native**
  - Cross-platform development for Android and iOS.
  - **Material UI** for consistent and elegant design.
  - **Redux Toolkit** for state management.

### Backend
- **Node.js**
  - RESTful APIs for user management and chat functionalities.
  - **SockJS** and **STOMP** for WebSocket-based communication.

### Database
- **MongoDB**
  - NoSQL database for efficient data storage and retrieval.

---

## Architecture
The application uses a client-server model with the following key components:
- **WebSocket Communication**: Real-time message transmission via STOMP protocol over SockJS.
- **REST APIs**: Backend services for user registration, authentication, and chat management.
- **State Management**: Redux Toolkit ensures predictable state transitions.

---

## Installation and Setup

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (v4+)
- **React Native CLI** or **Expo CLI**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend directory with the following:
     ```env
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     WEBSOCKET_PORT=your_websocket_port
     ```

4. Start the application:
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd ../frontend
   npm start
   ```

5. Open the app on your emulator or connected device using the React Native CLI or Expo.

---

## Usage
1. **Sign Up**: Create an account with a valid email and password.
2. **Login**: Use your credentials to log in.
3. **Chat**: Start chatting with other users or create groups.
4. **Notifications**: Stay updated with real-time alerts.

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For questions or feedback, please contact [daongocanhkhoi@gmail.com].
