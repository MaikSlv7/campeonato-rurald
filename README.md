
# Campeonato Rural - Sistema de Pontuação e Cadastro

Este é um sistema simples para gerenciar um campeonato rural, com duas telas separadas:

✅ `index.html` — **Tela pública** onde qualquer pessoa pode ver:  
- Placar ao vivo dos jogos  
- Tabela de pontos das equipes  
- Saldo de gols dos jogadores

✅ `admin.html` — **Tela administrativa** (acesso restrito):  
- Cadastro de times  
- Cadastro de jogadores (vinculados aos times)  
- **Protegido por senha** (padrão: `admin123`)

## Estrutura do projeto

```
index.html        -> Tela principal de visualização
admin.html        -> Tela de cadastro de times e jogadores
style.css         -> Estilo visual unificado
admin.js          -> Lógica de cadastro dinâmica
README.md         -> Este guia
```

## Como usar

💡 **1️⃣ Suba todos os arquivos no GitHub (ou servidor de hospedagem)**  
💡 **2️⃣ Acesse:**  
- Página pública: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`  
- Página de admin: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/admin.html`  

💡 **3️⃣ No admin:** Digite a senha `admin123` para acessar o cadastro.

---

📌 Sinta-se à vontade para personalizar o projeto ou integrar com bancos de dados reais (Firebase, Supabase, etc) para persistência dos dados! 🚀⚽
