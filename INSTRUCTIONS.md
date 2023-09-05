# Email Authentication (Server-side)

### Install Dependencies

In this directory, run `npm install` to install the node dependencies.

### Create SendGrid Account

Follow [these instructions](https://www.passportjs.org/tutorials/email/setup/) to set up a SendGrid account.

You will need to enter your API key and the email you authenticated with SendGrid below in the `SENDGRID_API_KEY` and `SENDGRID_EMAIL` environment variables.

(Eventually, we will need a single API key along with an authenticated business email address for the project.)

### Set Environment Variables

The following environment variables must be set in a `.env` file:
```
PORT=8002   # the port used by the server
DATABASE_URL=<URL to connect to database>
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:8002
SERVER_SESSION_SECRET=<your session secret>
SENDGRID_API_KEY=<API key for sendgrid>
SENDGRID_EMAIL=<sendgrid sender email address>
```

### Test with Postman

1. Submit a POST request to `http://localhost:8002/api/email/send` using the following raw/JSON body (put in your email address):
  ```
  {
      "email": <your email address goes here>
  }
  ```
2. Open your email and look for a message titled "Verify your Email". If you authenticated a personal sender email with SendGrid, it probably landed in your spam folder.
3. Click the "Sign In" link in that email.
4. Copy the magic link URL from your browser into a GET request. This will add a cookie to initiate a user session with your email.
5. Submit a GET request to `http://localhost:8002/api/user`. If the response contains your user ID and email, you are authenticated.
