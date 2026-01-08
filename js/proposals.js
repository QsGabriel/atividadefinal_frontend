/**
 * ==========================================
 *  PROPOSALS PAGE - JavaScript
 *  Lógica para Geração de Propostas
 * ==========================================
 */

// ===== ESTADO DA APLICAÇÃO =====
const ProposalState = {
    documentId: '',
    tipo: 'proposta',
    dataEmissao: '',
    validade: '',
    cliente: {
        nome: '',
        responsavel: '',
        email: '',
        documento: '',
        endereco: ''
    },
    projeto: {
        descricao: '',
        entregaveis: [
            { 
                titulo: '', 
                tipo: 'feature', // feature, functional, non-functional, task
                subitens: [] 
            }
        ]
    },
    itens: [
        { descricao: '', quantidade: 1, valorUnitario: 0 }
    ],
    condicoes: {
        prazo: '',
        formaPagamento: '',
        condicoesAdicionais: '',
        garantias: ''
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeDocument();
    bindEvents();
    renderDeliverables();
    updatePreview();
});

// ===== GERAR ID DO DOCUMENTO =====
function initializeDocument() {
    ProposalState.documentId = generateDocumentId();
    ProposalState.dataEmissao = formatDate(new Date());
    
    // Validade padrão: 30 dias
    const validadeDate = new Date();
    validadeDate.setDate(validadeDate.getDate() + 30);
    ProposalState.validade = formatDate(validadeDate);
    
    // Atualizar campos
    document.getElementById('documentId').textContent = ProposalState.documentId;
    document.getElementById('dataEmissao').value = ProposalState.dataEmissao;
    document.getElementById('validade').value = ProposalState.validade;
}

// ===== BIND DE EVENTOS =====
function bindEvents() {
    // Tipo de documento
    document.getElementById('tipoDocumento').addEventListener('change', (e) => {
        ProposalState.tipo = e.target.value;
        updatePreview();
    });
    
    // Datas
    document.getElementById('dataEmissao').addEventListener('change', (e) => {
        ProposalState.dataEmissao = e.target.value;
        updatePreview();
    });
    
    document.getElementById('validade').addEventListener('change', (e) => {
        ProposalState.validade = e.target.value;
        updatePreview();
    });
    
    // Dados do cliente
    bindClientInputs();
    
    // Projeto
    bindProjectInputs();
    
    // Itens
    bindItemsEvents();
    
    // Condições
    bindConditionsInputs();
    
    // Seções colapsáveis
    bindSectionToggles();
    
    // Ações
    document.getElementById('btnSaveDraft').addEventListener('click', saveDraft);
    document.getElementById('btnExportPdf').addEventListener('click', exportPDF);
    document.getElementById('btnCopyId').addEventListener('click', copyDocumentId);
    
    // Entregáveis
    document.getElementById('btnAddDeliverable').addEventListener('click', addDeliverable);
    
    // Modal de Rascunhos
    bindDraftsModal();
}

// ===== BIND INPUTS DO CLIENTE =====
function bindClientInputs() {
    const inputs = ['clienteNome', 'clienteResponsavel', 'clienteEmail', 'clienteDocumento', 'clienteEndereco'];
    const keys = ['nome', 'responsavel', 'email', 'documento', 'endereco'];
    
    inputs.forEach((id, index) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                ProposalState.cliente[keys[index]] = e.target.value;
                updatePreview();
            });
        }
    });
}

// ===== BIND INPUTS DO PROJETO =====
function bindProjectInputs() {
    document.getElementById('descricaoProjeto').addEventListener('input', (e) => {
        ProposalState.projeto.descricao = e.target.value;
        updatePreview();
    });
}

// ===== BIND INPUTS DAS CONDIÇÕES =====
function bindConditionsInputs() {
    const inputs = ['prazo', 'formaPagamento', 'condicoesAdicionais', 'garantias'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                ProposalState.condicoes[id] = e.target.value;
                updatePreview();
            });
        }
    });
}

// ===== EVENTOS DOS ITENS =====
function bindItemsEvents() {
    document.getElementById('btnAddItem').addEventListener('click', addItem);
    
    // Bind inicial dos itens
    rebindItemInputs();
}

function rebindItemInputs() {
    const tbody = document.getElementById('itemsTableBody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach((row, index) => {
        const descInput = row.querySelector('.item-desc');
        const qtyInput = row.querySelector('.item-qty');
        const priceInput = row.querySelector('.item-price');
        const removeBtn = row.querySelector('.pp-remove-item');
        
        if (descInput) {
            descInput.addEventListener('input', (e) => {
                ProposalState.itens[index].descricao = e.target.value;
                updatePreview();
            });
        }
        
        if (qtyInput) {
            qtyInput.addEventListener('input', (e) => {
                ProposalState.itens[index].quantidade = parseInt(e.target.value) || 0;
                updateItemTotal(row, index);
                updatePreview();
            });
        }
        
        if (priceInput) {
            priceInput.addEventListener('input', (e) => {
                ProposalState.itens[index].valorUnitario = parseFloat(e.target.value) || 0;
                updateItemTotal(row, index);
                updatePreview();
            });
        }
        
        if (removeBtn) {
            removeBtn.onclick = () => removeItem(index);
        }
    });
}

