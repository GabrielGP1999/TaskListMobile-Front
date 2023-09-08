// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  resolver: {
    unstable_enablePackageExports: false
  },
};

module.exports = getDefaultConfig(__dirname), config;