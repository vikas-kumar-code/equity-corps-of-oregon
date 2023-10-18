# Equity Corps of Oregon



## Getting started

To configure this application do the following things:

## Prerequisite

- [ ] Install node by following the instruction given at (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Copy the application
```
git init
git remote add origin https://gitlab.com/pksbbsr-jha/equity-corps-of-oregon.git
git checkout -b master
git pull origin master
```

## Install the dependencies 
- [ ] Go inside your project directory and run the following command
```
npm install
```

## Database migration

- [ ] Create database in your MySQL server with name "eco"

## Create .env file at root and paste the following code and do the changes accordingly for your server.
```
APP_NAME="Equity Corps of Oregon"
NEXTAUTH_SECRET=secret
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mysql://[database-username]:[database-password]@[host]:[port]/[database-name]"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Mail Config
MAIL_MAILER=""
MAIL_HOST=""
MAIL_PORT=""
MAIL_ENCRYPTION=""
MAIL_USERNAME=""
MAIL_PASSWORD="yizcealabjjxgvkd"
MAIL_FROM_ADDRESS=""
MAIL_FROM_NAME=$APP_NAME

TEST_USER_EMAIL=""

```

- [ ] Run the following command to migrate database tables. 
```
npx prisma db push
npx prisma db seed
```
