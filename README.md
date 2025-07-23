# 🚀 Code Snippet Manager

A powerful, developer-friendly tool for saving, categorizing, and searching code snippets. Built with vanilla JavaScript, HTML5, and CSS3 for maximum compatibility and performance.

![Code Snippet Manager Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Code+Snippet+Manager)

## ✨ Features

### 🎯 Core Functionality
- **Complete CRUD Operations**: Create, Read, Update, and Delete code snippets
- **Smart Search**: Search across titles, descriptions, code content, and tags
- **Advanced Filtering**: Filter by programming language and tags
- **Syntax Highlighting**: Beautiful code highlighting powered by PrismJS
- **Tag Management**: Organize snippets with custom tags
- **Export/Import**: Backup and share snippet collections as JSON files

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with beautiful animations
- **Mobile-First**: Fully responsive design that works on all devices
- **Keyboard Shortcuts**: Efficient workflow with keyboard navigation
- **Copy to Clipboard**: One-click code copying functionality
- **Toast Notifications**: Real-time feedback for all operations
- **Empty States**: Helpful guidance when getting started

### 💾 Data Management
- **Local Storage**: All data persists locally in your browser
- **Offline Capable**: Works completely offline after initial load
- **Data Validation**: Robust validation for all inputs
- **Automatic Backups**: Local storage prevents data loss

## 🚀 Quick Start

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd code-snippet-manager
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   
   # Or serve with a local server
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **Start Adding Snippets**
   - Click "Add Snippet" or press `Ctrl+N`
   - Fill in the form and save
   - Your snippets are automatically saved locally!

## 📖 Usage Guide

### Adding a New Snippet
1. Click the **"Add Snippet"** button or press `Ctrl+N`
2. Fill in the required fields:
   - **Title**: A descriptive name for your snippet
   - **Language**: Select the programming language
   - **Code**: Paste or type your code
3. Optionally add:
   - **Description**: What the snippet does
   - **Tags**: Comma-separated tags for organization
4. Click **"Save Snippet"**

### Searching and Filtering
- **Search Bar**: Type to search across all snippet content
- **Language Filter**: Filter by specific programming languages
- **Tag Filter**: Filter by tags (automatically populated)
- **Clear Filters**: Reset all search and filter criteria

### Managing Snippets
- **View**: Click any snippet card to see the full code with syntax highlighting
- **Edit**: Click the edit icon or use the edit button in the view modal
- **Delete**: Click the delete icon (with confirmation)
- **Copy**: Click the copy icon to copy code to clipboard

### Import/Export
- **Export**: Download all snippets as a JSON file for backup
- **Import**: Upload a JSON file to restore or merge snippets

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+N` / `Cmd+N` | Add new snippet |
| `Escape` | Close modals |
| `Enter` | Submit forms |

## 🛠️ Technical Stack

### Frontend
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Grid, Flexbox, CSS Variables, and modern features
- **Vanilla JavaScript**: ES6+ features, no frameworks required

### Libraries
- **PrismJS**: Syntax highlighting for 200+ languages
- **Font Awesome**: Beautiful icons
- **Modern CSS**: Custom properties, animations, and responsive design

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📁 Project Structure

```
code-snippet-manager/
├── index.html          # Main application HTML
├── style.css           # Complete styling and responsive design
├── app.js              # Application logic and functionality
├── README.md           # This documentation
└── image.jpg           # Optional logo/image
```

## 🎨 Design Features

### Visual Design
- **Modern Gradient Background**: Beautiful purple gradient
- **Card-Based Layout**: Clean snippet cards with hover effects
- **Modal Dialogs**: Elegant modals for forms and viewing
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Typography**: Carefully selected font stack for readability

### Animations
- **Smooth Transitions**: Hover effects and state changes
- **Modal Animations**: Slide-in effects for modals
- **Toast Notifications**: Fade in/out animations
- **Loading States**: Visual feedback for operations

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling in modals
- **Color Contrast**: WCAG compliant color choices
- **Screen Reader**: Semantic HTML for assistive technologies

## 📊 Sample Data

The application includes sample snippets to demonstrate functionality:
- JavaScript Array Map Function
- Python List Comprehension
- CSS Flexbox Centering

## 🔧 Customization

### Adding New Languages
Edit the language options in both HTML files:
```html
<option value="newlang">New Language</option>
```

### Modifying Colors
Update CSS custom properties in `style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

### Extending Functionality
The modular JavaScript structure makes it easy to add features:
- New snippet properties
- Additional search criteria
- Custom export formats
- Cloud storage integration

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Surge.sh**: Use the CLI to deploy

### Local Development
```bash
# With Python
python -m http.server 8000

# With Node.js
npx serve .

# With PHP
php -S localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎖️ Resume Points

Perfect for showcasing on your resume:

> **"Built a Code Snippet Manager with vanilla JavaScript, featuring CRUD operations, real-time search, syntax highlighting, and responsive design. Implemented local storage, import/export functionality, and modern UX patterns."**

### Key Technical Achievements
- ✅ Full-stack web application (frontend focused)
- ✅ Modern JavaScript (ES6+, modules, async/await)
- ✅ Responsive CSS (Grid, Flexbox, media queries)
- ✅ User Experience Design (animations, accessibility)
- ✅ Data Management (localStorage, JSON handling)
- ✅ Browser APIs (Clipboard, File API)
- ✅ Search Algorithms (text matching, filtering)

---

**Built with ❤️ for developers, by developers**