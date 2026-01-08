/**
 * ==========================================
 *  DOCUMENT SERVICE - Camada de Serviço
 *  Integração com Supabase
 * ==========================================
 */

// ===== CONFIGURAÇÃO SUPABASE =====
// Preencha com suas credenciais do Supabase
const SUPABASE_CONFIG = {
    url: 'https://zxvgnobhlbjeagcvwofj.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmdub2JobGJqZWFnY3Z3b2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MzA3OTMsImV4cCI6MjA4MzQwNjc5M30.DFZeibLXW3pqKaK7CWYxx4UA3hD19u87WTMi2Ifz_bU' // Ex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// Flag para habilitar/desabilitar Supabase (mude para true quando configurar)
const USE_SUPABASE = true;

// ===== TIPOS DE DOCUMENTO =====
const DocumentTypes = {
    PROPOSAL: 'proposta',
    BUDGET: 'orcamento',
    CONTRACT: 'contrato'
};

// ===== STATUS DO DOCUMENTO =====
const DocumentStatus = {
    DRAFT: 'rascunho',
    PENDING: 'pendente',
    APPROVED: 'aprovado',
    REJECTED: 'rejeitado',
    CANCELLED: 'cancelado'
};

// ===== GERADOR DE ID ÚNICO =====
function generateDocumentId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const prefix = 'DOC';
    return `${prefix}-${timestamp}-${random}`;
}

// ===== ESTRUTURA DO DOCUMENTO =====
function createDocumentStructure(data) {
    return {
        id: data.id || generateDocumentId(),
        tipo: data.tipo || DocumentTypes.PROPOSAL,
        dados_cliente: {
            nome: data.clienteNome || '',
            responsavel: data.clienteResponsavel || '',
            email: data.clienteEmail || '',
            documento: data.clienteDocumento || '',
            endereco: data.clienteEndereco || ''
        },
        conteudo: {
            descricao: data.descricaoProjeto || '',
            entregaveis: data.entregaveis || [],
            itens: data.itens || [],
            prazo: data.prazo || '',
            formaPagamento: data.formaPagamento || '',
            condicoesAdicionais: data.condicoesAdicionais || '',
            garantias: data.garantias || ''
        },
        valor_total: data.valorTotal || 0,
        data_emissao: data.dataEmissao || new Date().toISOString().split('T')[0],
        validade: data.validade || '',
        status: data.status || DocumentStatus.DRAFT,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}

// ===== SERVIÇO DE DOCUMENTOS =====
const DocumentService = {
    // Cliente Supabase
    supabaseClient: null,

    // Inicializar cliente Supabase
    async init() {
        if (USE_SUPABASE && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
            try {
                // Importar Supabase dinamicamente
                const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
                this.supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
                console.log('[DocumentService] Conectado ao Supabase');
            } catch (error) {
                console.warn('[DocumentService] Erro ao conectar Supabase:', error);
                console.log('[DocumentService] Usando modo local (localStorage)');
            }
        } else {
            console.log('[DocumentService] Modo local ativo (configure SUPABASE_CONFIG para usar nuvem)');
        }
    },

    // Verificar se Supabase está disponível
    isSupabaseAvailable() {
        return this.supabaseClient !== null;
    },

    // Salvar documento
    async save(documentData) {
        const document = createDocumentStructure(documentData);
        
        if (this.isSupabaseAvailable()) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('documentos')
                    .upsert({
                        id: document.id,
                        tipo: document.tipo,
                        dados_cliente: document.dados_cliente,
                        conteudo: document.conteudo,
                        valor_total: document.valor_total,
                        status: document.status,
                        data_emissao: document.data_emissao,
                        data_validade: document.validade || null
                    })
                    .select()
                    .single();
                
                if (error) throw error;
                console.log('[DocumentService] Documento salvo no Supabase:', document.id);
                return data;
            } catch (error) {
                console.error('[DocumentService] Erro Supabase, salvando local:', error);
            }
        }

        // Fallback: localStorage
        const documents = this.getLocalDocuments();
        const existingIndex = documents.findIndex(d => d.id === document.id);
        
        if (existingIndex >= 0) {
            documents[existingIndex] = { ...document, updated_at: new Date().toISOString() };
        } else {
            documents.push(document);
        }
        
        localStorage.setItem('gq_documents', JSON.stringify(documents));
        console.log('[DocumentService] Documento salvo localmente:', document.id);
        return document;
    },

    // Buscar documento por ID
    async getById(id) {
        if (this.isSupabaseAvailable()) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('documentos')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                return data;
            } catch (error) {
                console.error('[DocumentService] Erro ao buscar do Supabase:', error);
            }
        }

        // Fallback: localStorage
        const documents = this.getLocalDocuments();
        return documents.find(d => d.id === id) || null;
    },

    // Listar todos os documentos
    async getAll() {
        if (this.isSupabaseAvailable()) {
            try {
                const { data, error } = await this.supabaseClient
                    .from('documentos')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                return data;
            } catch (error) {
                console.error('[DocumentService] Erro ao listar do Supabase:', error);
            }
        }

        // Fallback: localStorage
        return this.getLocalDocuments();
    },

    // Deletar documento
    async delete(id) {
        if (this.isSupabaseAvailable()) {
            try {
                const { error } = await this.supabaseClient
                    .from('documentos')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                console.log('[DocumentService] Documento deletado do Supabase:', id);
                return;
            } catch (error) {
                console.error('[DocumentService] Erro ao deletar do Supabase:', error);
            }
        }

        // Fallback: localStorage
        const documents = this.getLocalDocuments();
        const filtered = documents.filter(d => d.id !== id);
        localStorage.setItem('gq_documents', JSON.stringify(filtered));
        console.log('[DocumentService] Documento deletado:', id);
    },

    // Atualizar status
    async updateStatus(id, status) {
        const document = await this.getById(id);
        if (document) {
            document.status = status;
            document.updated_at = new Date().toISOString();
            return await this.save(document);
        }
        return null;
    },

    // Helpers locais
    getLocalDocuments() {
        try {
            return JSON.parse(localStorage.getItem('gq_documents') || '[]');
        } catch {
            return [];
        }
    }
};

