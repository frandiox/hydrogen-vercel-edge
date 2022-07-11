# Hydrogen App in Vercel Edge Function

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)


> ⚠️ UPDATE:
> You might not need this template anymore since Vercel now provides [zero-config support for Hydrogen](https://vercel.com/changelog/hydrogen-projects-can-now-be-deployed-with-zero-configuration).


## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

```bash
yarn
yarn dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

### Vercel project setup

Install Vercel CLI (>=25.0.0) and login into your account.

Link this directory to a Vercel project and set the following environment variable in Vercel Dashboard:

- `ENABLE_VC_BUILD`: `1`

## Building for production

Build for production with the following command:

```bash
yarn build
```

This generates a Vercel Edge Function (middleware) in `.vercel/output` directory.
Deploy using the `--prebuilt` option in Vercel CLI:

```bash
vercel deploy --prebuilt
# or
yarn deploy
```
