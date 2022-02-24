/*global _ENTRIES:writable */
import handleRequest from './src/App.server';
import indexTemplate from './dist/client/index.html?raw';

// ReadableStream is bugged, overwrite with polyfill
import {ReadableStream} from 'web-streams-polyfill/ponyfill';
Object.assign(globalThis, {ReadableStream});

function isAsset(url) {
  return /\.(png|jpe?g|gif|css|js|svg|ico|map|json)$/i.test(url.pathname);
}

async function middleware({request}) {
  const url = new URL(request.url);

  if (isAsset(url)) {
    // Continue with Vercel's default asset handler
    return {
      promise: Promise.resolve(),
      waitUntil: Promise.resolve(),
      response: new Response(null, {
        headers: {'x-middleware-next': '1'},
      }),
    };
  }

  // TODO can this be done in Hydrogen?
  request.originalUrl = request.url.replace(url.origin, '');

  const waitUntilPromises = [];

  const response = await handleRequest(request, {
    indexTemplate,
    context: {
      waitUntil: (promise) => waitUntilPromises.push(promise),
    },
  }).catch(
    (error) =>
      new Response(error.message || error.toString(), {
        status: 500,
      }),
  );

  return {
    promise: Promise.resolve(),
    waitUntil: Promise.all(waitUntilPromises),
    response,
  };
}

_ENTRIES = typeof _ENTRIES === 'undefined' ? {} : _ENTRIES;
_ENTRIES['middleware_pages/_middleware'] = {default: middleware};
