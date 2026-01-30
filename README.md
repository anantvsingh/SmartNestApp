# 🏠 Smart Home React Native App

A React Native mobile application connected to a mock smart home REST API to control **lights, thermostat, and locks** with real-time state updates.

---

## 🚀 Features

* Control smart devices (Light, Thermostat, Lock)
* Real-time device state updates
* Centralized state management using Context API / Redux
* Mock REST API with MongoDB persistence
* Android Emulator support

---

## 🧰 Tech Stack

### Frontend

* React Native
* Context API / Redux
* Axios
* Android Studio Emulator

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📦 Project Structure

```
SmartHome/
├── SmartHomeApp/        # React Native App
└── server/        # Mock REST API
```

---

## 🔧 Backend Setup (Mock API Server)

### 1️⃣ Navigate to server directory

```bash
cd server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB

Ensure MongoDB is running locally:

```bash
mongod
```

MongoDB connection used:

```
mongodb://127.0.0.1:27017/smart-home
```

### 4️⃣ Start the server

```bash
node index.js
```

Expected output:

```
Mock API running on http://localhost:3000
```

### 5️⃣ Verify API

```bash
http://localhost:3000/
```

Response:

```
API is running
```

Devices endpoint:

```bash
GET http://localhost:3000/devices
```

---

## 📱 Frontend Setup (React Native App)

### 1️⃣ Navigate to SmartHomeApp directory

```bash
cd SmartHomeApp
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start Metro Bundler

```bash
npx react-native start
```

### 4️⃣ Run app on Android Emulator

In a new terminal:

```bash
npx react-native run-android
```

⚠️ **Important for Android Emulator**
Use the following API base URL:

```js
http://10.0.2.2:3000
```

(`localhost` will not work inside the emulator)

---

## 🔁 Data Flow

1. App fetches devices from the mock API
2. Device state stored in MongoDB
3. User actions trigger API updates
4. Updated state reflected instantly in UI

---

## 🧪 Testing

* Android Studio Emulator
* Toggle light on/off
* Adjust thermostat temperature
* Lock/unlock doors

---

## 🛠 Troubleshooting

* Ensure MongoDB is running
* Start backend before frontend
* Confirm correct API base URL
* Reset Metro cache if needed:

```bash
npx react-native start --reset-cache
```

---

## 📌 Deliverables

* React Native mobile app
* Mock REST API server
* MongoDB schemas
* Local setup instructions

---

