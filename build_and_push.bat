@echo off

REM ==== API ====
cd WebTaskAPI
docker build -t bolto-api .
docker tag bolto-api:latest 0taras0/bolto-api:latest
docker push 0taras0/bolto-api:latest

echo DONE
pause
 