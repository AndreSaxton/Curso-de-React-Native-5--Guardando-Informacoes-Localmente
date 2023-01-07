:: Setando caminho do projeto
SET caminho_projeto="C:\Users\User\Desktop\React Native - Utilizando Web API"

:: nome app do Fake API
:: SET fake_api="json-server --watch db.json"

:: Executando Fake API no diretorio do projeto
:: start cmd.exe /k "cd %caminho_projeto% & json-server --watch db.json"
start cmd.exe /k "cd %caminho_projeto% & json-server --watch --host 192.168.1.105 db.json"

:: Executando Expo no diretorio do projeto
start cmd.exe /k "cd %caminho_projeto% & expo start"

:: Executando Expo no diretorio do projeto
C:\Users\User\AppData\Local\insomnia\Insomnia.exe

:: Executando VS Code | forcando cmd a fechar
cd "%caminho_projeto%"
code .

:: echo fim

:: pause
exit