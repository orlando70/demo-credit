**Demo Credit**
----
Demo credit is a wallet manager that is applicable to fintech softwares. It helps manage some crucial user actions like `funding wallet`, `transfer funds to another wallet`, `withdraw funds from wallet to local bank`

Tech stack: `Typescript`, `NodeJs`, `Express`, `MySQL`

**Database ERD**
----
![database ERD diagram](democredit.png)

**Installation**
----
After cloning, run `npm install` in the project folder to install all dependencies

Open the `.env.example` file for a guide on environment variables parameters

Run `npm run dev` to start the server

**Scripts**
----
`npm run dev` runs the server in the development environment

`npm run test` runs all tests

`npm run migration:create` creates a new migration

`npm run migration:run` runs existing migrations

`npm lint` to lint the codebase


**Endpoints-Register**
----
Registers a single user

* **URL**

  /auth/register

* **Method:**

  `POST`
  
* **URL PARAMS**
 
  `None`
  
* **AUTHORIZATION HEADER**
 
  `None`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
     {
        "success": true,
        "data": {
          "id": 1,
          "email": "christian@gmail.com",
          "created_at": "2022-10-13T13:59:08.000Z",
          "updated_at": "2022-10-13T13:59:08.000Z"
        }
    }
   ```
    
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "User already exists" }`
    
 * **Sample Call:**

  ```javascript
    {
      "email": "clement@email.com",
      "password": "clement"
    }
  ```
  
  **Endpoints-Login**
----
Logs in a single user

* **URL**

  /auth/login

* **Method:**

  `POST`
  
* **URL PARAMS**
 
  `None`
  
* **AUTHORIZATION HEADER**
 
  `None`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
    {
        "success": true,
        "data": {
          "id": 1,
          "email": "christian@gmail.com",
          "created_at": "2022-10-13T13:59:08.000Z",
          "updated_at": "2022-10-13T13:59:08.000Z",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZsYWciOiJhdXRoIiwiY291bnRlciI6InhxMm5vVkZiRWpJcDFIWVVDd2NITkdpb0F1MVFEaEdoZURaUCIsImlhdCI6MTY2NTY2OTc0OSwiZXhwIjoxNjY4MjYxNzQ5fQ.ouDANZlgwugkpjFQ9L7J_frpser66dlyroMqExnh8zI",
          "walletBalance": 0
        }
     }
  ```
    
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "Email or password is not correct" }`
    
  * **Code:** 422 <br />
    **Content:** `{ error : "password should not be empty" }`
    
  * **Code:** 422 <br />
    **Content:** `{ error : "Email should not be empty" }`
    
 * **Sample Call:**

  ```javascript
    {
      "email": "clement@email.com",
      "password": "clement"
    }
  ```
  
  **Endpoint Transfer**
----
Transfers funds from one wallet to another

* **URL**

  /wallet/transfer

* **Method:**

  `POST`
  
* **URL PARAMS**
 
  `None`
  
* **AUTHORIZATION HEADER**
 
  `Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
        {
        "success": true,
        "message": "transfer successful"
     }
    ```
    
* **Error Response:**

  * **Code:** 400 SERVICE <br />
    **Content:** `{ error : "Insufficient funds in wallet" }`
    
 * **Sample Call:**

  ```javascript
      {
      "walletId": 2,
      "amount": 100
    }
  ```
  
  **Endpoint Fund Wallet**
----
Fund wallet from bank

* **URL**

  /payment/fund

* **Method:**

  `POST`
  
* **URL PARAMS**
 
  `None`
  
* **AUTHORIZATION HEADER**
 
  `Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
        {
      "success": true,
      "data": {
        "authorizationUrl": "https://checkout.paystack.com/heh47xew90jwnds",
        "accessCode": "heh47xew90jwnds",
        "transactionId": 3
      }
    }
    ```
    
 * **Sample Call:**

  ```javascript
      {
      "amount": 1000
    }
  ```
  
  **Endpoint Withdraw from wallet**
----
Withdraw from wallet to bank

* **URL**

  /payment/withdraw

* **Method:**

  `POST`
  
* **URL PARAMS**
 
  `None`
  
* **AUTHORIZATION HEADER**
 
  `Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
        {
        success: true,
        data: result,
        message: 'withrawal is successful'
      }
    ```
    
 * **Sample Call:**

  ```javascript
      {
      "amount": 100,
      "bankCode": "011",
      "accountNumber": "307xxxxxxxxx"
    }
  ```
  
  
