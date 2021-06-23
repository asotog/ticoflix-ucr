/** Example file */

import Prismic from "prismic-javascript";

import smConfig from "./sm.json";

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = "";

export const Client = (req = null, options = {}) =>
  Prismic.client(apiEndpoint, { req, ...options });