function updateItemTotal(row, index) {
    const item = ProposalState.itens[index];
    const total = item.quantidade * item.valorUnitario;
    const totalCell = row.querySelector('.pp-item-total');
    if (totalCell) {
        totalCell.textContent = formatCurrency(total);
    }
    updateGrandTotal();
}

function updateGrandTotal() {
    const total = ProposalState.itens.reduce((sum, item) => {
        return sum + (item.quantidade * item.valorUnitario);
    }, 0);
    
    document.getElementById('grandTotal').textContent = formatCurrency(total);
}

function addItem() {
    ProposalState.itens.push({ descricao: '', quantidade: 1, valorUnitario: 0 });
    renderItemsTable();
    updatePreview();
}

function removeItem(index) {
    if (ProposalState.itens.length > 1) {
        ProposalState.itens.splice(index, 1);
        renderItemsTable();
        updatePreview();
    } else {
        showToast('Mantenha pelo menos um item', 'error');
    }
}

function renderItemsTable() {
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = ProposalState.itens.map((item, index) => `
        <tr>
            <td>
                <input type="text" class="pp-input item-desc" placeholder="Descrição do item" value="${escapeHtml(item.descricao)}">
            </td>
            <td>
                <input type="number" class="pp-input pp-input-qty item-qty" min="1" value="${item.quantidade}">
            </td>
            <td>
                <input type="number" class="pp-input pp-input-price item-price" min="0" step="0.01" value="${item.valorUnitario}">
            </td>
            <td class="pp-item-total">${formatCurrency(item.quantidade * item.valorUnitario)}</td>
            <td>
                <button type="button" class="pp-remove-item" title="Remover item">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    rebindItemInputs();
    updateGrandTotal();
}

// ===== ENTREGÁVEIS =====
function addDeliverable() {
    ProposalState.projeto.entregaveis.push({ 
        titulo: '', 
        tipo: 'feature',
        subitens: [] 
    });
    renderDeliverables();
}

function removeDeliverable(index) {
    if (ProposalState.projeto.entregaveis.length > 1) {
        ProposalState.projeto.entregaveis.splice(index, 1);
        renderDeliverables();
        updatePreview();
    } else {
        showToast('Mantenha pelo menos um entregável', 'error');
    }
}

function addSubitem(deliverableIndex) {
    ProposalState.projeto.entregaveis[deliverableIndex].subitens.push({
        texto: '',
        tipo: 'functional' // functional, non-functional, note
    });
    renderDeliverables();
}

function removeSubitem(deliverableIndex, subitemIndex) {
    ProposalState.projeto.entregaveis[deliverableIndex].subitens.splice(subitemIndex, 1);
    renderDeliverables();
    updatePreview();
}

function getDeliverableTypeIcon(tipo) {
    const icons = {
        'feature': 'fa-cube',
        'functional': 'fa-check-circle',
        'non-functional': 'fa-shield-alt',
        'task': 'fa-tasks'
    };
    return icons[tipo] || 'fa-cube';
}

function getDeliverableTypeLabel(tipo) {
    const labels = {
        'feature': 'Funcionalidade',
        'functional': 'Req. Funcional',
        'non-functional': 'Req. Não Funcional',
        'task': 'Tarefa'
    };
    return labels[tipo] || 'Item';
}

function getSubitemTypeIcon(tipo) {
    const icons = {
        'functional': 'fa-check',
        'non-functional': 'fa-shield-alt',
        'note': 'fa-sticky-note'
    };
    return icons[tipo] || 'fa-check';
}

function renderDeliverables() {
    const container = document.getElementById('deliverablesList');
    container.innerHTML = ProposalState.projeto.entregaveis.map((entregavel, index) => `
        <div class="pp-deliverable-card" data-index="${index}">
            <div class="pp-deliverable-header">
                <div class="pp-deliverable-type-select">
                    <select class="pp-select pp-select-sm deliverable-type" data-index="${index}">
                        <option value="feature" ${entregavel.tipo === 'feature' ? 'selected' : ''}>🧊 Funcionalidade</option>
                        <option value="functional" ${entregavel.tipo === 'functional' ? 'selected' : ''}>✅ Req. Funcional</option>
                        <option value="non-functional" ${entregavel.tipo === 'non-functional' ? 'selected' : ''}>🛡️ Req. Não Funcional</option>
                        <option value="task" ${entregavel.tipo === 'task' ? 'selected' : ''}>📋 Tarefa</option>
                    </select>
                </div>
                <div class="pp-deliverable-title-wrapper">
                    <input type="text" class="pp-input deliverable-input" 
                           placeholder="Título do entregável" 
                           value="${escapeHtml(entregavel.titulo)}"
                           data-index="${index}">
                </div>
                <div class="pp-deliverable-actions">
                    <button type="button" class="pp-btn-icon-sm pp-btn-add-subitem" onclick="addSubitem(${index})" title="Adicionar subitem">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" class="pp-btn-icon-sm pp-btn-remove" onclick="removeDeliverable(${index})" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${entregavel.subitens.length > 0 ? `
                <div class="pp-subitems-list">
                    ${entregavel.subitens.map((subitem, subIndex) => `
                        <div class="pp-subitem" data-deliverable="${index}" data-subitem="${subIndex}">
                            <select class="pp-select pp-select-xs subitem-type" data-deliverable="${index}" data-subitem="${subIndex}">
                                <option value="functional" ${subitem.tipo === 'functional' ? 'selected' : ''}>RF</option>
                                <option value="non-functional" ${subitem.tipo === 'non-functional' ? 'selected' : ''}>RNF</option>
                                <option value="note" ${subitem.tipo === 'note' ? 'selected' : ''}>Nota</option>
                            </select>
                            <input type="text" class="pp-input pp-input-sm subitem-input" 
                                   placeholder="Descrição do requisito..." 
                                   value="${escapeHtml(subitem.texto)}"
                                   data-deliverable="${index}" 
                                   data-subitem="${subIndex}">
                            <div class="pp-text-format-btns">
                                <button type="button" class="pp-format-btn" onclick="applyFormat(this, 'bold')" title="Negrito">
                                    <i class="fas fa-bold"></i>
                                </button>
                                <button type="button" class="pp-format-btn" onclick="applyFormat(this, 'italic')" title="Itálico">
                                    <i class="fas fa-italic"></i>
                                </button>
                                <button type="button" class="pp-format-btn" onclick="applyFormat(this, 'code')" title="Código">
                                    <i class="fas fa-code"></i>
                                </button>
                            </div>
                            <button type="button" class="pp-btn-icon-xs pp-btn-remove" onclick="removeSubitem(${index}, ${subIndex})" title="Remover">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Rebind inputs dos títulos
    container.querySelectorAll('.deliverable-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.index);
            ProposalState.projeto.entregaveis[idx].titulo = e.target.value;
            updatePreview();
        });
    });
    
    // Rebind selects de tipo do entregável
    container.querySelectorAll('.deliverable-type').forEach(select => {
        select.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.index);
            ProposalState.projeto.entregaveis[idx].tipo = e.target.value;
            updatePreview();
        });
    });
    
    // Rebind inputs dos subitens
    container.querySelectorAll('.subitem-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const delIdx = parseInt(e.target.dataset.deliverable);
            const subIdx = parseInt(e.target.dataset.subitem);
            ProposalState.projeto.entregaveis[delIdx].subitens[subIdx].texto = e.target.value;
            updatePreview();
        });
    });
    
    // Rebind selects de tipo do subitem
    container.querySelectorAll('.subitem-type').forEach(select => {
        select.addEventListener('change', (e) => {
            const delIdx = parseInt(e.target.dataset.deliverable);
            const subIdx = parseInt(e.target.dataset.subitem);
            ProposalState.projeto.entregaveis[delIdx].subitens[subIdx].tipo = e.target.value;
            updatePreview();
        });
    });
}

// ===== FORMATAÇÃO DE TEXTO =====
function applyFormat(btn, format) {
    const container = btn.closest('.pp-subitem');
    const input = container.querySelector('.subitem-input');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    const selectedText = text.substring(start, end);
    
    if (selectedText.length === 0) {
        showToast('Selecione um texto para formatar', 'error');
        return;
    }
    
    let formattedText = '';
    switch (format) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `_${selectedText}_`;
            break;
        case 'code':
            formattedText = `\`${selectedText}\``;
            break;
        default:
            formattedText = selectedText;
    }
    
    input.value = text.substring(0, start) + formattedText + text.substring(end);
    
    // Atualizar estado
    const delIdx = parseInt(input.dataset.deliverable);
    const subIdx = parseInt(input.dataset.subitem);
    ProposalState.projeto.entregaveis[delIdx].subitens[subIdx].texto = input.value;
    
    // Restaurar foco
    input.focus();
    input.setSelectionRange(start, start + formattedText.length);
    
    updatePreview();
}

// Função para renderizar texto com formatação
function renderFormattedText(text) {
    if (!text) return '';
    return escapeHtml(text)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
}

// ===== SEÇÕES COLAPSÁVEIS =====
function bindSectionToggles() {
    document.querySelectorAll('.pp-section-header').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.closest('.pp-section');
            section.classList.toggle('collapsed');
        });
    });
}

