# 🎫 Ticketeria

Sistema completo de gestão de tickets desenvolvido em React Native, com suporte a modo offline, autenticação, cache local e sincronização de dados.

## 📱 Sobre o Projeto

Ticketeria é uma aplicação mobile para gerenciamento de tickets/suporte técnico, desenvolvida com React Native. O app permite criar, visualizar, gerenciar tickets e adicionar comentários, com funcionalidades avançadas de cache offline e sincronização automática.

## ✨ Funcionalidades

### 🔐 Autenticação
- ✅ Login e registro de usuários
- ✅ Persistência de sessão com AsyncStorage
- ✅ Logout com limpeza de dados
- ✅ Validação de formulários em tempo real
- ✅ Feedback visual de erros e sucessos

### 📋 Gestão de Tickets
- ✅ **Listagem de Tickets**
  - Busca por título ou número
  - Filtros por status (todos, aberto, em andamento, resolvido, fechado)
  - Pull to refresh
  - Indicadores visuais de status e prioridade
  - Cards com informações resumidas

- ✅ **Criação de Tickets**
  - Formulário completo com validação
  - Campos: título, descrição, categoria, prioridade
  - Upload de anexos (múltiplos arquivos)
  - Preview de arquivos anexados
  - Validação em tempo real

- ✅ **Detalhes do Ticket**
  - Visualização completa de informações
  - Lista de comentários
  - Adicionar novos comentários
  - Alterar status (resolver, fechar)
  - Visualizar e baixar anexos
  - Scroll automático ao focar no input de comentário

### 💾 Modo Offline
- ✅ Cache local com AsyncStorage
- ✅ Carregamento de dados do cache quando offline
- ✅ SQLite para armazenamento robusto
- ✅ Sincronização automática de anexos pendentes
- ✅ Sistema de fila para ações pendentes
- ✅ Sincronização quando voltar online

### 🎨 Interface e UX
- ✅ Tema claro e escuro
- ✅ Design moderno e responsivo
- ✅ Feedback visual em todas as ações
- ✅ Estados de loading e erro
- ✅ Animações suaves
- ✅ Componentes reutilizáveis

### 🔧 Funcionalidades Técnicas
- ✅ Integração com API (mock e real)
- ✅ Tratamento de erros robusto
- ✅ Validação de formulários
- ✅ Testes unitários
- ✅ TypeScript para type safety
- ✅ Styled-components para estilização

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.82.1
- **TypeScript** 5.8.3
- **React Navigation** 7.x
- **Styled Components** 6.1.19
- **AsyncStorage** 2.2.0
- **React Native Vector Icons** 10.3.0
- **React Native Documents Picker** 11.0.0
- **React Native Picker** 2.11.4
- **Jest** 29.6.3 (testes)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 20
- **Yarn** (gerenciador de pacotes)
- **React Native CLI**
- **Android Studio** (para Android)
- **Xcode** (para iOS - apenas macOS)
- **Java JDK** 17 ou superior

## 🚀 Como Instalar e Executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Ticketeria
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Instale as dependências nativas (iOS)

```bash
cd ios
pod install
cd ..
```

### 4. Execute o projeto

#### Android

```bash
# Inicie o Metro bundler
yarn start

# Em outro terminal, execute o app
yarn android
```

#### iOS

```bash
# Inicie o Metro bundler
yarn start

# Em outro terminal, execute o app
yarn ios
```

### 5. Limpar cache (se necessário)

```bash
# Limpar cache do Metro
yarn start:reset

# Limpar tudo (node_modules, pods, gradle)
yarn clean
```

## 📱 Como Usar o App

### Primeiro Acesso

1. **Login**: 
   - Email: `teste@teste.com`
   - Senha: `123456`
   - Os campos já vêm pré-preenchidos para facilitar a avaliação

2. **Registro** (opcional):
   - Toque em "Cadastre-se" na tela de login
   - Preencha nome, email e senha
   - Confirme a senha

### Gerenciando Tickets

#### Criar um Ticket

