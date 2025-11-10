# 🎫 Desafio: Sistema de Cadastro de Ticketeria

## 📋 Objetivo

Criar um sistema completo de cadastro e gestão de tickets (ticketeria) seguindo os padrões e estrutura do projeto. O desenvolvedor deve implementar funcionalidades de criação, listagem e detalhamento de tickets, conectando com APIs e seguindo a arquitetura existente do projeto.

**Tempo estimado:** 
- **MVP (Requisitos Obrigatórios):** 5-7 dias de trabalho
- **Completo (incluindo opcionais):** 7-10 dias de trabalho

---

## 🎯 Priorização de Funcionalidades

### ✅ Obrigatório (MVP - Foco Principal)
Estas funcionalidades são essenciais e devem ser implementadas:

- [ ] Listagem de tickets com busca e filtros
- [ ] Cadastro de ticket completo
- [ ] Visualização de detalhes do ticket
- [ ] Adição de comentários
- [ ] Alteração de status do ticket
- [ ] Cache local com AsyncStorage
- [ ] Carregamento de dados do cache quando offline

### ⭐ Opcional/Bônus (Desejável)
Estas funcionalidades agregam valor mas não são obrigatórias:

- [ ] SQLite para modo offline robusto
- [ ] Sistema de sincronização de pendências
- [ ] Upload e visualização de anexos
- [ ] Login por biometria

**Nota:** Foque primeiro no MVP. As funcionalidades opcionais são bônus e podem ser implementadas caso o tempo permita.

---

## 📋 Pré-requisitos e Configuração

Antes de começar, verifique no projeto:

- [ ] **Estrutura de Rotas:** Onde ficam as rotas? (`src/routes/App.routes.tsx` ou similar)
- [ ] **Serviço API Base:** Existe `src/services/Api.ts` configurado?
- [ ] **Sistema de Tema:** Existe `src/styles/theme.ts` ou similar?
- [ ] **Padrões de Código:** Como são estruturadas as páginas existentes?
- [ ] **Autenticação:** Como funciona o sistema de autenticação?

**Dica:** Explore o projeto antes de começar para entender os padrões existentes.

---

## 🎯 Requisitos Funcionais

### 1. Listagem de Tickets (`TicketList`)
- [ ] Tela que exibe lista de tickets cadastrados
- [ ] Busca por título ou número do ticket
- [ ] Filtros por status (aberto, em andamento, resolvido, fechado)
- [ ] Ordenação por data (mais recente primeiro)
- [ ] Pull to refresh
- [ ] Paginação ou scroll infinito
- [ ] Indicador visual de status (cores diferentes)
- [ ] Navegação para detalhes do ticket ao tocar

### 2. Cadastro de Ticket (`CreateTicket`)
- [ ] Formulário para criação de novo ticket com os campos:
  - Título (obrigatório, mínimo 5 caracteres)
  - Descrição (obrigatório, mínimo 10 caracteres)
  - Categoria (seleção obrigatória - dropdown/select)
  - Prioridade (baixa, média, alta, crítica)
  - Anexos (opcional, múltiplos arquivos)
- [ ] Validação de campos em tempo real
- [ ] Preview de arquivos anexados
- [ ] Feedback visual de sucesso/erro
- [ ] Redirecionamento após criação bem-sucedida

### 3. Detalhes do Ticket (`TicketDetails`)
- [ ] Exibir todas as informações do ticket
- [ ] Lista de comentários/respostas
- [ ] Adicionar novo comentário
- [ ] Alterar status do ticket (abrir, fechar, resolver)
- [ ] Visualizar anexos (download/visualização)
- [ ] Histórico de alterações (opcional, se API suportar)

### 4. Integração com APIs
- [ ] Criar serviço `TicketApi.ts` em `src/services/`
- [ ] Implementar funções de fetch para:
  - Listar tickets: `GET /api/v1/tickets`
  - Buscar ticket: `GET /api/v1/tickets/:id`
  - Criar ticket: `POST /api/v1/tickets`
  - Atualizar ticket: `PUT /api/v1/tickets/:id`
  - Adicionar comentário: `POST /api/v1/tickets/:id/comments`
  - Upload de arquivos: `POST /api/v1/tickets/:id/attachments`
- [ ] Tratamento de erros (network, validação, etc.)
- [ ] Loading states apropriados

### 5. AsyncStorage (Cache Local)
- [ ] Salvar lista de tickets no AsyncStorage após busca bem-sucedida
- [ ] Carregar tickets do cache ao iniciar a tela (mostrar dados antigos enquanto carrega novos)
- [ ] Salvar detalhes do ticket localmente para acesso offline
- [ ] Limpar cache quando necessário (pull to refresh)
- [ ] Salvar preferências do usuário (filtros, ordenação)
- [ ] Implementar sincronização quando voltar online

