# Todo List Application

## Overview
This Todo List application is built using React and Tailwind CSS. It allows users to manage their tasks effectively by providing features to create, update, mark as completed, search, and view tasks in an expandable format. 

## Features
- **Create Task**: Add new tasks to the list.
- **Update Task**: Edit existing tasks.
- **Mark as Done**: Mark tasks as completed.
- **Search Tasks**: Filter tasks using the search bar.
- **Expandable List**: Expand tasks to view descriptions and timestamps.

## Implementation

### Technologies Used
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **State Management**: Using React's `useState` and `useEffect` hooks.
- **Data Storage**: Tasks are stored in a local state, initialized with data from a dummy JSON file.

### Components
- `TaskList.js`: Displays the list of tasks.
- `Task.js`: Represents a single task with options to edit and mark as done.
- `TaskForm.js`: Form to add or edit tasks.
- `SearchBar.js`: Search bar to filter tasks.

### System Design
The application is structured in a modular way to ensure maintainability and scalability. Each feature is encapsulated within its own component, making the codebase easy to understand and extend.

## Setup and Running the Application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Prerequisites
- Node.js (v14)
- npm (v6)