1. Na tela principal, toque no botão **"+"** no canto superior direito
2. Preencha os campos:
   - **Título** (obrigatório, mínimo 5 caracteres)
   - **Descrição** (obrigatório, mínimo 10 caracteres)
   - **Categoria** (selecione uma categoria)
   - **Prioridade** (baixa, média, alta, crítica)
   - **Anexos** (opcional - toque para selecionar arquivos)
3. Toque em **"Criar Ticket"**
4. O ticket será criado e você será redirecionado para a lista

#### Visualizar Tickets

1. Na tela principal, você verá a lista de todos os tickets
2. Use a **barra de busca** para filtrar por título
3. Use os **filtros de status** para ver tickets específicos:
   - Todos
   - Aberto
   - Em Andamento
   - Resolvido
   - Fechado
4. Toque em um ticket para ver os detalhes

#### Detalhes do Ticket

1. Visualize todas as informações do ticket
2. **Adicionar Comentário**:
   - Role até o final da página
   - Digite seu comentário
   - Toque no ícone de enviar
3. **Alterar Status**:
   - Role até o final
   - Toque em "Marcar como Resolvido" ou "Fechar Ticket"
4. **Visualizar Anexos**:
   - Toque em um anexo para visualizar ou baixar

#### Logout

1. No canto superior direito, toque no ícone de **logout**
2. Confirme a ação
3. Você será redirecionado para a tela de login

### Modo Offline

O app funciona mesmo sem conexão com a internet:

- Os tickets são salvos localmente
- Você pode criar tickets offline
- Comentários são salvos e sincronizados quando voltar online
- Anexos são sincronizados automaticamente

### Tema Claro/Escuro

1. Na barra inferior, toque no ícone de **tema** (sol/lua)
2. O tema será alternado automaticamente

### Modo Online/Offline

1. Na barra inferior, toque no ícone de **rede** (nuvem)
2. O modo será alternado entre online e offline
3. Quando voltar online, os dados pendentes serão sincronizados

## 📁 Estrutura do Projeto

```
Ticketeria/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── _fragments/
│   │       ├── PickerModal/     # Modal de seleção
│   │       ├── TicketCard/      # Card de ticket
│   │       ├── TicketComment/   # Componente de comentário
│   │       └── TicketStatusBadge/ # Badge de status
│   │
│   ├── constants/           # Constantes do projeto
│   │   └── ticket.constants.ts
│   │
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.tsx      # Autenticação
│   │   ├── NetworkContext.tsx    # Status de rede
│   │   └── ThemeContext.tsx     # Tema
│   │
│   ├── database/            # Operações SQLite
│   │   └── ticketSqliteOperations.ts
│   │
│   ├── helpers/             # Funções auxiliares
│   │   ├── authStorage.ts       # Storage de autenticação
│   │   ├── attachmentStorage.ts # Storage de anexos
│   │   ├── attachmentSync.ts    # Sincronização de anexos
│   │   └── ticketStorage.ts     # Storage de tickets
│   │
│   ├── hooks/               # Custom hooks
│   │   └── useTicketList.ts
│   │
│   ├── pages/               # Páginas do app
│   │   ├── Auth/
│   │   │   ├── Login/          # Tela de login
│   │   │   └── Register/        # Tela de registro
│   │   └── Ticketeria/
│   │       ├── index.tsx        # Lista de tickets
│   │       ├── CreateTicket/    # Criar ticket
│   │       ├── TicketDetails/   # Detalhes do ticket
│   │       ├── Header.tsx       # Cabeçalho
│   │       └── Body.tsx         # Corpo da lista
│   │
│   ├── routes/              # Configuração de rotas
│   │   ├── App.routes.tsx
│   │   └── Ticketeria.routes.tsx
│   │
│   ├── services/            # Serviços de API
│   │   ├── AuthApi.ts           # API de autenticação
│   │   ├── TicketApi.ts         # API de tickets
│   │   └── TicketApi.mock.ts    # Mock da API
│   │
│   ├── styles/              # Estilos globais
│   │   └── theme.ts
│   │
│   ├── types/               # Tipos TypeScript
│   │   ├── auth.types.ts
│   │   └── ticket.types.ts
│   │
│   └── utils/               # Utilitários
│       ├── apiErrorHandler.ts
│       ├── ticket.utils.ts
│       └── validation.utils.ts
│
├── __tests__/              # Testes unitários
│   ├── components/
│   ├── helpers/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── android/                # Código nativo Android
├── ios/                    # Código nativo iOS
├── App.tsx                 # Componente raiz
└── package.json            # Dependências
```

