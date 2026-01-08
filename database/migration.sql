-- ==========================================
-- SUPABASE MIGRATION - Documentos Comerciais
-- Propostas, Orçamentos e Contratos
-- ==========================================

-- Habilitar extensão UUID se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- TABELA PRINCIPAL: documentos
-- ==========================================
CREATE TABLE IF NOT EXISTS public.documentos (
    -- Identificação
    id TEXT PRIMARY KEY,
    tipo TEXT NOT NULL CHECK (tipo IN ('proposta', 'orcamento', 'contrato')),
    
    -- Dados do Cliente (JSONB para flexibilidade)
    dados_cliente JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Conteúdo do Documento (JSONB)
    conteudo JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Valores
    valor_total DECIMAL(15, 2) NOT NULL DEFAULT 0,
    
    -- Status do Documento
    status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'pendente', 'aprovado', 'rejeitado', 'cancelado')),
    
    -- Datas
    data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
    data_validade DATE,
    
    -- Metadados
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Usuário (para futuro auth)
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ==========================================
-- ÍNDICES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_documentos_tipo ON public.documentos(tipo);
CREATE INDEX IF NOT EXISTS idx_documentos_status ON public.documentos(status);
CREATE INDEX IF NOT EXISTS idx_documentos_created_at ON public.documentos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documentos_user_id ON public.documentos(user_id);
CREATE INDEX IF NOT EXISTS idx_documentos_cliente_nome ON public.documentos((dados_cliente->>'nome'));

-- ==========================================
-- TRIGGER: Atualizar updated_at
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_documentos_updated_at ON public.documentos;
CREATE TRIGGER trigger_documentos_updated_at
    BEFORE UPDATE ON public.documentos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados verem seus próprios documentos
CREATE POLICY "Usuarios podem ver seus documentos"
    ON public.documentos
    FOR SELECT
    USING (auth.uid() = user_id OR user_id IS NULL);

-- Política para usuários autenticados criarem documentos
CREATE POLICY "Usuarios podem criar documentos"
    ON public.documentos
    FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Política para usuários autenticados atualizarem seus documentos
CREATE POLICY "Usuarios podem atualizar seus documentos"
    ON public.documentos
    FOR UPDATE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- Política para usuários autenticados deletarem seus documentos
CREATE POLICY "Usuarios podem deletar seus documentos"
    ON public.documentos
    FOR DELETE
    USING (auth.uid() = user_id OR user_id IS NULL);

-- ==========================================
-- POLÍTICA PÚBLICA (para desenvolvimento sem auth)
-- Remover em produção com autenticação
-- ==========================================
CREATE POLICY "Acesso publico temporario"
    ON public.documentos
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==========================================
-- COMENTÁRIOS
-- ==========================================
COMMENT ON TABLE public.documentos IS 'Armazena propostas comerciais, orçamentos e contratos';
COMMENT ON COLUMN public.documentos.id IS 'ID único do documento (formato: DOC-XXXXX-XXXXX)';
COMMENT ON COLUMN public.documentos.tipo IS 'Tipo: proposta, orcamento ou contrato';
COMMENT ON COLUMN public.documentos.dados_cliente IS 'JSON com nome, email, documento, responsavel, endereco';
COMMENT ON COLUMN public.documentos.conteudo IS 'JSON com descricao, entregaveis, itens, prazo, formaPagamento, etc';
COMMENT ON COLUMN public.documentos.valor_total IS 'Valor total calculado do documento';
COMMENT ON COLUMN public.documentos.status IS 'Status: rascunho, pendente, aprovado, rejeitado, cancelado';

-- ==========================================
-- EXEMPLO DE ESTRUTURA dados_cliente:
-- {
--   "nome": "Empresa XYZ Ltda",
--   "responsavel": "João Silva",
--   "email": "contato@empresa.com",
--   "documento": "00.000.000/0000-00",
--   "endereco": "Rua ABC, 123 - São Paulo/SP"
-- }
-- ==========================================

-- ==========================================
-- EXEMPLO DE ESTRUTURA conteudo:
-- {
--   "descricao": "Desenvolvimento de sistema web...",
--   "entregaveis": ["Módulo A", "Módulo B", "Documentação"],
--   "itens": [
--     {"descricao": "Desenvolvimento Frontend", "quantidade": 1, "valorUnitario": 5000},
--     {"descricao": "Desenvolvimento Backend", "quantidade": 1, "valorUnitario": 7000}
--   ],
--   "prazo": "30 dias úteis",
--   "formaPagamento": "50% entrada + 50% entrega",
--   "condicoesAdicionais": "...",
--   "garantias": "90 dias de suporte"
-- }
-- ==========================================
