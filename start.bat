@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

where docker >nul 2>&1
if errorlevel 1 (
    echo CHYBA: Prikaz Docker sa nenasiel.
    echo Nainstalujte a spustite Docker Desktop a potom skuste start.bat znova.
    goto :error
)

docker info >nul 2>&1
if errorlevel 1 (
    echo CHYBA: Docker Engine nie je dostupny.
    echo Spustite Docker Desktop a pockajte, kym bude pripraveny.
    goto :error
)

docker compose version >nul 2>&1
if errorlevel 1 (
    echo CHYBA: Docker Compose nie je dostupny.
    echo Aktualizujte Docker Desktop na verziu s prikazom docker compose.
    goto :error
)

echo Zostavujem a spustam aplikaciu...
docker compose up -d --build
if errorlevel 1 (
    echo CHYBA: Aplikaciu sa nepodarilo zostavit alebo spustit.
    goto :logs
)

set "CONTAINER_ID="
for /f "delims=" %%I in ('docker compose ps -q web') do set "CONTAINER_ID=%%I"
if not defined CONTAINER_ID (
    echo CHYBA: Kontajner web nebol vytvoreny.
    goto :logs
)

echo Cakam, kym sa vyrenderuju prezentacie a web bude pripraveny...
set /a ATTEMPTS=0

:wait_for_health
set "HEALTH="
set "STATE="
for /f "delims=" %%H in ('docker inspect --format "{{.State.Health.Status}}" "!CONTAINER_ID!" 2^>nul') do set "HEALTH=%%H"
for /f "delims=" %%S in ('docker inspect --format "{{.State.Status}}" "!CONTAINER_ID!" 2^>nul') do set "STATE=%%S"

if /i "!HEALTH!"=="healthy" goto :ready
if /i "!STATE!"=="exited" (
    echo CHYBA: Kontajner sa pocas spustania zastavil.
    goto :logs
)
if /i "!STATE!"=="dead" (
    echo CHYBA: Kontajner sa pocas spustania zastavil.
    goto :logs
)

set /a ATTEMPTS+=1
if !ATTEMPTS! GEQ 180 (
    echo CHYBA: Aplikacia nebola pripravena ani po 15 minutach.
    goto :logs
)

powershell.exe -NoLogo -NoProfile -NonInteractive -Command "Start-Sleep -Seconds 5"
goto :wait_for_health

:ready
set "APP_PORT=4321"
if exist ".env" (
    for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
        if /i "%%A"=="APP_PORT" set "APP_PORT=%%B"
    )
)
set "APP_PORT=!APP_PORT:"=!"

echo Aplikacia je pripravena na http://localhost:!APP_PORT!/
start "" "http://localhost:!APP_PORT!/"
exit /b 0

:logs
echo.
echo Posledne zaznamy sluzby web:
docker compose logs --tail 100 web

:error
echo.
echo Konzola zostane otvorena, aby ste si mohli precitat chybu.
pause
exit /b 1