## 🧪 Testes

O projeto inclui testes unitários para:

- Utilitários (`ticket.utils`, `validation.utils`)
- Helpers (`ticketStorage`, `authStorage`)
- Serviços (`TicketApi`, `AuthApi`)
- Componentes (`TicketCard`, `TicketStatusBadge`)
- Hooks (`useTicketList`)

### Executar Testes

```bash
# Executar todos os testes
yarn test

# Executar testes em modo watch
yarn test --watch

# Executar testes com coverage
yarn test --coverage
```

## 🎨 Padrões de Código

### TypeScript
- Tipagem forte em todos os arquivos
- Interfaces para todos os tipos de dados
- Sem uso de `any` desnecessário

### Styled Components
- Todos os estilos em arquivos separados (`styles.ts`)
- Uso do tema centralizado
- Sem estilos inline

### Componentes
- Componentes funcionais com hooks
- Uso de `memo` para otimização
- Separação de lógica e apresentação

### Organização
- Imports organizados (React → React Native → Bibliotecas → Internos)
- Funções utilitárias separadas
- Helpers para operações comuns

## 🔧 Configuração

### Variáveis de Ambiente

O projeto usa configuração de API mockada por padrão. Para alterar:

1. Edite `src/services/TicketApi.ts`
2. Altere a constante `USE_MOCK_API` para `false`
3. Configure a URL base da API

### Tema

O tema pode ser personalizado em `src/styles/theme.ts`:

- Cores
- Espaçamentos
- Tamanhos de fonte
- Bordas
- Sombras

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
yarn start              # Inicia o Metro bundler
yarn start:reset        # Inicia com cache limpo
yarn android            # Executa no Android
yarn ios                # Executa no iOS

# Qualidade
yarn lint               # Executa o linter
yarn test               # Executa os testes

# Limpeza
yarn clean              # Limpa node_modules, pods e gradle
```

## 🐛 Troubleshooting

### Problemas Comuns

**Metro bundler não inicia:**
```bash
yarn start:reset
```

**Erro ao instalar pods (iOS):**
   ```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Erro no Android:**
```bash
cd android
./gradlew clean
cd ..
yarn android
```

**Cache do Metro:**
```bash
yarn start --reset-cache
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

<div align="center">

  <img src="https://github.com/RodrigoJuniorLiyah.png" alt="Rodrigo Junior" width="150" style="border-radius: 50%;"/>

  <h3>Rodrigo Junior</h3>

  <p><strong>Desenvolvedor Front-end & Mobile</strong></p>

  <p>😺 🐱‍👤 Nothing will make me give up on my dreams.</p>

  <a href="https://github.com/RodrigoJuniorLiyah" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/rodrigo-cabral-dev/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:rodrigo.junior7@outlook.com" target="_blank">
    <img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" alt="Email"/>
  </a>

  <br><br>

  <p><strong>🌱 Atualmente aprendendo:</strong> Node.js, Python, English</p>
  <p><strong>💬 Pergunte-me sobre:</strong> JavaScript, TypeScript, CSS e React</p>
  <p><strong>⚡ Curiosidade:</strong> Eu amo animes 😜</p>

  <br>

  <p><em>Desenvolvido com ❤️ usando React Native</em></p>
  <p><strong>Teste Técnico - Desenvolvedor Mobile</strong></p>

</div>

---

## 📄 Licença

Este projeto foi desenvolvido como **teste técnico** para avaliação de competências em desenvolvimento mobile.
