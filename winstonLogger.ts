import { createLogger, format, transports, Logger } from 'winston';

// Define the logger configuration
const logger: Logger = createLogger({
    level: 'info', // Log levels: error, warn, info, http, verbose, debug, silly
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Logs to console

    ],
});

// Export the logger for use in other parts of the app
export default logger;
