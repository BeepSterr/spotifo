@echo off
title [Spotifo] Installing Packages.
call npm install
title [Spotifo] Running!
cls
:autorestart
node spotifo
goto :autorestart