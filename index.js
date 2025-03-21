/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const originalConsoleWarn = console.warn;

console.warn = (message, ...args) => {
    if (!message.includes('This method is deprecated')) {
        originalConsoleWarn(message, ...args);
    }
};

AppRegistry.registerComponent(appName, () => App);
