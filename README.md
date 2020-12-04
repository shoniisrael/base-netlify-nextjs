# Devsu Website 2021

A project built with Next.js as the static site generator and Prismic as the Headless CMS

## How to use it?

### Dependencies

To install the dependencies use:

```bash
npm install
```

### Development

To start the app in development mode use:

```bash
npm run dev
```

The application will start at [`http://localhost:3000`](http://localhost:3000)

#### Format

To format and lint your code use:

```bash
npm run validate
```

### Build

To build and export an optimized production build to /out folder use:

```bash
npm run build
```

The output displays information about each route and generates an /out directory, which can be served by any static hosting service or CDN.

### Production

To start the application in production mode use:

```bash
npm run start
```

The application should be compiled with `npm run build` first.
The application will start at [`http://localhost:3000`](http://localhost:3000)
