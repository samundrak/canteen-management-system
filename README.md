# CanteenMS

## Requirements
* Node.js & NPM v8.4.0
* Mongo 2.2.3
* Maildev

## Install
* Clone this repo
* Run `npm install` to install dependencies
* Run `npm run dep` to run dependencies like mongo and maildev, dont forget to enter root password
after running command for mongo.
* Run `npm run seed` to seed database on another terminal

## Run
* Copy file `.env.example` to `.env` and change env details if needed
* After doing seed and running dependencies, run `npm start`
* Then visit http://localhost:3000 to access app
* After running seed two new user will be created,which you can use to access app or register if needed
    - Email: owner@gmail.com, Password: 12345678
    - Email: admin@gmail.com, Password: 12345678
* Admin Access will be shown on same page if user role are admin and owner
* Admin & Owner can Change user status, Add Food Item, Approve, Reject, Cancel the food order.

## Note
* Prebuild frontend app is bundled with this app, if you want to rebuild
frontend app then please clone it and run both parallel you can use pm2 to
run both or use node module `serve`.
* If you set port other then 3000 then please rebuild frontend app also dont forget
to replace public folder files with newly generated app.

## Test
* Run server before test
* Run `npm t`
  
