@echo off

if exist "build\versionInfo.json" copy "build\versionInfo.json" "public\"

echo window._env_ = { > public\\envConfig.js
for /f "tokens=1* delims==" %%i IN (.env) do (
echo    %%i: "%%j", >> public\\envConfig.js
)
echo } >> public\\envConfig.js
