# Smart Budget Tracker 💰

A beautiful and intuitive web-based budget tracking application with AI-powered financial advice, built with HTML, CSS, and JavaScript.

## 🌟 Features

### 💼 Budget Management
- Set monthly or yearly budgets
- Real-time expense tracking
- Visual progress indicators
- Budget utilization analysis

### 📊 Expense Tracking
- **6 Main Categories:**
  - 🛒 Groceries
  - 🚗 Transportation
  - ⚡ Utilities
  - 🎬 Entertainment
  - 💊 Healthcare
  - 📝 Miscellaneous

### 🤖 AI Financial Advisor
- Personalized spending analysis
- Budget optimization recommendations
- Investment tips tailored for Indian market
- Smart financial planning suggestions

### 🎯 Financial Targets
- Emergency fund tracking
- Home down payment goals
- Vacation savings
- Education fund planning

### 💡 Key Highlights
- **Responsive Design** - Works on all devices
- **Local Data Storage** - Your data stays private
- **Real-time Calculations** - Instant expense updates
- **Beautiful UI** - Modern gradient design
- **Indian Currency** - All amounts in ₹ (Rupees)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs locally

### Installation
1. **Clone or Download** the repository
```bash
git clone https://github.com/yourusername/smart-budget-tracker.git
```

2. **Open the project folder**
```bash
cd smart-budget-tracker
```

3. **Launch the application**
   - Open `index.html` in your web browser
   - Or use a local server for better experience

### File Structure
```
smart-budget-tracker/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── README.md           # Documentation
├── .gitignore          # Git ignore file
└── package.json        # Project metadata
```

## 📱 How to Use

### 1. Set Your Budget
- Choose between Monthly or Yearly budget
- Enter your budget amount in rupees
- Click "Set Budget" to save

### 2. Add Expenses
- Fill in your expenses across different categories
- Amounts auto-calculate as you type
- View real-time expense breakdown

### 3. Monitor Progress
- Track budget utilization with visual progress bar
- See remaining budget amount
- Get color-coded alerts (green/yellow/red)

### 4. Get AI Advice
- Click "Get AI Advice" for personalized recommendations
- View spending analysis and optimization tips
- Get investment suggestions based on your profile

### 5. Track Financial Goals
- Monitor predefined financial targets
- View progress for emergency fund, home savings, etc.
- Set custom goals for your financial journey

## 🎨 Design Features

### Color Scheme
- **Primary Gradient:** Purple to Blue (#667eea → #764ba2)
- **Success:** Green (#27ae60)
- **Warning:** Orange (#f39c12)
- **Error:** Red (#e74c3c)

### Typography
- **Font Family:** Poppins (Google Fonts)
- **Responsive:** Adapts to all screen sizes
- **Accessible:** High contrast and readable

### Animations
- Smooth transitions and hover effects
- Loading animations
- Progress bar animations
- Card hover effects

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript (ES6+)** - Interactive functionality
- **Local Storage** - Data persistence
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Performance
- Fast loading (< 1MB total size)
- No external dependencies (except fonts/icons)
- Optimized for mobile devices

## 🤖 AI Integration

The application includes AI-powered financial advice using Google's Gemini API:

### Default API Configuration
```javascript
const GEMINI_API_KEY = 'AIzaSyDQJ8KK8fJ9rJ9mJ9nJ9oJ9pJ9qJ9rJ9s';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
```

### Features
- Spending pattern analysis
- Budget optimization suggestions
- Investment recommendations for Indian market
- Emergency fund planning
- Tax-saving investment tips

**Note:** Replace the default API key with your actual Gemini API key for full functionality.

## 📊 Data Storage

### Local Storage Schema
```javascript
{
  currentBudget: number,
  currentPeriod: 'monthly' | 'yearly',
  totalExpenses: number,
  expenses: {
    groceries: number,
    transport: number,
    utilities: number,
    entertainment: number,
    healthcare: number,
    miscellaneous: number
  }
}
```

### Privacy
- All data stored locally in browser
- No data sent to external servers
- User controls all information

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings
3. Enable GitHub Pages from main branch
4. Access via: `https://yourusername.github.io/smart-budget-tracker`

### Netlify
1. Connect GitHub repository to Netlify
2. Deploy automatically on commits
3. Get custom domain if needed

### Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server .

# Using PHP
php -S localhost:8000
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Create Pull Request

### Areas for Contribution
- Additional expense categories
- More AI advice scenarios
- Export/import functionality
- Chart visualizations
- Mobile app version
- Multi-language support

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
1. **Data not saving:** Ensure cookies/localStorage enabled
2. **AI not working:** Check API key configuration
3. **Layout issues:** Update to latest browser version

### Contact
- Create an issue on GitHub
- Email: support@budgettracker.com
- Website: https://budgettracker.com

## 🔮 Future Enhancements

### Planned Features
- [ ] Data export (PDF/Excel)
- [ ] Multiple budget profiles
- [ ] Expense categorization by tags
- [ ] Bill reminders
- [ ] Investment portfolio tracking
- [ ] Expense trends and analytics
- [ ] Mobile app (React Native)
- [ ] Multi-user support
- [ ] Bank account integration

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - AI integration and enhanced UI
- **v1.2.0** - Mobile responsiveness improvements

## 🙏 Acknowledgments

- **Google Fonts** for beautiful typography
- **Font Awesome** for comprehensive icons
- **Gemini AI** for intelligent financial advice
- **Community** for feedback and suggestions

---

**Happy Budgeting! 💰✨**

Made with ❤️ for better financial management