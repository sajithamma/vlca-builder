# Volcano Builder
## React Fiber based builder for vlca.no

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Prerequisites

You need to install:

- Node / NPM
- GIT
- Any editor like VS-Code

## Install Steps

```bash
git clone git@github.com:sajithamma/vlca-builder.git
cd vlca-builder
npm install
```
## Run 

```bash
npm run dev
```
`Note`: NodeJs server will run at port 8000, access http://localhost:3000 from the browser to see the default scene)

## Change / Add new models

- Edit islands/at0_0.jsx file.
- Refer react fiber for components usage and documentation 
- See the live changes in http://localhost:3000.
- Some cases you need to stop the server ( Ctrl+Z) and rerun the command "npm run dev"


### Commit the changes

```bash
git status
git add 'filename'
git commit -m "your message here"
git push origin main
```