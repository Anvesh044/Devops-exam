// Code Snippet Manager Application
class CodeSnippetManager {
    constructor() {
        this.snippets = [];
        this.filteredSnippets = [];
        this.currentEditingId = null;
        this.currentViewingId = null;
        
        // Load data from localStorage on initialization
        this.loadFromStorage();
        this.initializeApp();
    }

    // Initialize the application
    initializeApp() {
        this.renderSnippets();
        this.updateTagFilter();
        this.setupEventListeners();
        
        // Add some sample data if no snippets exist
        if (this.snippets.length === 0) {
            this.addSampleSnippets();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('snippetModal');
            const viewModal = document.getElementById('viewModal');
            if (e.target === modal) {
                this.closeModal();
            }
            if (e.target === viewModal) {
                this.closeViewModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeViewModal();
            }
            // Ctrl/Cmd + N to add new snippet
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openAddModal();
            }
        });
    }

    // Generate unique ID for snippets
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Save snippets to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('codeSnippets', JSON.stringify(this.snippets));
        } catch (error) {
            this.showToast('Failed to save to storage', 'error');
        }
    }

    // Load snippets from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('codeSnippets');
            if (stored) {
                this.snippets = JSON.parse(stored);
                this.filteredSnippets = [...this.snippets];
            }
        } catch (error) {
            this.showToast('Failed to load from storage', 'error');
            this.snippets = [];
            this.filteredSnippets = [];
        }
    }

    // Add sample snippets for demonstration
    addSampleSnippets() {
        const sampleSnippets = [
            {
                id: this.generateId(),
                title: "Array Map Function",
                description: "Transform array elements using map function",
                language: "javascript",
                tags: ["array", "functional", "es6"],
                code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Map with index
const withIndex = numbers.map((num, index) => ({
    value: num,
    index: index
}));`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                title: "Python List Comprehension",
                description: "Create lists using Python list comprehension syntax",
                language: "python",
                tags: ["list", "comprehension", "python"],
                code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: this.generateId(),
                title: "CSS Flexbox Center",
                description: "Center content using CSS Flexbox",
                language: "css",
                tags: ["css", "flexbox", "center", "layout"],
                code: `.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Alternative with margin auto */
.flex-center-alt {
    display: flex;
    margin: auto;
}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        sampleSnippets.forEach(snippet => {
            this.snippets.push(snippet);
        });
        
        this.filteredSnippets = [...this.snippets];
        this.saveToStorage();
        this.renderSnippets();
        this.updateTagFilter();
    }

    // Create a new snippet
    createSnippet(snippetData) {
        const snippet = {
            id: this.generateId(),
            title: snippetData.title,
            description: snippetData.description || '',
            language: snippetData.language,
            tags: snippetData.tags || [],
            code: snippetData.code,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.snippets.unshift(snippet); // Add to beginning
        this.filteredSnippets = [...this.snippets];
        this.saveToStorage();
        this.renderSnippets();
        this.updateTagFilter();
        this.showToast('Snippet created successfully!', 'success');
        return snippet;
    }

    // Update an existing snippet
    updateSnippet(id, snippetData) {
        const index = this.snippets.findIndex(snippet => snippet.id === id);
        if (index !== -1) {
            this.snippets[index] = {
                ...this.snippets[index],
                title: snippetData.title,
                description: snippetData.description || '',
                language: snippetData.language,
                tags: snippetData.tags || [],
                code: snippetData.code,
                updatedAt: new Date().toISOString()
            };

            this.filteredSnippets = [...this.snippets];
            this.saveToStorage();
            this.renderSnippets();
            this.updateTagFilter();
            this.showToast('Snippet updated successfully!', 'success');
            return this.snippets[index];
        }
        return null;
    }

    // Delete a snippet
    deleteSnippet(id) {
        const index = this.snippets.findIndex(snippet => snippet.id === id);
        if (index !== -1) {
            const deletedSnippet = this.snippets.splice(index, 1)[0];
            this.filteredSnippets = [...this.snippets];
            this.saveToStorage();
            this.renderSnippets();
            this.updateTagFilter();
            this.showToast('Snippet deleted successfully!', 'success');
            return deletedSnippet;
        }
        return null;
    }

    // Get snippet by ID
    getSnippetById(id) {
        return this.snippets.find(snippet => snippet.id === id);
    }

    // Search snippets
    searchSnippets(query) {
        if (!query.trim()) {
            this.filteredSnippets = [...this.snippets];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredSnippets = this.snippets.filter(snippet => 
                snippet.title.toLowerCase().includes(searchTerm) ||
                snippet.description.toLowerCase().includes(searchTerm) ||
                snippet.code.toLowerCase().includes(searchTerm) ||
                snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        this.applyCurrentFilters();
        this.renderSnippets();
    }

    // Apply filters
    applyFilters() {
        const languageFilter = document.getElementById('languageFilter').value;
        const tagFilter = document.getElementById('tagFilter').value;
        
        this.filteredSnippets = this.snippets.filter(snippet => {
            const matchesLanguage = !languageFilter || snippet.language === languageFilter;
            const matchesTag = !tagFilter || snippet.tags.includes(tagFilter);
            return matchesLanguage && matchesTag;
        });

        // Apply search if there's a search query
        const searchQuery = document.getElementById('searchInput').value;
        if (searchQuery.trim()) {
            this.searchSnippets(searchQuery);
        } else {
            this.renderSnippets();
        }
    }

    // Apply current filters (used after search)
    applyCurrentFilters() {
        const languageFilter = document.getElementById('languageFilter').value;
        const tagFilter = document.getElementById('tagFilter').value;
        
        if (languageFilter || tagFilter) {
            this.filteredSnippets = this.filteredSnippets.filter(snippet => {
                const matchesLanguage = !languageFilter || snippet.language === languageFilter;
                const matchesTag = !tagFilter || snippet.tags.includes(tagFilter);
                return matchesLanguage && matchesTag;
            });
        }
    }

    // Clear all filters
    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('languageFilter').value = '';
        document.getElementById('tagFilter').value = '';
        this.filteredSnippets = [...this.snippets];
        this.renderSnippets();
    }

    // Update tag filter dropdown
    updateTagFilter() {
        const tagFilter = document.getElementById('tagFilter');
        const allTags = new Set();
        
        this.snippets.forEach(snippet => {
            snippet.tags.forEach(tag => allTags.add(tag));
        });

        // Clear existing options except "All Tags"
        tagFilter.innerHTML = '<option value="">All Tags</option>';
        
        // Add tag options
        Array.from(allTags).sort().forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }

    // Render snippets in the grid
    renderSnippets() {
        const grid = document.getElementById('snippetsGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (this.filteredSnippets.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            
            // Update empty state message based on filters
            const hasFilters = document.getElementById('searchInput').value || 
                             document.getElementById('languageFilter').value || 
                             document.getElementById('tagFilter').value;
            
            if (hasFilters) {
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No snippets found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                    <button class="btn btn-outline" onclick="snippetManager.clearFilters()">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                `;
            } else if (this.snippets.length === 0) {
                emptyState.innerHTML = `
                    <i class="fas fa-code-branch"></i>
                    <h3>No code snippets yet</h3>
                    <p>Start building your collection by adding your first snippet!</p>
                    <button class="btn btn-primary" onclick="openAddModal()">
                        <i class="fas fa-plus"></i> Add Your First Snippet
                    </button>
                `;
            }
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        grid.innerHTML = this.filteredSnippets.map(snippet => this.createSnippetCard(snippet)).join('');
    }

    // Create HTML for a snippet card
    createSnippetCard(snippet) {
        const formattedDate = new Date(snippet.createdAt).toLocaleDateString();
        const shortCode = snippet.code.length > 200 ? 
            snippet.code.substring(0, 200) + '...' : snippet.code;
        
        return `
            <div class="snippet-card" onclick="viewSnippet('${snippet.id}')">
                <div class="snippet-header">
                    <div>
                        <h3 class="snippet-title">${this.escapeHtml(snippet.title)}</h3>
                        <div class="snippet-meta">
                            <span class="language-badge">${snippet.language}</span>
                            <span class="snippet-date">${formattedDate}</span>
                        </div>
                    </div>
                    <div class="snippet-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); copyToClipboard('${snippet.id}')" title="Copy">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); editSnippetById('${snippet.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); deleteSnippetById('${snippet.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${snippet.description ? `<p class="snippet-description">${this.escapeHtml(snippet.description)}</p>` : ''}
                ${snippet.tags.length > 0 ? `
                    <div class="snippet-tags">
                        ${snippet.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="snippet-preview">
                    <code>${this.escapeHtml(shortCode)}</code>
                </div>
            </div>
        `;
    }

    // Utility function to escape HTML
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Export snippets to JSON
    exportSnippets() {
        try {
            const dataStr = JSON.stringify(this.snippets, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `code-snippets-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast('Snippets exported successfully!', 'success');
        } catch (error) {
            this.showToast('Failed to export snippets', 'error');
        }
    }

    // Import snippets from JSON
    importSnippets(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedSnippets = JSON.parse(e.target.result);
                
                if (!Array.isArray(importedSnippets)) {
                    throw new Error('Invalid file format');
                }

                // Validate snippet structure
                const validSnippets = importedSnippets.filter(snippet => 
                    snippet.title && snippet.code && snippet.language
                );

                if (validSnippets.length === 0) {
                    throw new Error('No valid snippets found');
                }

                // Add imported snippets
                validSnippets.forEach(snippet => {
                    // Ensure required fields and generate new IDs
                    const newSnippet = {
                        id: this.generateId(),
                        title: snippet.title,
                        description: snippet.description || '',
                        language: snippet.language,
                        tags: Array.isArray(snippet.tags) ? snippet.tags : [],
                        code: snippet.code,
                        createdAt: snippet.createdAt || new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    this.snippets.unshift(newSnippet);
                });

                this.filteredSnippets = [...this.snippets];
                this.saveToStorage();
                this.renderSnippets();
                this.updateTagFilter();
                
                this.showToast(`Imported ${validSnippets.length} snippets successfully!`, 'success');
            } catch (error) {
                this.showToast('Failed to import snippets: ' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
        // Reset file input
        event.target.value = '';
    }
}

// Initialize the application
const snippetManager = new CodeSnippetManager();

// Global functions for HTML event handlers
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add New Snippet';
    document.getElementById('snippetForm').reset();
    document.getElementById('snippetModal').style.display = 'block';
    snippetManager.currentEditingId = null;
    
    // Focus on title input
    setTimeout(() => {
        document.getElementById('snippetTitle').focus();
    }, 100);
}

function closeModal() {
    document.getElementById('snippetModal').style.display = 'none';
    snippetManager.currentEditingId = null;
}

function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
    snippetManager.currentViewingId = null;
}

function saveSnippet(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const title = document.getElementById('snippetTitle').value.trim();
    const description = document.getElementById('snippetDescription').value.trim();
    const language = document.getElementById('snippetLanguage').value;
    const tags = document.getElementById('snippetTags').value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    const code = document.getElementById('snippetCode').value.trim();

    if (!title || !language || !code) {
        snippetManager.showToast('Please fill in all required fields', 'error');
        return;
    }

    const snippetData = { title, description, language, tags, code };

    if (snippetManager.currentEditingId) {
        snippetManager.updateSnippet(snippetManager.currentEditingId, snippetData);
    } else {
        snippetManager.createSnippet(snippetData);
    }

    closeModal();
}

function editSnippetById(id) {
    const snippet = snippetManager.getSnippetById(id);
    if (!snippet) return;

    document.getElementById('modalTitle').textContent = 'Edit Snippet';
    document.getElementById('snippetTitle').value = snippet.title;
    document.getElementById('snippetDescription').value = snippet.description;
    document.getElementById('snippetLanguage').value = snippet.language;
    document.getElementById('snippetTags').value = snippet.tags.join(', ');
    document.getElementById('snippetCode').value = snippet.code;
    
    snippetManager.currentEditingId = id;
    document.getElementById('snippetModal').style.display = 'block';
    
    // Focus on title input
    setTimeout(() => {
        document.getElementById('snippetTitle').focus();
    }, 100);
}

function deleteSnippetById(id) {
    const snippet = snippetManager.getSnippetById(id);
    if (!snippet) return;

    if (confirm(`Are you sure you want to delete "${snippet.title}"?`)) {
        snippetManager.deleteSnippet(id);
        
        // Close view modal if this snippet is being viewed
        if (snippetManager.currentViewingId === id) {
            closeViewModal();
        }
    }
}

function viewSnippet(id) {
    const snippet = snippetManager.getSnippetById(id);
    if (!snippet) return;

    snippetManager.currentViewingId = id;
    
    // Populate view modal
    document.getElementById('viewTitle').textContent = snippet.title;
    document.getElementById('viewLanguage').textContent = snippet.language;
    document.getElementById('viewDate').textContent = new Date(snippet.createdAt).toLocaleDateString();
    document.getElementById('viewDescription').textContent = snippet.description || 'No description provided.';
    
    // Update tags
    const tagsContainer = document.getElementById('viewTags');
    if (snippet.tags.length > 0) {
        tagsContainer.innerHTML = snippet.tags.map(tag => 
            `<span class="tag">${snippetManager.escapeHtml(tag)}</span>`
        ).join('');
    } else {
        tagsContainer.innerHTML = '<span class="tag">No tags</span>';
    }
    
    // Update code with syntax highlighting
    const codeElement = document.getElementById('viewCode');
    codeElement.textContent = snippet.code;
    codeElement.className = `language-${snippet.language}`;
    
    // Apply syntax highlighting
    if (window.Prism) {
        Prism.highlightElement(codeElement);
    }
    
    document.getElementById('viewModal').style.display = 'block';
}

function copyToClipboard(id) {
    const snippet = id ? snippetManager.getSnippetById(id) : 
                    snippetManager.getSnippetById(snippetManager.currentViewingId);
    
    if (!snippet) return;

    navigator.clipboard.writeText(snippet.code).then(() => {
        snippetManager.showToast('Code copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = snippet.code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        snippetManager.showToast('Code copied to clipboard!', 'success');
    });
}

function editSnippet() {
    if (snippetManager.currentViewingId) {
        closeViewModal();
        editSnippetById(snippetManager.currentViewingId);
    }
}

function deleteSnippet() {
    if (snippetManager.currentViewingId) {
        deleteSnippetById(snippetManager.currentViewingId);
    }
}

function searchSnippets() {
    const query = document.getElementById('searchInput').value;
    snippetManager.searchSnippets(query);
}

function applyFilters() {
    snippetManager.applyFilters();
}

function clearFilters() {
    snippetManager.clearFilters();
}

function exportSnippets() {
    snippetManager.exportSnippets();
}

function importSnippets(event) {
    snippetManager.importSnippets(event);
}

// Add keyboard shortcut hints
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltip for keyboard shortcuts
    const addButton = document.querySelector('.header-actions .btn-primary');
    if (addButton) {
        addButton.title = 'Add Snippet (Ctrl+N)';
    }
});