// ===== ATUALIZAR PREVIEW =====
function updatePreview() {
    const preview = document.getElementById('documentPreview');
    const total = ProposalState.itens.reduce((sum, item) => {
        return sum + (item.quantidade * item.valorUnitario);
    }, 0);
    
    const tipoLabel = {
        'proposta': 'Proposta Comercial',
        'orcamento': 'Orçamento',
        'contrato': 'Contrato de Prestação de Serviços'
    };
    
    // Gerar HTML dos entregáveis com subitens
    const entregaveisHtml = ProposalState.projeto.entregaveis
        .filter(e => e.titulo && e.titulo.trim())
        .map(entregavel => {
            const tipoClass = `pp-doc-deliverable-${entregavel.tipo}`;
            const tipoLabels = {
                'feature': 'Funcionalidade',
                'functional': 'Requisito Funcional',
                'non-functional': 'Requisito Não Funcional',
                'task': 'Tarefa'
            };
            
            let subitemsHtml = '';
            if (entregavel.subitens && entregavel.subitens.length > 0) {
                const validSubitems = entregavel.subitens.filter(s => s.texto && s.texto.trim());
                if (validSubitems.length > 0) {
                    subitemsHtml = `
                        <ul class="pp-doc-subitems">
                            ${validSubitems.map(sub => {
                                const subLabel = sub.tipo === 'functional' ? 'RF' : 
                                                 sub.tipo === 'non-functional' ? 'RNF' : 'Nota';
                                return `<li><span class="pp-doc-subitem-tag pp-doc-tag-${sub.tipo}">${subLabel}</span> ${renderFormattedText(sub.texto)}</li>`;
                            }).join('')}
                        </ul>
                    `;
                }
            }
            
            return `
                <div class="pp-doc-deliverable ${tipoClass}">
                    <div class="pp-doc-deliverable-header">
                        <span class="pp-doc-deliverable-badge">${tipoLabels[entregavel.tipo] || 'Item'}</span>
                        <span class="pp-doc-deliverable-title">${escapeHtml(entregavel.titulo)}</span>
                    </div>
                    ${subitemsHtml}
                </div>
            `;
        }).join('') || '<p class="pp-doc-text" style="color: #999;">Nenhum entregável definido</p>';
    
    const itensHtml = ProposalState.itens
        .filter(item => item.descricao.trim())
        .map(item => `
            <tr>
                <td>${escapeHtml(item.descricao)}</td>
                <td style="text-align: center;">${item.quantidade}</td>
                <td style="text-align: right;">${formatCurrency(item.valorUnitario)}</td>
                <td>${formatCurrency(item.quantidade * item.valorUnitario)}</td>
            </tr>
        `).join('') || `
            <tr>
                <td colspan="4" style="text-align: center; color: #999;">Nenhum item adicionado</td>
            </tr>
        `;
    
    preview.innerHTML = `
        <!-- Cabeçalho -->
        <div class="pp-doc-header">
            <div class="pp-doc-logo">
                <div class="pp-doc-logo-icon">GQ</div>
                <div class="pp-doc-logo-text">Gabriel Queiroz</div>
            </div>
            <div class="pp-doc-info">
                <div class="pp-doc-type">${tipoLabel[ProposalState.tipo]}</div>
                <div class="pp-doc-id">${ProposalState.documentId}</div>
                <div class="pp-doc-date">Emissão: ${formatDateDisplay(ProposalState.dataEmissao)} | Validade: ${formatDateDisplay(ProposalState.validade)}</div>
            </div>
        </div>
        
        <!-- Apresentação -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Apresentação</div>
            <p class="pp-doc-text">${DefaultTexts.apresentacao}</p>
        </div>
        
        <!-- Dados do Cliente -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Dados do Cliente</div>
            <div class="pp-doc-client-info">
                <div class="pp-doc-client-row">
                    <span class="pp-doc-client-label">Nome:</span>
                    <span class="pp-doc-client-value">${escapeHtml(ProposalState.cliente.nome) || '—'}</span>
                </div>
                <div class="pp-doc-client-row">
                    <span class="pp-doc-client-label">CPF/CNPJ:</span>
                    <span class="pp-doc-client-value">${escapeHtml(ProposalState.cliente.documento) || '—'}</span>
                </div>
                <div class="pp-doc-client-row">
                    <span class="pp-doc-client-label">Responsável:</span>
                    <span class="pp-doc-client-value">${escapeHtml(ProposalState.cliente.responsavel) || '—'}</span>
                </div>
                <div class="pp-doc-client-row">
                    <span class="pp-doc-client-label">E-mail:</span>
                    <span class="pp-doc-client-value">${escapeHtml(ProposalState.cliente.email) || '—'}</span>
                </div>
                ${ProposalState.cliente.endereco ? `
                <div class="pp-doc-client-row" style="grid-column: 1 / -1;">
                    <span class="pp-doc-client-label">Endereço:</span>
                    <span class="pp-doc-client-value">${escapeHtml(ProposalState.cliente.endereco)}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Descrição do Projeto -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Descrição do Projeto</div>
            <p class="pp-doc-text">${escapeHtml(ProposalState.projeto.descricao) || DefaultTexts.escopo}</p>
        </div>
        
        <!-- Escopo e Entregáveis -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Escopo e Entregáveis</div>
            <div class="pp-doc-deliverables-container">
                ${entregaveisHtml}
            </div>
        </div>
        
        <!-- Valores -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Valores</div>
            <table class="pp-doc-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Descrição</th>
                        <th style="width: 15%; text-align: center;">Qtd</th>
                        <th style="width: 17%; text-align: right;">Valor Unit.</th>
                        <th style="width: 18%;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itensHtml}
                </tbody>
            </table>
            <div class="pp-doc-total-row">
                <div class="pp-doc-total">
                    <span class="pp-doc-total-label">VALOR TOTAL:</span>
                    <span class="pp-doc-total-value">${formatCurrency(total)}</span>
                </div>
            </div>
        </div>
        
        <!-- Condições Comerciais -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Condições Comerciais</div>
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Prazo de Execução</div>
                <p class="pp-doc-clause-text">${escapeHtml(ProposalState.condicoes.prazo) || DefaultTexts.prazo}</p>
            </div>
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Forma de Pagamento</div>
                <p class="pp-doc-clause-text">${escapeHtml(ProposalState.condicoes.formaPagamento) || DefaultTexts.pagamento}</p>
            </div>
            ${ProposalState.condicoes.condicoesAdicionais ? `
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Condições Adicionais</div>
                <p class="pp-doc-clause-text">${escapeHtml(ProposalState.condicoes.condicoesAdicionais)}</p>
            </div>
            ` : ''}
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Garantia e Suporte</div>
                <p class="pp-doc-clause-text">${escapeHtml(ProposalState.condicoes.garantias) || DefaultTexts.suporte}</p>
            </div>
        </div>
        
        <!-- Cláusulas Contratuais -->
        <div class="pp-doc-section">
            <div class="pp-doc-section-title">Cláusulas Contratuais</div>
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Propriedade Intelectual</div>
                <p class="pp-doc-clause-text">${DefaultTexts.propriedadeIntelectual}</p>
            </div>
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Confidencialidade</div>
                <p class="pp-doc-clause-text">${DefaultTexts.confidencialidade}</p>
            </div>
            <div class="pp-doc-clause">
                <div class="pp-doc-clause-title">Rescisão</div>
                <p class="pp-doc-clause-text">${DefaultTexts.rescisao}</p>
            </div>
        </div>
        
        <!-- Assinaturas -->
        <div class="pp-doc-signatures">
            <div class="pp-doc-signature">
                <div class="pp-doc-signature-line">
                    <div class="pp-doc-signature-name">${escapeHtml(ProposalState.cliente.nome) || 'CONTRATANTE'}</div>
                    <div class="pp-doc-signature-role">Contratante</div>
                </div>
            </div>
            <div class="pp-doc-signature">
                <div class="pp-doc-signature-line">
                    <div class="pp-doc-signature-name">Gabriel Queiroz de Souza</div>
                    <div class="pp-doc-signature-role">Contratada</div>
                </div>
            </div>
        </div>
        
        <!-- Rodapé -->
        <div class="pp-doc-footer">
            <span>Gabriel Queiroz | Desenvolvimento de Software</span>
            <span>${ProposalState.documentId}</span>
            <span>Página 1 de 1</span>
        </div>
    `;
}

// ===== AÇÕES =====
async function saveDraft() {
    try {
        const total = ProposalState.itens.reduce((sum, item) => {
            return sum + (item.quantidade * item.valorUnitario);
        }, 0);
        
        // Filtrar entregáveis válidos com seus subitens
        const entregaveisValidos = ProposalState.projeto.entregaveis
            .filter(e => e.titulo && e.titulo.trim())
            .map(e => ({
                titulo: e.titulo,
                tipo: e.tipo,
                subitens: e.subitens.filter(s => s.texto && s.texto.trim())
            }));
        
        const documentData = {
            id: ProposalState.documentId,
            tipo: ProposalState.tipo,
            clienteNome: ProposalState.cliente.nome,
            clienteResponsavel: ProposalState.cliente.responsavel,
            clienteEmail: ProposalState.cliente.email,
            clienteDocumento: ProposalState.cliente.documento,
            clienteEndereco: ProposalState.cliente.endereco,
            descricaoProjeto: ProposalState.projeto.descricao,
            entregaveis: entregaveisValidos,
            itens: ProposalState.itens,
            prazo: ProposalState.condicoes.prazo,
            formaPagamento: ProposalState.condicoes.formaPagamento,
            condicoesAdicionais: ProposalState.condicoes.condicoesAdicionais,
            garantias: ProposalState.condicoes.garantias,
            valorTotal: total,
            dataEmissao: ProposalState.dataEmissao,
            validade: ProposalState.validade
        };
        
        await DocumentService.save(documentData);
        showToast('Rascunho salvo com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar:', error);
        showToast('Erro ao salvar rascunho', 'error');
    }
}

async function exportPDF() {
    showToast('Gerando PDF...', 'success');
    
    // Usar a API de impressão do navegador
    setTimeout(() => {
        const preview = document.getElementById('documentPreview');
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${ProposalState.documentId} - ${ProposalState.tipo}</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'Inter', sans-serif;
                        font-size: 11px;
                        line-height: 1.5;
                        color: #1a1a2e;
                        background: white;
                    }
                    .pp-document {
                        padding: 40px;
                        max-width: 210mm;
                        margin: 0 auto;
                        position: relative;
                        min-height: 297mm;
                    }
                    .pp-doc-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #0A2E5A;
                        margin-bottom: 25px;
                    }
                    .pp-doc-logo {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .pp-doc-logo-icon {
                        width: 45px;
                        height: 45px;
                        background: linear-gradient(135deg, #0A2E5A, #155AAE);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 700;
                        font-size: 16px;
                    }
                    .pp-doc-logo-text {
                        font-family: 'Poppins', sans-serif;
                        font-size: 18px;
                        font-weight: 700;
                        color: #0A2E5A;
                    }
                    .pp-doc-info { text-align: right; }
                    .pp-doc-type {
                        font-family: 'Poppins', sans-serif;
                        font-size: 20px;
                        font-weight: 700;
                        color: #0A2E5A;
                        text-transform: uppercase;
                        margin-bottom: 5px;
                    }
                    .pp-doc-id {
                        font-size: 10px;
                        color: #666;
                        font-family: monospace;
                    }
                    .pp-doc-date {
                        font-size: 10px;
                        color: #666;
                        margin-top: 3px;
                    }
                    .pp-doc-section { margin-bottom: 20px; }
                    .pp-doc-section-title {
                        font-family: 'Poppins', sans-serif;
                        font-size: 12px;
                        font-weight: 600;
                        color: #0A2E5A;
                        padding-bottom: 6px;
                        border-bottom: 1px solid #e0e0e0;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 0.03em;
                    }
                    .pp-doc-text {
                        color: #333;
                        font-size: 10px;
                        line-height: 1.6;
                        text-align: justify;
                    }
                    .pp-doc-client-info {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 8px;
                    }
                    .pp-doc-client-row {
                        display: flex;
                        gap: 8px;
                    }
                    .pp-doc-client-label {
                        font-weight: 600;
                        color: #555;
                        min-width: 80px;
                        font-size: 10px;
                    }
                    .pp-doc-client-value {
                        color: #1a1a2e;
                        font-size: 10px;
                    }
                    .pp-doc-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 10px 0;
                        font-size: 10px;
                    }
                    .pp-doc-table th {
                        background: #0A2E5A;
                        color: white;
                        padding: 8px 10px;
                        text-align: left;
                        font-weight: 600;
                        font-size: 9px;
                        text-transform: uppercase;
                    }
                    .pp-doc-table th:last-child { text-align: right; }
                    .pp-doc-table td {
                        padding: 8px 10px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .pp-doc-table td:last-child {
                        text-align: right;
                        font-weight: 500;
                    }
                    .pp-doc-table tr:nth-child(even) { background: #f8f9fa; }
                    .pp-doc-total-row {
                        display: flex;
                        justify-content: flex-end;
                        padding: 12px 0;
                        border-top: 2px solid #0A2E5A;
                        margin-top: 5px;
                    }
                    .pp-doc-total {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }
                    .pp-doc-total-label {
                        font-size: 12px;
                        font-weight: 600;
                        color: #333;
                    }
                    .pp-doc-total-value {
                        font-family: 'Poppins', sans-serif;
                        font-size: 18px;
                        font-weight: 700;
                        color: #0A2E5A;
                    }
                    .pp-doc-clause { margin-bottom: 10px; }
                    .pp-doc-clause-title {
                        font-weight: 600;
                        color: #0A2E5A;
                        font-size: 10px;
                        margin-bottom: 3px;
                    }
                    .pp-doc-clause-text {
                        color: #444;
                        font-size: 9px;
                        line-height: 1.5;
                        text-align: justify;
                    }
                    .pp-doc-signatures {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                        margin-top: 40px;
                        padding-top: 20px;
                    }
                    .pp-doc-signature { text-align: center; }
                    .pp-doc-signature-line {
                        border-top: 1px solid #333;
                        padding-top: 8px;
                        margin-top: 50px;
                    }
                    .pp-doc-signature-name {
                        font-weight: 600;
                        color: #1a1a2e;
                        font-size: 10px;
                    }
                    .pp-doc-signature-role {
                        font-size: 9px;
                        color: #666;
                        margin-top: 2px;
                    }
                    .pp-doc-footer {
                        position: absolute;
                        bottom: 20px;
                        left: 40px;
                        right: 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-top: 15px;
                        border-top: 1px solid #e0e0e0;
                        font-size: 8px;
                        color: #888;
                    }
                    /* Estilos dos Entregáveis */
                    .pp-doc-deliverables-container {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }
                    .pp-doc-deliverable {
                        border: 1px solid #e0e0e0;
                        border-radius: 6px;
                        overflow: hidden;
                        background: #fafafa;
                    }
                    .pp-doc-deliverable-feature { border-left: 3px solid #0A2E5A; }
                    .pp-doc-deliverable-functional { border-left: 3px solid #10a37f; }
                    .pp-doc-deliverable-non-functional { border-left: 3px solid #f59e0b; }
                    .pp-doc-deliverable-task { border-left: 3px solid #6366f1; }
                    .pp-doc-deliverable-header {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 12px;
                        background: #f0f0f0;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .pp-doc-deliverable-badge {
                        font-size: 8px;
                        font-weight: 600;
                        text-transform: uppercase;
                        padding: 2px 6px;
                        border-radius: 3px;
                        background: #0A2E5A;
                        color: white;
                        letter-spacing: 0.03em;
                    }
                    .pp-doc-deliverable-functional .pp-doc-deliverable-badge { background: #10a37f; }
                    .pp-doc-deliverable-non-functional .pp-doc-deliverable-badge { background: #f59e0b; }
                    .pp-doc-deliverable-task .pp-doc-deliverable-badge { background: #6366f1; }
                    .pp-doc-deliverable-title {
                        font-weight: 600;
                        color: #1a1a2e;
                        font-size: 10px;
                    }
                    .pp-doc-subitems {
                        margin: 0;
                        padding: 8px 12px 8px 24px;
                        list-style: none;
                    }
                    .pp-doc-subitems li {
                        display: flex;
                        align-items: flex-start;
                        gap: 6px;
                        padding: 4px 0;
                        font-size: 9px;
                        color: #444;
                        border-bottom: 1px dashed #e8e8e8;
                    }
                    .pp-doc-subitems li:last-child { border-bottom: none; }
                    .pp-doc-subitem-tag {
                        font-size: 7px;
                        font-weight: 700;
                        padding: 1px 4px;
                        border-radius: 2px;
                        flex-shrink: 0;
                        margin-top: 1px;
                    }
                    .pp-doc-tag-functional { background: #d1fae5; color: #065f46; }
                    .pp-doc-tag-non-functional { background: #fef3c7; color: #92400e; }
                    .pp-doc-tag-note { background: #e0e7ff; color: #3730a3; }
                    .pp-doc-subitems code {
                        background: #e8e8e8;
                        padding: 1px 4px;
                        border-radius: 3px;
                        font-family: 'Consolas', 'Monaco', monospace;
                        font-size: 8px;
                    }
                    .pp-doc-subitems strong { font-weight: 700; color: #1a1a2e; }
                    .pp-doc-subitems em { font-style: italic; color: #555; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        .pp-document { padding: 20px; }
                    }
                </style>
            </head>
            <body>
                <div class="pp-document">
                    ${preview.innerHTML}
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    };
                <\/script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    }, 500);
}

function copyDocumentId() {
    navigator.clipboard.writeText(ProposalState.documentId).then(() => {
        showToast('ID copiado para a área de transferência!', 'success');
    }).catch(() => {
        showToast('Erro ao copiar ID', 'error');
    });
}

// ===== UTILITÁRIOS =====
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '—';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `pp-toast pp-toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} pp-toast-icon"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== MODAL DE RASCUNHOS =====
function bindDraftsModal() {
    const modal = document.getElementById('draftsModal');
    const btnOpen = document.getElementById('btnOpenDrafts');
    const btnClose = document.getElementById('btnCloseDrafts');
    const btnNew = document.getElementById('btnNewDocument');
    const searchInput = document.getElementById('searchDrafts');
    const filterTipo = document.getElementById('filterTipo');
    
    // Abrir modal
    btnOpen.addEventListener('click', () => {
        modal.classList.add('active');
        loadDrafts();
    });
    
    // Fechar modal
    btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Novo documento
    btnNew.addEventListener('click', () => {
        resetForm();
        modal.classList.remove('active');
        showToast('Novo documento criado', 'success');
    });
    
    // Busca e filtro
    searchInput.addEventListener('input', debounce(() => loadDrafts(), 300));
    filterTipo.addEventListener('change', () => loadDrafts());
}

