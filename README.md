# Belvo Demo App
The app pulls data from all endpoints and allows you to inspect the JSON without leaving the browser.

Please note:
- All the data retrieved from the sandbox env
- Fiscal data is mocked
- Clicking on disabled links will break the app
- Transactions are not being filtered

In order to get this running: 

#1 Create a .env file with the following envs in the root folder:
- SECRET_ID="YOUR_SECRET_ID_HERE"
- SECRET_PASSWORD="YOUR_SECRET_KEY_HERE"
- BASE_URL="https://sandbox.belvo.co"

#2 Run 'yarn' or 'npm install' to install the packages

#3 Run 'yarn dev' to start it locally
