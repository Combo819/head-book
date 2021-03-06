
# Get Started

## Background knowledge
- Typescript
- Node.js

## Prerequisites

1. Node.js
2. npm
3. [lerna](https://lerna.js.org/#getting-started)

## Setup

1. clone the repository

```shell
git clone https://github.com/Combo819/social-media-archiver.git
```

2. install dependencies

```shell
cd social-media-archiver
npm ci --legacy-peer-deps
```

## Run

Start both the frontend and backend by running:

```shell
npm run start
```

By default, the fronend will run on port `3000` and the backend will run on port `5000`.  
The API call from the frontend will be proxied to the port `5000`.
Thus, if you are doing the frontend development, make sure the backend is running on port `5000`.  
When you see

```log
@social-media-archiver/backend: Development mode, Listening on port 5000
```

Then the backend is running.

## Debug

To debug the backend, stop the running backend first, and open the debug panel in VS Code,
select the `Debug Backend` in the dropdown, and click the `Start Debugging` button.

![debug](./debug.png)

Then you can use the debug utilities like breakpoints and the debug message is displayed in the Debug Console right next to Terminal.

## Log
In development mode, the log will be displayed in the terminal or the debug console(for VS Code debug mode). There is also a log file `packages/backend/log/social-media-archiver.log`  
In production mode, the log file is in `log/social-media-archiver.log`.
You can use [pino-pretty](https://github.com/pinojs/pino-pretty) to pretty print the log file.