async function loadDrafts() {
    const listContainer = document.getElementById('draftsList');
    const searchQuery = document.getElementById('searchDrafts').value.toLowerCase();
    const filterTipo = document.getElementById('filterTipo').value;
    
    // Loading
    listContainer.innerHTML = `
        <div class="pp-loading">
            <div class="pp-spinner"></div>
            <span>Carregando rascunhos...</span>
        </div>
    `;
    
    try {
        // Buscar documentos
        let documents = await DocumentService.getAll();
        
        // Filtrar por tipo
        if (filterTipo) {
            documents = documents.filter(doc => doc.tipo === filterTipo);
        }
        
        // Filtrar por busca
        if (searchQuery) {
            documents = documents.filter(doc => {
                const clienteNome = doc.dados_cliente?.nome?.toLowerCase() || '';
                const id = doc.id?.toLowerCase() || '';
                return clienteNome.includes(searchQuery) || id.includes(searchQuery);
            });
        }
        
        // Ordenar por data de criação (mais recente primeiro)
        documents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // Renderizar
        if (documents.length === 0) {
            listContainer.innerHTML = `
                <div class="pp-drafts-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>Nenhum rascunho encontrado</p>
                    <button type="button" class="pp-btn pp-btn-primary" onclick="document.getElementById('btnNewDocument').click()">
                        <i class="fas fa-plus"></i>
                        Criar Novo Documento
                    </button>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = documents.map(doc => {
            const tipoLabels = {
                'proposta': 'Proposta',
                'orcamento': 'Orçamento',
                'contrato': 'Contrato'
            };
            const tipoIcons = {
                'proposta': 'fa-file-alt',
                'orcamento': 'fa-calculator',
                'contrato': 'fa-file-signature'
            };
            
            const clienteNome = doc.dados_cliente?.nome || 'Cliente não informado';
            const dataFormatada = formatDateDisplay(doc.data_emissao || doc.created_at?.split('T')[0]);
            const valorTotal = formatCurrency(doc.valor_total || 0);
            
            return `
                <div class="pp-draft-card" data-id="${doc.id}">
                    <div class="pp-draft-icon ${doc.tipo}">
                        <i class="fas ${tipoIcons[doc.tipo] || 'fa-file'}"></i>
                    </div>
                    <div class="pp-draft-info">
                        <div class="pp-draft-title">${escapeHtml(clienteNome)}</div>
                        <div class="pp-draft-meta">
                            <span class="pp-draft-type-badge ${doc.tipo}">${tipoLabels[doc.tipo] || 'Documento'}</span>
                            <span><i class="fas fa-hashtag"></i> ${doc.id}</span>
                            <span><i class="fas fa-calendar"></i> ${dataFormatada}</span>
                        </div>
                    </div>
                    <div class="pp-draft-value">${valorTotal}</div>
                    <div class="pp-draft-actions">
                        <button type="button" class="pp-draft-btn edit" onclick="loadDraft('${doc.id}')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="pp-draft-btn delete" onclick="deleteDraft('${doc.id}')" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Erro ao carregar rascunhos:', error);
        listContainer.innerHTML = `
            <div class="pp-drafts-empty">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar rascunhos</p>
            </div>
        `;
    }
}

async function loadDraft(id) {
    try {
        const doc = await DocumentService.getById(id);
        
        if (!doc) {
            showToast('Documento não encontrado', 'error');
            return;
        }
        
        // Preencher o estado
        ProposalState.documentId = doc.id;
        ProposalState.tipo = doc.tipo || 'proposta';
        ProposalState.dataEmissao = doc.data_emissao || '';
        ProposalState.validade = doc.data_validade || doc.validade || '';
        
        // Cliente
        ProposalState.cliente = {
            nome: doc.dados_cliente?.nome || '',
            responsavel: doc.dados_cliente?.responsavel || '',
            email: doc.dados_cliente?.email || '',
            documento: doc.dados_cliente?.documento || '',
            endereco: doc.dados_cliente?.endereco || ''
        };
        
        // Projeto
        ProposalState.projeto = {
            descricao: doc.conteudo?.descricao || '',
            entregaveis: doc.conteudo?.entregaveis || [{ titulo: '', tipo: 'feature', subitens: [] }]
        };
        
        // Garantir que entregáveis tenham a estrutura correta
        if (ProposalState.projeto.entregaveis.length === 0) {
            ProposalState.projeto.entregaveis = [{ titulo: '', tipo: 'feature', subitens: [] }];
        }
        
        // Itens
        ProposalState.itens = doc.conteudo?.itens || [{ descricao: '', quantidade: 1, valorUnitario: 0 }];
        if (ProposalState.itens.length === 0) {
            ProposalState.itens = [{ descricao: '', quantidade: 1, valorUnitario: 0 }];
        }
        
        // Condições
        ProposalState.condicoes = {
            prazo: doc.conteudo?.prazo || '',
            formaPagamento: doc.conteudo?.formaPagamento || '',
            condicoesAdicionais: doc.conteudo?.condicoesAdicionais || '',
            garantias: doc.conteudo?.garantias || ''
        };
        
        // Atualizar UI
        updateFormFromState();
        renderDeliverables();
        renderItemsTable();
        updatePreview();
        
        // Fechar modal
        document.getElementById('draftsModal').classList.remove('active');
        showToast('Documento carregado com sucesso', 'success');
        
    } catch (error) {
        console.error('Erro ao carregar documento:', error);
        showToast('Erro ao carregar documento', 'error');
    }
}

async function deleteDraft(id) {
    if (!confirm('Tem certeza que deseja excluir este rascunho? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        await DocumentService.delete(id);
        showToast('Rascunho excluído com sucesso', 'success');
        loadDrafts(); // Recarregar lista
    } catch (error) {
        console.error('Erro ao excluir:', error);
        showToast('Erro ao excluir rascunho', 'error');
    }
}

function updateFormFromState() {
    // ID do documento
    document.getElementById('documentId').textContent = ProposalState.documentId;
    
    // Tipo
    document.getElementById('tipoDocumento').value = ProposalState.tipo;
    
    // Datas
    document.getElementById('dataEmissao').value = ProposalState.dataEmissao;
    document.getElementById('validade').value = ProposalState.validade;
    
    // Cliente
    document.getElementById('clienteNome').value = ProposalState.cliente.nome;
    document.getElementById('clienteResponsavel').value = ProposalState.cliente.responsavel;
    document.getElementById('clienteEmail').value = ProposalState.cliente.email;
    document.getElementById('clienteDocumento').value = ProposalState.cliente.documento;
    document.getElementById('clienteEndereco').value = ProposalState.cliente.endereco;
    
    // Projeto
    document.getElementById('descricaoProjeto').value = ProposalState.projeto.descricao;
    
    // Condições
    document.getElementById('prazo').value = ProposalState.condicoes.prazo;
    document.getElementById('formaPagamento').value = ProposalState.condicoes.formaPagamento;
    document.getElementById('condicoesAdicionais').value = ProposalState.condicoes.condicoesAdicionais;
    document.getElementById('garantias').value = ProposalState.condicoes.garantias;
}

function resetForm() {
    // Resetar estado
    ProposalState.documentId = generateDocumentId();
    ProposalState.tipo = 'proposta';
    ProposalState.dataEmissao = formatDate(new Date());
    
    const validadeDate = new Date();
    validadeDate.setDate(validadeDate.getDate() + 30);
    ProposalState.validade = formatDate(validadeDate);
    
    ProposalState.cliente = {
        nome: '',
        responsavel: '',
        email: '',
        documento: '',
        endereco: ''
    };
    
    ProposalState.projeto = {
        descricao: '',
        entregaveis: [{ titulo: '', tipo: 'feature', subitens: [] }]
    };
    
    ProposalState.itens = [{ descricao: '', quantidade: 1, valorUnitario: 0 }];
    
    ProposalState.condicoes = {
        prazo: '',
        formaPagamento: '',
        condicoesAdicionais: '',
        garantias: ''
    };
    
    // Atualizar UI
    updateFormFromState();
    renderDeliverables();
    renderItemsTable();
    updatePreview();
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Expor funções globais necessárias
window.removeDeliverable = removeDeliverable;
window.addSubitem = addSubitem;
window.removeSubitem = removeSubitem;
window.applyFormat = applyFormat;
window.loadDraft = loadDraft;
window.deleteDraft = deleteDraft;