### 6. SQLite (Modo Offline Robusto)
- [ ] Criar tabelas SQLite para Tickets, Comments, Attachments
- [ ] Salvar tickets no SQLite quando criados/atualizados offline
- [ ] Salvar comentários pendentes para sincronização posterior
- [ ] Salvar anexos pendentes localmente
- [ ] Implementar sistema de fila para ações pendentes
- [ ] Sincronizar dados pendentes quando voltar online
- [ ] Usar `isConnected()` para detectar status de conexão
- [ ] Marcar itens como sincronizados após envio bem-sucedido

### 7. Login com Biometria (Opcional mas Desejável)
- [ ] Adicionar opção de login rápido por biometria
- [ ] Verificar disponibilidade do sensor biométrico
- [ ] Implementar autenticação biométrica usando `react-native-biometrics`
- [ ] Salvar credenciais criptografadas (usar `cryptoData` helper)
- [ ] Integrar com o contexto de autenticação existente
- [ ] Permitir habilitar/desabilitar login biométrico nas configurações

---

## 🏗️ Estrutura de Arquivos

Você deve criar os seguintes arquivos seguindo os padrões do projeto:

```
src/
├── pages/
│   └── Ticketeria/
│       ├── index.tsx                    # Listagem de tickets
│       ├── styles.ts                    # Estilos da listagem
│       ├── fetchData.ts                 # Funções de API
│       ├── CreateTicket/
│       │   ├── index.tsx                # Página de criação
│       │   └── styles.ts                # Estilos da criação
│       └── TicketDetails/
│           ├── index.tsx                # Página de detalhes
│           └── styles.ts                # Estilos dos detalhes
│
├── services/
│   └── TicketApi.ts                     # Cliente API para tickets
│
├── helpers/
│   └── ticketStorage.ts                # Helpers para AsyncStorage (cache)
│
├── database/
│   └── ticketSqliteOperations.ts       # Operações SQLite para tickets
│
├── components/
│   └── _fragments/
│       ├── TicketCard/                  # Card para exibir ticket na lista
│       │   └── index.tsx
│       ├── TicketStatusBadge/           # Badge de status
│       │   └── index.tsx
│       └── TicketComment/               # Componente de comentário
│           └── index.tsx
│
└── routes/
    └── Ticketeria.routes.tsx            # Rotas do módulo
```

---

## 📝 Especificações Técnicas

### Modelo de Dados do Ticket

```typescript
interface Ticket {
  id: string | number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  comments?: Comment[];
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Comment {
  id: string | number;
  text: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

interface Attachment {
  id: string | number;
  name: string;
  url: string;
  type: string;
  size: number;
}
```

### Endpoints da API

**Base URL:** `https://api-example.com/v1` (use a mesma estrutura do `Config.URL_BASE_DEVELOPMENT`)

#### 1. Listar Tickets
```
GET /tickets
Query params:
  - page?: number (default: 1)
  - limit?: number (default: 20)
  - status?: string (open|in_progress|resolved|closed)
  - search?: string
  - sort?: string (createdAt_desc|createdAt_asc)

Response:
{
  "data": Ticket[],
  "total": number,
  "page": number,
  "limit": number,
  "totalPages": number
}
```

#### 2. Buscar Ticket por ID
```
GET /tickets/:id

Response: Ticket
```

#### 3. Criar Ticket
```
POST /tickets
Body (multipart/form-data):
  - title: string (required)
  - description: string (required)
  - category: string (required)
  - priority: string (low|medium|high|critical)
  - attachments?: File[] (optional)

Response: Ticket
```

#### 4. Atualizar Ticket
```
PUT /tickets/:id
Body:
  - status?: string
  - priority?: string
  - title?: string
  - description?: string

Response: Ticket
```

#### 5. Adicionar Comentário
```
POST /tickets/:id/comments
Body:
  - text: string (required)

Response: Comment
```

#### 6. Upload de Anexo
```
POST /tickets/:id/attachments
Body (multipart/form-data):
  - file: File

Response: Attachment
```

---

## 🎨 Padrões de Design e Código

### 1. Componentes
- Crie os componentes necessários seguindo os padrões do projeto
- Use styled-components para estilização
- Consulte `EXEMPLOS_CODIGO.md` para ver exemplos de implementação
- Os componentes devem ser criados em `src/components/_fragments/`

### 2. Navegação
- Adicione rotas em `src/routes/App.routes.tsx`
- Use React Navigation conforme padrão existente
- Mantenha consistência com outras rotas

### 3. Estado e Dados
- Use hooks do React (`useState`, `useEffect`)
- Crie componentes de loading e error conforme necessário
- Mantenha o padrão de `fetchData.ts` nas páginas
- Consulte os exemplos em `EXEMPLOS_CODIGO.md` para padrões de implementação

### 4. Validação
- Validação de formulários usando a estrutura existente
- Mensagens de erro claras e visíveis
- Feedback visual durante submissão

### 5. Estilos
- Use o tema do projeto (`src/styles/theme.ts`)
- Siga o padrão de styled-components visto em outras páginas
- Responsivo e funcional em diferentes tamanhos de tela

---

