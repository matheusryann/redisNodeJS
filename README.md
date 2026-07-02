# RedisNode

Um projeto demonstrando arquitetura moderna de processamento assíncrono com **Node.js**, **Express**, **Redis** e **BullMQ**.

## 🎯 Propósito do Projeto

Este é um servidor que implementa um **sistema de fila de jobs** robusto, processando tarefas assincronamente (ex: envio de emails) com rastreamento completo de status e tratamento de erros.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript de alto desempenho
- **Express.js** - Framework web minimalista e eficiente
- **TypeScript** - Tipagem estática para maior segurança e manutenibilidade

### Data & Queue Processing
- **Redis** - Database em memória de ultra-baixa latência
- **BullMQ** - Sistema de filas robusto e escalável baseado em Redis
- **IORedis** - Cliente Redis com suporte a operações avançadas

### Developer Experience
- **ts-node** - Execução direta de TypeScript
- **dotenv** - Gerenciamento seguro de configurações

## 💡 Arquitetura e Padrões

### Design Patterns Implementados
- ✅ **Async Job Queue** - Processamento assíncrono de tarefas
- ✅ **REST API** - Endpoints bem definidos e escaláveis
- ✅ **Error Handling** - Tratamento robusto de erros e falhas
- ✅ **State Management** - Rastreamento de estado de jobs
- ✅ **Environment Configuration** - Gerenciamento seguro de secrets

### Fluxo de Dados
```
Cliente HTTP → POST /jobs/email → Queue (Redis)
                                    ↓
                             Worker processa
                                    ↓
                      Cliente consulta via GET /jobs/:jobId
                                    ↓
                         Retorna status + resultado
```

## 📊 Funcionalidades

### 1. **Criação de Jobs**
- Aceita requisições HTTP para adicionar jobs à fila
- Retorna ID único para rastreamento
- Processamento desacoplado e não-bloqueante

### 2. **Processamento Assíncrono**
- Workers dedicados processam jobs em paralelo
- Retry automático em caso de falha
- Tratamento de timeout configurável

### 3. **Rastreamento de Status**
- Consulta estado em tempo real de qualquer job
- Estados: `pending`, `active`, `completed`, `failed`
- Detalhes: dados originais, resultados e motivos de falha

### 4. **Observabilidade**
- Integração com **Beekpeek Studio** para visualização
- Monitoramento de fila e dados em tempo real
- Logs estruturados de processamento

## 🔍 Ferramentas de Desenvolvimento

### Beekpeek Studio
Interface visual para:
- 📊 Visualizar dados no Redis em tempo real
- 📋 Gerenciar e inspecionar jobs na fila
- 🔄 Acompanhar ciclo de vida dos jobs

## 📈 Escalabilidade

O projeto foi construído considerando:
- ✅ **Horizontal Scaling** - Múltiplos workers em diferentes máquinas
- ✅ **Performance** - Redis para operações O(1)
- ✅ **Confiabilidade** - Persistência de jobs no Redis
- ✅ **Observabilidade** - Rastreamento completo

## 🛠️ Como Iniciar

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .envexample .env

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📡 API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/jobs/email` | Criar novo job de email |
| GET | `/jobs/:jobId` | Obter status e resultado do job |

### Exemplo de Uso

```bash
# Criar job
curl -X POST http://localhost:3000/jobs/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "usuario@example.com",
    "subject": "Bem-vindo",
    "body": "Obrigado por se cadastrar!"
  }'

# Resposta: { "message": "Seu envio está sendo processado", "jobId": "123" }

# Consultar status
curl http://localhost:3000/jobs/123

# Resposta: { "id": "123", "state": "completed", "name": "send-email", ... }
```

## 🎓 Conceitos Demonstrados

- ⚙️ **Sistemas de Fila** - Desacoplamento e processamento assíncrono
- 🏗️ **Arquitetura em Camadas** - Separação de responsabilidades
- 📝 **TypeScript** - Type-safe code para produção
- 🔐 **Segurança** - Gestão segura de configurações
- 🚀 **Performance** - Otimizações de latência com Redis
- 📊 **Observabilidade** - Monitoramento e debugging

---

**Status:** Projeto ativo e em desenvolvimento contínuo  
