# Robô do WhatsApp: como configurar e testar

O robô responde sozinho, com o valor da consulta, **somente** a quem manda a mensagem do formulário do site. Para isso ele procura a frase "informações sobre a consulta". As outras mensagens não recebem resposta automática.

O teste usa o **número de teste grátis da Meta** e o seu WhatsApp pessoal. O número da Dra. não é alterado.

## 1. Meta: criar o app e pegar os dados

1. Entre em **developers.facebook.com** com seu Facebook e clique em **Meus apps > Criar app**.
2. Em caso de uso, escolha **Conectar-se com clientes pelo WhatsApp**. Se pedir um portfólio empresarial, crie um com o seu nome.
3. No menu do app, abra **WhatsApp > Configuração da API**. Nessa tela:
   - Clique em **Gerar token de acesso** e copie o token. Ele é o `WHATSAPP_TOKEN`. Esse token de teste vale 24 horas.
   - Copie a **Identificação do número de telefone**. Ela é o `PHONE_NUMBER_ID`.
   - Em **Para**, adicione o **seu** número de WhatsApp e confirme com o código que chegar.
4. Em **Configurações do app > Básico**, clique em **Mostrar** na **Chave secreta do app** e copie. Ela é o `APP_SECRET`.

## 2. Cloudflare: publicar o robô

1. Clique em **Criar aplicativo > Importar um repositório** e escolha **danieli-drum-site** de novo. É um segundo Worker, separado do site.
2. Preencha:
   - **Nome**: `danieli-drum-whatsapp`
   - **Diretório raiz**: `whatsapp-bot`
   - **Comando de construção**: deixe vazio
   - **Comando de implantação**: `npx wrangler deploy`
3. Depois que implantar, vá em **Configurações > Variáveis e segredos** e adicione 4 itens, todos do tipo **Segredo**:
   - `WHATSAPP_TOKEN`: o token do passo 1
   - `PHONE_NUMBER_ID`: a identificação do número
   - `APP_SECRET`: a chave secreta do app
   - `VERIFY_TOKEN`: invente uma senha, por exemplo `danieli2026`
4. Em **Domínios**, ative o **workers.dev** e copie o endereço (algo como `https://danieli-drum-whatsapp.SEU-SUBDOMINIO.workers.dev`).
5. Abra esse endereço no navegador. Ele deve mostrar "Robô do WhatsApp Danieli Drum ativo."

## 3. Meta: ligar o robô (webhook)

1. No app da Meta, abra **WhatsApp > Configuração** e, em **Webhook**, clique em **Editar**.
2. Preencha:
   - **URL de retorno de chamada**: o endereço do Worker
   - **Token de verificação**: a mesma senha do `VERIFY_TOKEN`
3. Clique em **Verificar e salvar**.
4. Em **Campos do webhook**, clique em **Assinar** na linha **messages**.

## 4. Testar

1. Do seu WhatsApp, mande para o número de teste da Meta: `Gostaria de informações sobre a consulta`
   O robô deve responder com o valor de R$ 250,00.
2. Mande `oi`. Agora não deve chegar resposta, e é isso que você quer.

Se não responder, abra o Worker no Cloudflare, entre em **Observabilidade > Registros** e me mande um print.

## Depois do teste (para a Dra.)

- **Token permanente:** o token de teste expira em 24 h. Para uso real, é preciso criar um "usuário do sistema" no Gerenciador de Negócios e gerar um token sem validade.
- **Número da Dra.:** é preciso ligar o número dela à API. Vemos juntos como fazer isso mantendo o WhatsApp Business no iPhone dela (opção de coexistência).
- **Texto da resposta:** fica em `whatsapp-bot/src/index.js`, na constante `REPLY`.
