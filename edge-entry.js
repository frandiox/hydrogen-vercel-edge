import handleRequest from './src/App.server';
import indexTemplate from './dist/client/index.html?raw';

// ReadableStream is bugged in Vercel Edge, overwrite with polyfill
import {ReadableStream} from 'web-streams-polyfill/ponyfill';
Object.assign(globalThis, {ReadableStream});

export default async (request, event) => {
  try {
    return await handleRequest(request, {
      indexTemplate,
      context: event,
    });
  } catch (error) {
    return new Response(error.message || error.toString(), {
      status: 500,
    });
  }
}
