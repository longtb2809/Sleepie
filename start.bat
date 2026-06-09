@echo off
echo Starting Sleepie Full-Stack Project...

echo [1/2] Starting C# .NET Backend...
start "Sleepie Backend" cmd /k "cd backend && dotnet run"

echo [2/2] Starting React Frontend...
start "Sleepie Frontend" cmd /k "cd sleepie-landing-page && npm run dev"

echo Done! Both servers are starting in separate windows.
