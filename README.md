# [ArchaeoMap](https://archeao-map.onrender.com/app)

ArchaeoMap is a single-page application built with React that allows users to explore archaeological sites around the world. The application features fake user authentication, JSON-server for backend data storage, Context API and useReducer for state management, and React Router for navigation.For preview [ArchaeoMap](https://archeao-map.onrender.com/app)

## Features

- **User Authentication:** Fake user authentication system implemented to simulate user login functionality.
- **Backend with JSON-server:** Utilizes JSON-server as a backend to store archaeological site data.
- **State Management:** Context API and useReducer employed for efficient state management across the application.
- **Navigation:** React Router is used for client-side routing, enabling seamless navigation between pages.
- **Interactive Map:** Users can click on the map to add new archaeological sites and provide details such as site name, excavation date, and description.
- **Geolocation:** Users have the option to use their device's geolocation or manually input latitude and longitude coordinates for site placement.
- **Site Management:** Ability for users to delete existing archaeological sites.

## Usage

- Click the Login button to log in (fake authentication).
- Navigate to the About page to learn more about the application.
- Once logged in, view a list of archaeological sites with their excavation dates.
- Click on the Countries button to see countries related to the archaeological sites.
- Click on the map to add a new archaeological site, providing details in the form.
- Use the Use Your Position button to use your device's geolocation for site placement.
- Alternatively, manually input latitude and longitude coordinates in the form.
- Manage existing sites by deleting them.

## Getting Started

To get started with ArchaeoMap, follow these steps:

1. Clone the repository: git clone https://github.com/enesuraz/archeao-map.git
2. Navigate to the project directory: cd archaeo-map
3. Install dependencies: npm run install
4. Navigate the frontend/context/citiesContext remove comment defined URL value and add ${URL} value to all fetch before /cities value
5. Start application in development environment: npm run dev
6. Open your browser and visit website that shown in terminal to view the website.
7. For production: type npm run deploy and open your browser and visit http://localhost:8080(or your_port if you changed it)/app

## Contact

For any inquiries or feedback, please contact [nfk7221@gmail.com](mailto:nfk7221@gmail.com).
