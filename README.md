# 🗂️ Kanban — Gerenciador de Tarefas

Um **Kanban interativo** desenvolvido com **HTML, CSS e JavaScript puro**.  
Permite criar, visualizar, mover (arrastar e soltar) e excluir tarefas entre três colunas: **A Fazer**, **Em Andamento** e **Concluído**. As tarefas são persistidas no navegador via **LocalStorage**.

Este projeto foi desenvolvido como parte de um processo seletivo e prioriza clareza, usabilidade e robustez funcional.

---

## Deploy
 Link do deploy:  
**[Veritas-kanban](https://veritas-kanban.vercel.app)**

---

## ⚙️ Como executar localmente

> Não há backend — o projeto roda inteiramente no navegador.

1. Clone o repositório:
```bash
git clone https://github.com/Amanda-FL-CAOS/desafio-fullstack-veritas.git
```
2. Entre na pasta do projeto:
```
cd kanban
```

Abra o arquivo index.html no navegador (ou use Live Server no VSCode para desenvolvimento local).

## 🧭 Funcionalidades

- Criar tarefas com título e descrição.
- Visualizar detalhes da tarefa em modal.
- Mover tarefas entre colunas por drag & drop e por botões no modal.
- Excluir tarefas.
- Persistência local via LocalStorage.
- IDs únicos por tarefa (para facilitar movimentação, identificação e persistência).

## 💡 Decisões técnicas:

- JavaScript puro — escolhido por ser a linguagem com a qual o desenvolvedor tem maior familiaridade, permitindo controle direto sobre DOM e comportamento do app sem overhead de bibliotecas.
- Gerador de IDs: cada tarefa recebe um identificador gerado a partir de Date.now() somado a um valor aleatório. Essa solução é:
- Simples e determinística (evita colisões na prática).
- Independente de servidores ou bibliotecas externas.
- Suficiente para o escopo deste projeto (persistência local e operações CRUD básicas).
- Persistência: uso de localStorage para manter as tarefas entre recarregamentos do navegador.

## ⚠️ Limitações:

- Visual / UX: o comportamento de arrastar pode ser aprimorado com animações mais suaves e suporte a reordenamento dentro da mesma coluna (hoje a movimentação troca apenas o quadro da tarefa).
- Escopo do backend: o projeto não inclui backend — armazenamento e sincronização entre dispositivos não estão implementados.
- Ferramentas/Frameworks: não foram utilizados frameworks (React, Vue, etc.) nem bibliotecas de drag (ex.: SortableJS).
- Uma limitação apontada foi a falta de familiaridade com Golang e frameworks que poderiam ser utilizados caso um backend fosse implementado — porém a escolha por solução front-end pura foi deliberada para garantir entrega rápida e estável do MVP.
- Importante: nenhuma dessas limitações impediu a entrega de um projeto completo, funcional e com boa experiência de uso — o aplicativo cumpre todas as funcionalidades mínimas esperadas e apresenta um design intencionalmente agradável.

## 🌱 Melhorias planejadas

- Implementar reordenamento dentro da mesma coluna (drag & drop com ordenação).
- Adicionar animações e microinterações no drag (transições, placeholder visual).
- Criar API/Backend (opcional) para persistência remota e autenticação de usuários.
- Tornar a interface totalmente responsiva e otimizada para dispositivos móveis.
- Possível migração para framework/componentização para facilitar escalabilidade.

## ✅ Considerações finais:

Este projeto demonstra capacidade de construir uma aplicação front-end completa com JavaScript puro: lógica de criação/edição/movimentação/exclusão de tarefas, persistência local e interação rica com drag & drop.
A execução foca em entregar um produto utilizável e apresentável para um processo seletivo, refletindo cuidado com arquitetura, experiência do usuário e organização do código.

## Desenvolvido por
Amanda Fernandes
