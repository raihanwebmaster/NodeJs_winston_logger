
# NodeJs_winston_logger

This repository demonstrates how to use the Winston logging library in a Node.js application, including how to set it up for production environments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Why Winston for Production](#why-winston-for-production)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/raihanwebmaster/NodeJs_winston_logger.git
   cd NodeJs_winston_logger
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To start the application:

```bash
node index.js
```

The application will generate logs in the \`logs\` directory. It includes different log levels (info, error) and log rotation.

### Available Scripts

- `start`: Starts the Node.js application.

## Examples

Here's a basic example of how to set up and use Winston in your Node.js application:

### Installation

First, install Winston:

```bash
npm install winston
```

### Configuration

Create a logger configuration file, `logger.js`:

```javascript
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return \`\${timestamp} \${level}: \${stack || message}\`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;
```

### Usage in Application

Use the logger in your application files:

```javascript
const express = require('express');
const logger = require('./utils/logger'); // Adjust the path accordingly

const app = express();

app.get('/', (req, res) => {
  logger.info('Hello world endpoint hit');
  res.send('Hello World!');
});

app.get('/error', (req, res) => {
  logger.error('This is an error log');
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(\`Server is running on port \${PORT}\`);
});
```

## Why Winston for Production

Winston is a versatile logging library for Node.js and provides several benefits, especially for production environments:

1. **Log Levels**: Different log levels (info, warn, error, etc.) help in categorizing and filtering logs, which is crucial for debugging and monitoring.
2. **Multiple Transports**: Winston allows you to log to multiple destinations (files, databases, consoles, etc.) simultaneously.
3. **Format and Metadata**: Customizable log formats and the ability to add metadata to logs make them more informative and structured.
4. **Error Handling**: Winston can log stack traces for errors, making it easier to trace issues.
5. **Performance**: It is designed to be fast and asynchronous, which helps in minimizing the performance impact on your application.
6. **Log Rotation**: Avoids issues with massive log files by rotating logs, which is essential for long-running applications.
7. **Compatibility**: Easily integrates with various monitoring tools and log management systems.

Proper logging is vital for maintaining and troubleshooting production applications. It helps in:

- **Monitoring**: Keeping track of application behavior and performance.
- **Debugging**: Quickly identifying and resolving issues.
- **Auditing**: Maintaining records of application activities and user interactions.
- **Security**: Detecting potential security breaches or misuse.

## Project Structure

```
NodeJs_winston_logger/
├── .vscode/             # VSCode settings
├── controllers/         # Controller files
├── logs/                # Log files
├── middlewares/         # Middleware files
├── models/              # Database models
├── services/            # Service files
├── utils/               # Utility files
│   ├── logger.js        # Logger configuration
├── .gitignore           # Git ignore file
├── README.md            # Project documentation
├── index.js             # Main application file
├── mongo.js             # MongoDB connection setup
├── package-lock.json    # Lock file for npm
├── package.json         # Package dependencies and scripts
```

## Features

- **Winston Logger Integration**: Setup for logging with different log levels.
- **Production-Ready Logging**: Includes log rotation and separate log files for errors and info.

## Technologies

- **Backend**:
  - Node.js
  - Winston

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
