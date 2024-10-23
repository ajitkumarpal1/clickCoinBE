# GraphQL Server for TapMe Telegram Mini App

## Setup Instructions

Follow the steps below to set up the GraphQL server for the TapMe Telegram Mini App locally.

1. **Add the .env File Globally:**  
   Create a `.env` file in the root directory with the following example configuration:  
```
PORT=2999
SUPABASE_URL=https://YOUR_GQL_SERVER_LINK
SUPABASE_ANON_KEY=YOUR_KEY
```
2.
2. **Build the Project:**  
Build the project using one of the following commands:  
```
npm run build:watch
```
**OR**
```
npm run build
```
3.Run the Server:
Start the server with one of the following commands:
```
nodemon dist/index.js
```
**OR**
```
node dist/index.js
```
