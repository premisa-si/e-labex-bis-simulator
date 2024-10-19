# Instructions for developers

## How to deploy on Windows Server/IIS
Everything is ready to deploy the app on Windows Server 2019 with IIS. Just do the following: 
1. Install iisnode module on target server. Download from here: 
2. Install nodejs on target server: Download from here:
3. Build this application:
```bash
npm run build
```
4. After build gets completed, deploy the following to your target server:
  - .next folder
  - node_modules folder (keep in mind this is quite large folder, so copying might take some time)



## How to run app localy
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
