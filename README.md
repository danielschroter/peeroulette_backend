# peeroulette application

peeroulette-master-backend application can be found [here](https://gitlab.lrz.de/seba-master-2021/team-50/backend)

## Prerequisites

Both for the backend and frontend application:

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

Go to your project root folder via command line

```
git clone https://gitlab.lrz.de/seba-master-2021/team-50/backend
cd path/to/workspace/backend
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* Start the database server
```
mongod --dbpath "path/to/database"
```
## IMPORTANT! Before starting, run local addDataInterests.js file

In our app we load the user interests and icebreaker questions from the backend. 
Therefore, it is necessary to manually run the file addDataInterests.js. 
If you have an IDE like Webstorm you can simply do a rightclick on the file and then click on run. 
After running the file, the ice breaker questions and interests will be inserted into the backend. 
To view them in mongo db, simply reload the window of mongodb.


## Start the project

**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```