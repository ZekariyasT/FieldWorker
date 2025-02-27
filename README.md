# Field Worker App

## 📌 Overview
The **Field Worker App** is a **React Native** application designed to streamline on-field operations by providing **real-time task management, GPS tracking, and seamless communication** between supervisors and field workers.

## 🚀 Features
- **🔹 Task Management:** Assign, update, and track tasks with real-time status updates.
- **📍 GPS Tracking:** Monitor field workers' locations for safety and accountability.
- **🔐 Role-Based Access:** Secure authentication with distinct functionalities for workers and supervisors.
- **💬 Real-Time Communication:** Direct messaging between field workers and supervisors.
- **📊 Progress Tracking:** Monitor employee performance and task completion rates.
- **📷 Media Storage:** Upload and store images/videos for reporting purposes.
- **🗺️ Map Interface:** Provide location-based insights and navigation.

## 🛠️ Tech Stack
- **Frontend:** React Native
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Maps & Location:**  React Native Maps
- **State Management:** Redux 

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/ZekariyasT/FieldWorker.git
cd FieldWorker

# Install dependencies
npm install  # or yarn install

# Configure Firebase
# Add your Firebase config to a .env file

# Start the application
npx react-native run-android  # For Android
```

## 🔑 Environment Variables
Create a `.env` file in the root directory and add the following:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```


## 🤝 Contribution
Contributions are welcome! Feel free to fork the repo and submit a pull request.

---
⭐ **Feel free to star this repository if you find it helpful!** 🚀
