# GraphQL Server for TapMe Telegram Mini App

## Setup Instructions

Follow the steps below to set up the GraphQL server for the TapMe Telegram Mini App locally.

1. **Add the .env File Globally:**  
   Create a `.env` file in the root directory with the following example configuration:  
```
PORT=2999
SUPABASE_URL=https://YOUR_SUPABASE_DATABAS_URL_LINK
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
*Example of database in sql format*
```
INSERT INTO "public"."coinMetaData" ("id", "created_at", "userId", "coinCount")
VALUES ('1', '2024-10-22 10:16:18+00', '79344712', '0'),
('2', '2024-10-22 15:50:37+00', '123456', '123'),
('10', '2024-10-22 20:59:51.727598+00', '793447125', '536');
```
*Example pic of database table*
![image](https://github.com/user-attachments/assets/2f6fe72f-a373-4370-bf5b-95f5e62c3694)

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
