# Tire Inventory App

This project is a Tire Inventory application built with React, TypeScript, and Vite. It provides a user-friendly interface for managing tire inventory, including features for user authentication, adding, editing, and deleting tire items. The application uses Google Firebase to authenticate users and Google Firestore as a serverless database.
![Screenshot 2024-11-27 050039](https://github.com/user-attachments/assets/d4924a39-db95-44af-b817-f18473b13361)
![Screenshot 2024-11-27 050048](https://github.com/user-attachments/assets/8112232d-f7c0-4ba1-8e6a-f38f25593fe0)

## Features

- User authentication with Firebase
- Add, edit, and delete tire items
- Responsive design
- ESLint configuration for code quality

## Getting Started

To run this app, follow the instructions below:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: This project uses npm for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gurkanozil/tire-inventory.git
   cd tire-inventory
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Replace the Firebase configuration in `src/firebaseConfig.ts` with your project's configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Deployment

To deploy the app, run the following commands:

```bash
npm run build
npm run deploy
```

### Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.

## ESLint Configuration

This project includes ESLint for code quality. To customize the ESLint configuration, you can modify the `eslint.config.js` file.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to my wife for inspiring this project and for her support throughout the development process.
- Thanks to the React and Firebase communities for their invaluable resources and documentation.