// ===== TEXTOS PADRÃO PARA DOCUMENTOS =====
const DefaultTexts = {
    apresentacao: `Esta proposta tem como objetivo a prestação de serviços de desenvolvimento de software e/ou soluções tecnológicas, conforme escopo descrito abaixo, visando atender às necessidades específicas do contratante.`,
    
    escopo: `O presente projeto contempla o desenvolvimento de soluções digitais, incluindo planejamento, design, implementação, testes e entrega, conforme especificações acordadas entre as partes.`,
    
    prazo: `O prazo de execução terá início após a aprovação formal desta proposta e cumprimento das condições comerciais estabelecidas.`,
    
    pagamento: `Os valores descritos serão pagos conforme cronograma acordado, podendo ser parcelados ou condicionados a marcos de entrega.`,
    
    propriedadeIntelectual: `Os direitos de uso do software desenvolvido serão transferidos ao contratante após a quitação integral dos valores acordados, exceto bibliotecas de terceiros.`,
    
    suporte: `Será oferecido suporte técnico por período previamente definido, limitado a correções de defeitos relacionados ao escopo original.`,
    
    confidencialidade: `Ambas as partes comprometem-se a manter sigilo sobre informações técnicas, comerciais e estratégicas compartilhadas durante a execução do projeto.`,
    
    rescisao: `O contrato poderá ser rescindido por qualquer das partes mediante aviso prévio, respeitando os valores proporcionais aos serviços já executados.`
};

// ===== EXPORTAÇÕES =====
window.DocumentService = DocumentService;
window.DocumentTypes = DocumentTypes;
window.DocumentStatus = DocumentStatus;
window.DefaultTexts = DefaultTexts;
window.generateDocumentId = generateDocumentId;
window.createDocumentStructure = createDocumentStructure;

// Inicializar serviço
DocumentService.init();
