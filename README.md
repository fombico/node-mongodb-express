A sample node app that uses express with mongodb.

#### Setup

1. Install mongodb
```
brew install mongodb
```

2. Start mongodb
```
brew services start mongodb
```

3. Install the dependencies and run the app
```
npm install
node script
```

The app store the body of a POST to the db. It displays the contents at `http://localhost:8080`.
Go to `http://localhost:8080/form` to view two forms that can POST two different bodies to the server.
