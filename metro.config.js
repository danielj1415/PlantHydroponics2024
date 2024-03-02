// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
//getDefaultConfig.resolver.assetExts.push("cjs");
const config = getDefaultConfig(__dirname);

module.exports = config;
