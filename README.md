# RickMortyApi
# Rick & Morty App

## Overview
This project aims to build an app using the Rick & Morty API to retrieve information about locations, characters, and episodes. The app allows users to search for locations, view details about characters, and add persisted notes about characters.

## Technologies Used ##
  - React.js
  - GraphQL
  - Apollo Client
  - React Router
  - Axios
  - CSS (for styling)
  - [Rick & Morty API](https://rickandmortyapi.com/documentation/#graphql)

## Project Structure

The project structure is organized as follows:

RickMortyApi/
│
├── client/ # Client-side code
│ ├── public/ # Public assets
│ ├── src/ # Source code
│ │ ├── components/ # React components
│ │ ├── App.css # CSS styles for the app
│ │ ├── App.js # Main React component
│ │ ├── index.css # CSS styles for index.html
│ │ └── index.js # Entry point of the React app
│
├── server/ # Server-side code
│
└── README.md # Project documentation

This structure provides a clear representation of the directory structure of your RickMortyApp project, including folders like "public" and "src" and their respective contents. You can paste this markdown directly into your README.md file to document your project structure.

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/wilsonwanjiru-cmd/RickMorty>

Install dependencies:


npm install
or


yarn install

-  npm install axios

-  npm install react-router-dom


Start the development server:


npm start
or


yarn start

## Credits

- [Rick & Morty API](https://rickandmortyapi.com/documentation/#graphql)
  - for providing the data used in this project.

## Fetching Images and Enhanced Representation

To fetch images and enhance the representation of characters, modify the GraphQL query in `RickAndMortyData.js` as follows:

```jsx
const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
        status
        image
      }
    }
  }
`;

This modified GraphQL query fetches character data including their names, statuses, and image URLs.


This format provides clear documentation for modifying the GraphQL query and explains its purpose within your project. 

To update the UI in `RickAndMortyData.js` to display character images along with their names and statuses and apply CSS styling to enhance the representation, modify the `Characters` component as follows:

```jsx
function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Characters</h2>
      <div className="characters-container">
        {data.characters.results.map(character => (
          <div key={character.name} className="character-card">
            <img src={character.image} alt={character.name} />
            <p>Name: {character.name}</p>
            <p>Status: {character.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
This modified component fetches character data and displays it with images, names, and statuses. Make sure to apply CSS styling to enhance the representation of character names and statuses.


# Rick and Morty Search Application - Backend

## Backend Documentation

### Overview

This backend application serves as the server-side component for the Rick and Morty search application. It provides endpoints to fetch locations and residents data from the Rick and Morty API, as well as to store and retrieve notes for individual residents.

### Technology Stack

- **Python**: Programming language used for backend development.
- **Flask**: Micro web framework used for building the RESTful API.
- **SQLite**: Lightweight relational database used for storing resident notes.
- **Requests**: HTTP library used for making requests to the Rick and Morty API.

## How to Run

1. **Clone the Repository**: Clone the backend repository from [repository URL].

2. **Install Dependencies**: Navigate to the project directory and install dependencies using pip:

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Application**: Execute the `app.py` file to start the Flask application:

    ```bash
    python app.py
    ```

    The backend server will start running on `http://localhost:5000` by default.

## Endpoints

- **GET /api/locations**: Fetches locations data from the Rick and Morty API.
- **GET /api/residents**: Fetches resident data from the Rick and Morty API.
- **POST /api/residents/<resident_id>**: Updates or saves notes for a specific resident.

### Example Usage

#### Fetch Locations

```bash
curl http://localhost:5000/api/locations?name=earth

Fetch Residents
curl http://localhost:5000/api/residents?residentUrl=https://rickandmortyapi.com/api/character/1


Save Resident Notes
curl -X POST -H "Content-Type: application/json" -d '{"notes": "This is a test note"}' http://localhost:5000/api/residents/1

## Images

![Screenshot](https://imgur.com/a/Zks2Z5n)

