# Instructions for developers

## How to deploy on Windows Server/IIS
Everything is ready to deploy the app on Windows Server 2019 with IIS. Just do the following: 
1. Install iisnode module on target server. Download from here: 
2. Install nodejs on target server: Download from here:
3. Install URL Rewrite on IIS
4. Build this application:
```bash
npm run build
```
5. After build gets completed, deploy the following to your target server:
  - .next folder
  - node_modules folder (keep in mind this is quite large folder, so copying might take some time)
6. Create new web site rather than new app under default site
7. Ensure ApplicationPoolIdentity (IIS_WPG, IIS_IUSR groups have read and write permissions on inetpub/wwwroot/e-labex-bis-simulator directory)


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


# Verify IISNode is Installed & Registered
Since you mentioned iisnode is installed and seems to be registered, let's confirm this:

Run the following command in PowerShell:

powershell
Copy
Edit
Get-WebHandler | Where-Object { $_.Path -eq "server.js" }
If the handler is missing, IIS does not recognize IISNode, and you need to reinstall it.

Check if the IISNode module is correctly registered in IIS:

Open IIS Manager.
Go to Modules (at the server level).
Look for iisnode.
If missing, reinstall IISNode.
You can also verify with:

powershell
Copy
Edit
Get-WebGlobalModule | Where-Object { $_.Name -eq "iisnode" }
If it's missing, reinstall IISNode:

cmd
Copy
Edit
msiexec /i iisnode-full-v0.2.21-x64.msi
2. Check the 500.19 Error Code in More Detail
The 500.19 error often comes with a substatus code (from IIS logs: 500 19 33), meaning:

33: Configuration section in web.config is invalid.
Possible cause: IISNode is missing or misconfigured.
To check detailed IIS error messages:

Open Event Viewer (eventvwr.msc).
Navigate to Windows Logs > Application.
Look for IIS-W3SVC-WP or IISNode errors.
3. Ensure IIS Has Permission to node.exe
Your web.config references:
xml
Copy
Edit
<iisnode nodeProcessCommandLine="C:\Program Files\nodejs\node.exe" />
If IIS does not have access to node.exe, it will fail.
Fix: Give IIS permissions to node.exe:
Right-click C:\Program Files\nodejs\node.exe.
Select Properties > Security.
Add IIS_IUSRS with Read & Execute permissions.
Alternatively, you can test by setting:

xml
Copy
Edit
<iisnode nodeProcessCommandLine="%PROGRAMFILES%\nodejs\node.exe" />
4. Ensure server.js Exists and is Executable
Open PowerShell and check:

powershell
Copy
Edit
Test-Path "C:\inetpub\wwwroot\server.js"
If False, the file is missing.

Also, run:

powershell
Copy
Edit
Get-ChildItem "C:\inetpub\wwwroot" -Recurse | Where-Object { $_.Name -eq "server.js" }
If it’s missing, move it to the correct location.

Check file permissions:

cmd
Copy
Edit
icacls "C:\inetpub\wwwroot\server.js"
Ensure IIS_IUSRS has read and execute permissions.

5. Confirm URL Rewrite is Working
The web.config uses URL Rewrite to route requests to server.js:
xml
Copy
Edit
<rewrite>
  <rules>
    <rule name="DynamicContent">
      <conditions>
        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
      </conditions>
      <action type="Rewrite" url="server.js"/>
    </rule>
  </rules>
</rewrite>
If URL Rewrite is not properly installed, this can break IISNode.
Verify IIS Rewrite Module is installed:
Open IIS Manager.
Click IIS Modules > Rewrite.
If missing, download from: https://www.iis.net/downloads/microsoft/url-rewrite
6. Restart IIS & Check Logs Again
After making these changes, restart IIS:

cmd
Copy
Edit
iisreset
Then check the logs again:

cmd
Copy
Edit
type C:\inetpub\logs\LogFiles\W3SVC1\u_ex*.log
7. Test Manually by Running server.js
Try running the app manually:

cmd
Copy
Edit
cd C:\inetpub\wwwroot
node server.js
If it fails, there's an issue with the Node.js app.
If it works, IIS is misconfigured.
Final Thoughts
Most likely causes:
IISNode is missing from IIS handlers.
Node.js binary lacks execution permissions.
IIS lacks permission to read server.js.
Web.config has incorrect settings.
URL Rewrite is not installed or not working.
