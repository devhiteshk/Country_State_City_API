
## Country City State API - Backend

country city state is a api ment to ease the user work in choosing his location, it features 

- Index Searching - Now you can search any county, state or city just by typing the name. The results are generated using regex search and Full text search. 

- Faster Selection - Decrease the time and hassele of selecting the country, state and then city now get instant results just by typing anything. 

- Highly Customizeable - You can customise the API according to your needs. You can select the fields you want to get in the response.

### Prerequisites

- Node.js
- MongoDB


#### Get your MongoDB URI

```bash
Connect your server using MongoDb URI in .env file

MONGODB_URI = "YOUR MONGODB URI"
```


#### Install Dependencies

```bash
npm i 

or

yarn 
```

#### Start
```bash
npm start
```

### City Country State API

```bash
/api/v1/search-db?search=searchquery?limit=20?offSet=0
```

#### Create DB

```bash
/api/v1/createdb
```

