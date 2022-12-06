# test-nextjs
 
 instalar o npm
### npm install

 criar arquivo package
 ### npm init

criar projeto com Next.js
 ### npm install next react react-dom

 alterar o arquivo package.json, na área script para o seguinte:
   "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },

  criar diretório 'pages' na raiz
  dentro deste diretório, criar 'index.js' que será a página inicial

comando para rodar o projeto
### npm run dev

criar pasta 'public'. Favicon deve seer inserido nesta pasta

Adicionar CSS:
    criar pasta 'styles', criar 'style.css'
    na pasta pages, criar '_app.js'
    importar arquivo css e exportar:
        export default function MyApp({Component, pageProps}){
            return <Component {...pageProps}/>
        }

instalar lib para mascara nos inputs
### npm install react-input-mask --save
