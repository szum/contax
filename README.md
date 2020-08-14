# Contax

A contact list app built with Material UI components in React. 
The backend is a serverless architecture with a CI/CD pipeline provisioned by AWS Amplify. 
Data is served to the client via GraphQl API, and uploaded assets (photos for the contact's picture) are stored in an S3 bucket.

App has been deployed and hosted publicly here: https://master.dpkqn0ib0xj80.amplifyapp.com/

## Local dev setup

`yarn install` 

Create a file called `aws-exports.js` in your `src` folder and copy & paste the private keys sent in the email

`yarn start`
