# Conatus Executive Dashboard — Design System v2

Este documento consolida o `designsystem.md` como fonte principal e adiciona parâmetros operacionais para garantir consistência visual, tipográfica e de formatação numérica no dashboard executivo.

## 1) Base canônica herdada
- Mantém integralmente os tokens de cor, tipografia, grid, bordas, raios, estados e regras de gráficos definidos em `designsystem.md`.
- Continua proibida a criação de novas cores HEX, gradientes, glows e efeitos decorativos.
- O idioma da interface permanece **pt-BR** e a moeda padrão é **BRL (R$)**.

## 2) Parâmetros novos (v2)

### 2.1 Formatação numérica padrão
Aplicar em todos os KPIs, tabelas e tooltips:

- **Milhões:** usar sufixo `M` (ex.: `R$ 2,8M`).
- **Milhares:** usar sufixo `k` (ex.: `R$ 845,3k`).
- **< 1.000:** sem sufixo, sem casas decimais desnecessárias (ex.: `934`).
- **Percentual:** sempre com 1 casa decimal e `%` (ex.: `17,4%`).
- **Moeda BRL:** sempre com prefixo e espaço: `R$ `.

### 2.2 Tipografia de KPI (consistência e overflow)
- Todo valor principal de KPI deve usar **Display 30px, Bold, tabular-nums**.
- Valores secundários inline podem usar 20px sem quebrar hierarquia.
- Em telas pequenas, reduzir apenas para preservar legibilidade sem estourar card.
- KPI deve usar:
  - `white-space: nowrap`
  - `overflow: hidden`
  - `text-overflow: ellipsis`

### 2.3 Regras de conteúdo em cards
- Números em cards com significado financeiro devem usar formato monetário compacto (`R$ + valor compactado`).
- Quantidades operacionais (ex.: unidades, volume, contagens) devem usar formatação compacta para evitar overflow.
- Evitar textos longos sem truncamento em áreas de densidade alta.

### 2.4 Estados de alerta em superfícies preenchidas
- Para blocos com preenchimento de status (warning/danger/success), usar texto `txt-modal` quando necessário para contraste.
- Quando houver fundo destrutivo, reforçar separação com borda destrutiva canônica (`str-destructive`).

## 3) Checklist de revisão (v2)
- [ ] Todos os números seguem compactação `M/k` quando aplicável.
- [ ] Todos os valores monetários usam `R$ ` + formato pt-BR.
- [ ] KPIs principais respeitam 30px com tabular-nums.
- [ ] Não há overflow de número em card (comportamento de elipse aplicado).
- [ ] Não há criação de novas cores fora do design system.
- [ ] Alertas com fundo preenchido preservam contraste de texto.

## 4) Relação com o documento original
- Este v2 **não substitui** o `designsystem.md`; ele o complementa com regras de implementação para consistência de dados numéricos e legibilidade em cards.
