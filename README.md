# First Draft
[![License](https://img.shields.io/badge/License-GPL-lightgrey.svg?style=for-the-badge)](https://github.com/lakshya-20/first-draft/blob/development/LICENSE) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lakshya-20/first-draft?style=for-the-badge) [![GitHub last commit](https://img.shields.io/github/last-commit/lakshya-20/first-draft?style=for-the-badge)](https://github.com/lakshya-20/first-draft/commits) <br>
![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## Project description
This project is the full-stack application made using Next.js, allowing users to write and share their blogs. For backend [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) are used written with Node.js. Given below are some of the key feature of this app.
1. Server-side rendering the components.
2. Code splitting, pre-rendering the pages.
3. Fast content delivery network.
4. Allow users to write blog and get a URL to share it with anyone.
5. Feature to update or delete the blog.
6. User authentication for better security

## Working
**Parsing the markdown** 
- Setp 1: Parsing the markdown from frontend using [marked](https://www.npmjs.com/package/marked), which is low-level compiler for parsing markdown.
- Step 2. Sanitize the generated HTML using [Dompurify](https://www.npmjs.com/package/dompurify) as `marked` does not output the sanitized html.
##
**Rendering parsed html**
- Use `dangerouslySetInnerHTML` to set HTML directly from React, which is an attribute under DOM elements in React.

## Development Setup
Before setting up the development environment make sure you have downloaded the `npm ~6.14` and `Node.js ~14.16` and added them to path variables. [Downloading Node.js](https://nodejs.org/en/download/)

## Building the Code
1. Clone the repository using command: 
    ```sh
   git clone https://github.com/lakshya-20/first-draft.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Update the `.env.development` file with required environment variables.

4. In the root directory run
    ```
    npm run dev
    ```
5. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Contributing
1. Fork it
2. Create your feature branch `(git checkout -b my-new-feature)`
3. Commit your changes `(git commit -m 'Add some feature')`
4. In case of multiple commits squash them. You can find guide here: [how to squash commits](https://medium.com/@slamflipstrom/a-beginners-guide-to-squashing-commits-with-git-rebase-8185cf6e62ec)
4. Run the tests with `(npm run test)` and make sure all tests are passed.
5. Push your branch `(git push origin my-new-feature)`
6. Create a new Pull Request, following the template