// Temple Inscriptions Decoder - JavaScript
class TempleApp {
    constructor() {
        this.currentPage = 'home';
        this.currentLanguage = 'en';
        this.temples = {
            brihadeeswara: {
                name: 'Brihadeeswara Temple',
                description: 'A magnificent temple built by Rajaraja Chola I, showcasing the pinnacle of Chola architecture.',
                dynasty: 'Chola Empire',
                period: '1003-1010 CE',
                location: 'Thanjavur, Tamil Nadu',
                image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            meenakshi: {
                name: 'Meenakshi Amman Temple',
                description: 'A historic Hindu temple dedicated to Meenakshi, known for its stunning architecture and colorful gopurams.',
                dynasty: 'Pandya Dynasty',
                period: '1200 CE',
                location: 'Madurai, Tamil Nadu',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            shore: {
                name: 'Shore Temple',
                description: 'A structural temple built with blocks of granite, dating from the 8th century CE.',
                dynasty: 'Pallava Dynasty',
                period: '700-728 CE',
                location: 'Mahabalipuram, Tamil Nadu',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupLanguageSelector();
        this.setupFileUpload();
        this.setupTabs();
        this.setupChat();
        this.setupScrollAnimations();
        this.showPage('home');
    }

    setupEventListeners() {
        // Navigation toggle for mobile
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.showPage(page);
            });
        });
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);

