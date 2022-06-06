import handleRequest from './src/App.server';
import indexTemplate from './dist/client/index.html?raw';

// ReadableStream is bugged in Vercel Edge, overwrite with polyfill
import {ReadableStream} from 'web-streams-polyfill/ponyfill';
Object.assign(globalThis, {ReadableStream});

function isAsset(url) {
  return /\.(png|jpe?g|gif|css|js|svg|ico|map|json)$/i.test(url.pathname);
}

export default async function middleware(request, event) {
  const url = new URL(request.url);
  if (isAsset(url)) {
    // Continue with Vercel's default asset handler
    return new Response(null, {
      headers: {'x-middleware-next': '1'},
    });
  }

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
