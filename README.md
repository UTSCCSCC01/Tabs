<h1 align="center">
  <br>
  <img src="https://i.postimg.cc/yNr7T80c/Temp-Logo-Placeholder.png" alt="Tabs" width="200">
  <br>
  Tabs
  <br>
</h1>

<h4 align="center">A comprehensive household management app.</h4>

<p align="center">
    <img src="https://img.shields.io/badge/contributors-6-blueviolet?style=plastic">
    <img src="https://img.shields.io/badge/release-none-ff69b4?style=plastic">
  <img src="https://img.shields.io/badge/platform-IOS/Android-informational?style=plastic">
</p>

<p align="center">
  <a href="#motivation">Motivation</a> •
  <a href="#installation">Installation</a> •
  <a href="#sprint-0-setup">Sprint 0 Setup</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contribution">Contribution</a>
</p>

<p align="center">
  <img src="https://1stwebdesigner.com/wp-content/uploads/2015/10/life-minimal-app.gif" alt="animated" />
</p>

## Motivation![image](https://user-images.githubusercontent.com/35664551/189512440-7b840683-7aef-4a8a-a6b2-d7c23eec514c.png)

Tabs is a comprehensive household management mobile app for you and your housemates.

Our vision is to enhance our users' home lives by preventing disorganization, miscommunication, and avoidable situations with their roommates.
Users are able to seamlessly manage inventory and supplies, create and keep track of schedules and chores, and manage many other accommodations, saving them time and effort.

We hope to help individuals to stay connected to their roommates and improve their experience living with them.

## Installation![image](https://user-images.githubusercontent.com/35664551/189512452-fb19dbb7-2e2b-407c-aee5-a607dc0c6b88.png)

<a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">Git</a> and <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Node.js</a> must be installed on your computer to clone and run this application.
From your command line:
```bash
# Clone this repository
$ git clone https://github.com/UTSCCSCC01/Tabs
```

### Frontend

[ TODO: add `app.json` file ]

```bash
# cd into the frontend directory
$ cd Tabs/packages/frontend

# Install dependencies
$ npm install

# Run the app with Expo
$ npm start
```
On a mobile device, install the Expo Go app and scan the QR code shown in the terminal.

Alternatively, if you are on macOS and have XCode & XCode Command Line Tools installed:
```bash
# Run the app with an iOS simulator
$ npm run ios
```

### Backend

Create a `.env` file in the `backend` directory with the variables in `.env.template`. Add your database connection string to the file.

```bash
# cd into the backend directory
$ cd Tabs/packages/backend

# Install dependencies
$ npm install

# Build
$ npm run build

# Run backend
$ npm start
```

### Documentation

The documentation can be built and found in `doc_build/html/index.html` of the root directory with the following.

```bash
# Install dependencies
$ pip install -r requirements.txt

# Build documentation
$ sh build_doc.sh

```

### Sprint 0 Setup
As of Sprint 0, upon running the frontend and backend, the user will see a button and text input. Clicking the button will add a resource to the database.

<img src="https://i.postimg.cc/3wHh5Pdm/button.gif">

## Tech Stack![image](https://user-images.githubusercontent.com/35664551/189512440-7b840683-7aef-4a8a-a6b2-d7c23eec514c.png)
### Frontend

- [React Native](https://reactnative.dev/docs/environment-setup)
- [Apollo Client](https://www.apollographql.com/docs/react/)

### Backend
- [Node.js](https://nodejs.org/en/docs/)
- [mongoose](https://mongoosejs.com/docs/guide.html) for querying the database 
- [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) as the host for user data
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for HTTP requests
- [Express.js](https://expressjs.com/)
  - [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [GraphQL](https://graphql.org/) for routing

### Build
- [Expo](https://docs.expo.dev/)

### Package Management
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [docker](https://www.docker.com/get-started/)

## Contribution![image](https://user-images.githubusercontent.com/35664551/189512456-a3c195b8-8faf-4130-8451-be603e5fc9d3.png)

### Gitflow
All contributions should conform to the <a href="https://www.youtube.com/watch?v=1SXpE08hvGs&start=19">Gitflow</a> workflow.
<ol>
  <li>Fork this repository</li>
  <li>Create/Checkout a feature/debug branch</li>
  <li>Commit and push changes</li>
  <li>Submit a pull request</li>
</ol>

### Branch Naming Convention
Branches should be the Jira ticket number followed by its name, separated by dashes.

- `{ticket#}-{issue name}`

### Ticketing & Pull Requests
- Jira is used for ticketing
- All pull requests require 2 approving reviews before merging
