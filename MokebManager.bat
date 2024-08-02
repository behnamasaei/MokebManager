@echo off
start "" /min ".\host_dotnet.bat"

@echo off
start "" /min ".\host_angular.bat"

@echo off
setlocal enabledelayedexpansion

for /f "tokens=*" %%a in ('ipconfig ^| findstr /i "IPv4 Address"') do set ip=%%a

set ip=!ip:*IPv4 Address. =!
set ip=!ip: =!

:: Extract the IPv4 address
for /f "tokens=2 delims=:" %%a in ("%ip%") do set ipv4=%%a

echo ""
echo 1. https://%ipv4%:44355
echo ""
echo 2. https://%ipv4%:4200
echo ""
pause