        // Initialize page-specific functionality
        this.initPageSpecific(pageId);
    }

    initPageSpecific(pageId) {
        switch (pageId) {
            case 'scan':
                this.initScanPage();
                break;
            case 'map':
                this.initMapPage();
                break;
            case 'chatbot':
                this.initChatbotPage();
                break;
        }
    }

    setupLanguageSelector() {
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentLanguage = btn.getAttribute('data-lang');
                this.updateLanguage();
            });
        });

        // Translation tabs
        document.querySelectorAll('.lang-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const lang = tab.getAttribute('data-lang');
                document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.translation-text').forEach(t => t.classList.remove('active'));
                
                tab.classList.add('active');
                document.querySelector(`[data-lang="${lang}"].translation-text`).classList.add('active');
            });
        });
    }

    updateLanguage() {
        // This would typically update UI text based on selected language
        console.log(`Language changed to: ${this.currentLanguage}`);
    }

    setupFileUpload() {
        const fileInput = document.getElementById('file-input');
        const uploadArea = document.getElementById('upload-area');
        const uploadResult = document.getElementById('upload-result');
        const scanResults = document.getElementById('scan-results');
        const uploadedImage = document.getElementById('uploaded-image');

        if (!fileInput || !uploadArea) return;

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });
    }

    handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadArea = document.getElementById('upload-area');
            const uploadResult = document.getElementById('upload-result');
            const scanResults = document.getElementById('scan-results');
            const uploadedImage = document.getElementById('uploaded-image');

            uploadedImage.src = e.target.result;
            uploadArea.style.display = 'none';
            uploadResult.style.display = 'block';

            // Simulate processing delay
            setTimeout(() => {
                scanResults.style.display = 'block';
                this.animateResults();
            }, 2000);
        };
        reader.readAsDataURL(file);
    }

    animateResults() {
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            resultCard.style.opacity = '0';
            resultCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                resultCard.style.transition = 'all 0.5s ease-out';
                resultCard.style.opacity = '1';
                resultCard.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Update tab buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update tab panels
                document.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    setupChat() {
        // Scan page chat
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Main chatbot page
        const mainChatInput = document.getElementById('main-chat-input');
        if (mainChatInput) {
            mainChatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMainMessage();
                }
            });
        }

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.askQuestion(btn.textContent);
            });
        });
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message, 'chat-messages');
            input.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = this.generateBotResponse(message);
                this.addMessage('bot', response, 'chat-messages');
            }, 1000);
        }
    }

    sendMainMessage() {
        const input = document.getElementById('main-chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message, 'main-chat-messages');
            input.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = this.generateBotResponse(message);
                this.addMessage('bot', response, 'main-chat-messages');
                this.updateSources(message);
            }, 1000);
        }
    }

    askQuestion(question) {
        const input = document.getElementById('main-chat-input');
        input.value = question;
        this.sendMainMessage();
    }

    addMessage(type, content, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'bot' ? '<i class="fas fa-dharmachakra"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        container.appendChild(messageDiv);
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
        
        // Animate message appearance
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    generateBotResponse(message) {
        const responses = {
            'chola': 'The Chola dynasty was one of the longest-ruling dynasties in Tamil Nadu, known for their magnificent temples and inscriptions. They ruled from the 9th to 13th centuries CE and left behind numerous stone inscriptions documenting their administrative and religious activities.',
            'thanjavur': 'Thanjavur, also known as Tanjore, is home to the famous Brihadeeswara Temple built by Rajaraja Chola I. The temple contains numerous inscriptions that provide insights into Chola administration, art patronage, and religious practices.',
            'tamil brahmi': 'Tamil Brahmi is an ancient script used to write Tamil from the 3rd century BCE to the 1st century CE. It evolved from the Brahmi script and is found in cave inscriptions and pottery throughout Tamil Nadu.',
            'inscription': 'This inscription appears to be from the Chola period, likely recording a royal grant or temple endowment. The use of "Svasti Sri" at the beginning is typical of royal proclamations from this era.',
            'default': 'That\'s an interesting question about Tamil heritage! Could you be more specific about which aspect you\'d like to know more about - temples, inscriptions, dynasties, or cultural practices?'
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    updateSources(message) {
        const sourcesContent = document.getElementById('sources-content');
        if (!sourcesContent) return;

        // Add relevant sources based on the message
        const newSource = document.createElement('div');
        newSource.className = 'source-item';
        newSource.innerHTML = `
            <div class="source-header">
                <h4>Related Inscription</h4>
                <span class="source-date">${new Date().getFullYear() - Math.floor(Math.random() * 1000)} CE</span>
            </div>
            <p class="source-excerpt">"This inscription mentions topics related to your query about ${message.split(' ')[0]}..."</p>
            <button class="source-link">View Full Inscription</button>
        `;
        
        sourcesContent.insertBefore(newSource, sourcesContent.firstChild);
        
        // Animate new source
        newSource.style.opacity = '0';
        newSource.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            newSource.style.transition = 'all 0.3s ease-out';
            newSource.style.opacity = '1';
            newSource.style.transform = 'translateX(0)';
        }, 100);
    }

    initScanPage() {
        // Initialize scan page specific functionality
        console.log('Scan page initialized');
    }

    initMapPage() {
        // Initialize map page specific functionality
        this.setupMapPins();
        this.setupMapFilters();
    }

    setupMapPins() {
        document.querySelectorAll('.map-pin').forEach(pin => {
            pin.addEventListener('click', () => {
                const templeId = pin.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showTemplePopup(templeId);
            });
        });
    }

    setupMapFilters() {
        const filters = ['dynasty-filter', 'script-filter', 'period-filter'];
        
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', () => {
                    this.applyMapFilters();
                });
            }
        });

        const searchInput = document.getElementById('map-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.applyMapFilters();
            });
        }
    }

    applyMapFilters() {
        // This would filter the temple pins based on selected criteria
        console.log('Applying map filters...');
    }

    showTemplePopup(templeId) {
        const temple = this.temples[templeId];
        if (!temple) return;

        const popup = document.getElementById('temple-popup');
        const popupImage = document.getElementById('popup-temple-image');
        const popupName = document.getElementById('popup-temple-name');
        const popupDescription = document.getElementById('popup-temple-description');
        const popupDynasty = document.getElementById('popup-dynasty');
        const popupPeriod = document.getElementById('popup-period');
        const popupLocation = document.getElementById('popup-location');

        if (popup) {
            popupImage.src = temple.image;
            popupName.textContent = temple.name;
            popupDescription.textContent = temple.description;
            popupDynasty.textContent = temple.dynasty;
            popupPeriod.textContent = temple.period;
            popupLocation.textContent = temple.location;
            
            popup.classList.add('active');
        }
    }

    closeTemplePopup() {
        const popup = document.getElementById('temple-popup');
        if (popup) {
            popup.classList.remove('active');
        }
    }

    initChatbotPage() {
        // Initialize chatbot page specific functionality
        console.log('Chatbot page initialized');
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .stat-item, .info-card, .inscription-card').forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }
}

// Global functions for onclick handlers
function showPage(pageId) {
    window.templeApp.showPage(pageId);
}

function sendMessage() {
    window.templeApp.sendMessage();
}

function sendMainMessage() {
    window.templeApp.sendMainMessage();
}

function askQuestion(question) {
    window.templeApp.askQuestion(question);
}

function showTemplePopup(templeId) {
    window.templeApp.showTemplePopup(templeId);
}

function closeTemplePopup() {
    window.templeApp.closeTemplePopup();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templeApp = new TempleApp();
});

// Add some utility functions for enhanced interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.innerHTML;
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add image zoom functionality for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create modal for image zoom
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                modal.innerHTML = `
                    <div class="modal-overlay" onclick="this.parentElement.remove()">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                
                // Add modal styles
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const modalImg = modal.querySelector('img');
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                `;
                
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                document.body.appendChild(modal);
            }
        });
    });
});