## 🔧 Configuração da API (Mock para Desenvolvimento)

Para testar sem uma API real, você pode usar:

1. **JSON Server** - Criar um `db.json` com dados mock
2. **MSW (Mock Service Worker)** - Interceptar requisições
3. **API externa de teste** - Usar serviços como JSONPlaceholder adaptado

*Nota: No ambiente real, a API já estará configurada seguindo os padrões do projeto.*

---

## ✅ Checklist de Entrega

### Funcionalidades
- [ ] Listagem de tickets funcional
- [ ] Busca funcionando
- [ ] Filtros por status funcionando
- [ ] Cadastro de ticket completo
- [ ] Visualização de detalhes
- [ ] Adicionar comentários
- [ ] Alterar status do ticket
- [ ] Upload e visualização de anexos
- [ ] Cache local com AsyncStorage funcionando
- [ ] Carregar dados do cache quando offline
- [ ] SQLite funcionando para modo offline
- [ ] Sincronização de dados pendentes funcionando
- [ ] Login por biometria implementado (opcional)

### Qualidade de Código
- [ ] Código segue padrões TypeScript
- [ ] Componentes reutilizáveis
- [ ] Tratamento de erros adequado
- [ ] Loading states implementados
- [ ] Validações de formulário
- [ ] Nenhum erro de lint/TypeScript
- [ ] Comentários onde necessário

### UX/UI
- [ ] Interface consistente com o design system
- [ ] Feedback visual em todas as ações
- [ ] Navegação intuitiva
- [ ] Estados vazios tratados (sem tickets, sem comentários)
- [ ] Scroll suave e performático

### Integração
- [ ] Rotas adicionadas corretamente
- [ ] APIs chamadas corretamente
- [ ] Tokens de autenticação utilizados (se necessário)
- [ ] Tratamento de offline/erro de rede
- [ ] AsyncStorage funcionando para cache
- [ ] SQLite funcionando para modo offline robusto
- [ ] Sincronização de dados local/servidor
- [ ] Fila de pendências sincronizando corretamente
- [ ] Biometria integrada (se implementado)

---

## 📚 Referências e Documentação

Para entender melhor os padrões, consulte a documentação fornecida:

1. **Estrutura de Arquivos:**
   - `ESTRUTURA_BASE.md` - Estrutura de arquivos esperada
   - `EXEMPLOS_CODIGO.md` - Exemplos completos de implementação

2. **API e Mock:**
   - `API_MOCK.md` - Como configurar mocks para desenvolvimento
   - Consulte a estrutura de serviços do projeto para entender padrões de API

3. **Rotas:**
   - Verifique `src/routes/App.routes.tsx` (ou estrutura equivalente) para adicionar rotas

4. **Estilos:**
   - Verifique se existe `src/styles/theme.ts` ou estruturas similares no projeto

5. **SQLite (Modo Offline):**
   - `SQLITE_OFFLINE.md` - Guia completo de implementação
   - Verifique `src/database/sqlite.ts` se existir no projeto

6. **Cache e Biometria:**
   - `ASYNCSTORAGE_BIOMETRIA.md` - Guia de implementação

---

## 🚀 Como Começar

1. **Fork/Branch:** Crie uma branch específica para o desafio
   ```bash
   git checkout -b feature/ticketeria-system
   ```

2. **Estrutura Base:** Crie a estrutura de pastas conforme especificado

3. **API Service:** Comece criando o `TicketApi.ts` com as funções base

4. **Componente por Componente:** Implemente um componente de cada vez, testando antes de avançar

5. **Testes:** Teste cada funcionalidade individualmente antes de integrar

6. **Refinamento:** Após tudo funcionando, revise código e melhore UX

---

## 📝 Notas Importantes

- **Não use Expo:** O projeto usa React Native CLI puro
- **Multi-tenant:** Considere que o projeto suporta múltiplos clientes
- **Offline:** Considere implementar cache básico se tempo permitir
- **Performance:** Otimize renders e use React.memo onde apropriado
- **Acessibilidade:** Considere labels e leitores de tela se possível

---

## 🎓 Pontos Extras (Opcional)

Se terminar antes do prazo ou quiser se destacar:

- [ ] Testes unitários para componentes principais
- [ ] Animações suaves nas transições
- [ ] Modo offline com cache local
- [ ] Notificações push para atualizações de ticket
- [ ] Busca avançada com múltiplos filtros
- [ ] Exportar lista de tickets (PDF/CSV)
- [ ] Gráficos/estatísticas de tickets

---

## ❓ Dúvidas?

Se tiver dúvidas sobre:
- Estrutura do projeto → Consulte `ESTRUTURA_BASE.md`
- Padrões de código → Veja `EXEMPLOS_CODIGO.md` e arquivos similares no projeto
- APIs → Consulte `API_MOCK.md` e estrutura de `src/services/`
- Componentes → Veja exemplos em `EXEMPLOS_CODIGO.md` e crie em `src/components/_fragments/`

---

**Boa sorte! 🚀**

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
