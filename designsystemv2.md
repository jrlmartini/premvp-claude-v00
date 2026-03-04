# Conatus Executive Dashboard — Design System v2

Este documento complementa o `designsystem.md` atualizado e detalha decisões de implementação para manter a experiência moderna, consistente e legível no dashboard executivo.

## 1) Base canônica
- O `designsystem.md` permanece a fonte principal.
- Não criar novas cores HEX, sem gradientes e sem efeitos decorativos.
- Idioma obrigatório: `pt-BR`.
- Moeda obrigatória: `BRL` com prefixo `R$ `.

## 2) Regras operacionais de implementação

### 2.1 Formatação de números e moeda
- Usar notação compacta para grandes volumes:
  - Milhões: `M`
  - Milhares: `k`
- Exibir moeda como `R$ ` + número formatado em `pt-BR`.
- Percentuais sempre com 1 casa decimal.
- Aplicar a mesma lógica em KPI, tabela, eixo e tooltip.

### 2.2 Tipografia e overflow de KPI
- Todo KPI principal e KPI em tiles usa **Display 30px** (desktop), com `tabular-nums`.
- Em mobile, reduzir KPI para 24px, mantendo hierarquia visual.
- Valores inline podem usar tamanho menor para apoio.
- Sempre proteger overflow com:
  - `white-space: nowrap`
  - `overflow: hidden`
  - `text-overflow: ellipsis`

### 2.3 Montagem de cards para leitura à distância
- Em cards com números longos, priorizar empilhamento vertical sobre múltiplas colunas apertadas.
- Preservar espaçamento de 8px/16px/24px.
- Não depender de hover para exibir informação crítica.

### 2.4 Tabelas executivas
- Cabeçalhos em sentence case (evitar ALL CAPS).
- Zebra discreta entre `bg-main` e `bg-card`.
- Hover com destaque de borda (`str-hover`) ao invés de tint forte de fundo.

### 2.5 Modo kiosk (tela cheia)
- Alternância de tela cheia via Fullscreen API.
- Em kiosk, ocultar sidebar e rodapé para maximizar área de dados.
- Disponibilizar saída explícita via botão e `Esc`.
- Atalho operacional: `Ctrl/Cmd + Shift + K`.

## 3) Checklist de revisão
- [ ] Tokens de cor estritamente canônicos.
- [ ] KPI em 30px no desktop e 24px no mobile.
- [ ] Formatação numérica compacta consistente em toda a UI.
- [ ] Sem conteúdo crítico dependente de hover.
- [ ] Tabelas com leitura executiva (sentence case + hover por borda).
- [ ] Kiosk funcional e estável.
