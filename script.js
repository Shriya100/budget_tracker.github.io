// Global variables
let currentBudget = 0;
let currentPeriod = 'monthly';
let totalExpenses = 0;

// Gemini API Configuration
const GEMINI_API_KEY = ''; // Default API key (replace with actual)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadSavedData();
});

// Event listeners
function initializeEventListeners() {
    // Period selector buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
        });
    });

    // Auto-calculate expenses when input changes
    const expenseInputs = ['groceries', 'transport', 'utilities', 'entertainment', 'healthcare', 'miscellaneous'];
    expenseInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateExpenses);
    });
}

// Set budget function
function setBudget() {
    const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
    
    if (!budgetAmount || budgetAmount <= 0) {
        alert('Please enter a valid budget amount');
        return;
    }
    
    currentBudget = budgetAmount;
    
    // Show budget display
    const budgetDisplay = document.getElementById('budgetDisplay');
    budgetDisplay.style.display = 'block';
    
    // Update budget values
    document.getElementById('currentBudget').textContent = `₹${formatNumber(currentBudget)}`;
    updateRemainingBudget();
    updateProgressBar();
    
    // Save to localStorage
    saveData();
    
    // Show success message
    showNotification('Budget set successfully!', 'success');
}

// Calculate expenses function
function calculateExpenses() {
    const expenses = {
        groceries: parseFloat(document.getElementById('groceries').value) || 0,
        transport: parseFloat(document.getElementById('transport').value) || 0,
        utilities: parseFloat(document.getElementById('utilities').value) || 0,
        entertainment: parseFloat(document.getElementById('entertainment').value) || 0,
        healthcare: parseFloat(document.getElementById('healthcare').value) || 0,
        miscellaneous: parseFloat(document.getElementById('miscellaneous').value) || 0
    };
    
    totalExpenses = Object.values(expenses).reduce((sum, value) => sum + value, 0);
    
    // Update total amount in header
    document.getElementById('totalAmount').textContent = `₹${formatNumber(totalExpenses)}`;
    
    // Update expense breakdown
    updateExpenseBreakdown(expenses);
    
    // Update remaining budget
    updateRemainingBudget();
    updateProgressBar();
    
    // Save to localStorage
    saveData();
}

// Update expense breakdown display
function updateExpenseBreakdown(expenses) {
    const breakdownDiv = document.getElementById('expenseBreakdown');
    
    if (totalExpenses === 0) {
        breakdownDiv.innerHTML = '<p class="no-data">Add expenses to see breakdown</p>';
        return;
    }
    
    const categoryIcons = {
        groceries: 'fas fa-shopping-cart',
        transport: 'fas fa-car',
        utilities: 'fas fa-bolt',
        entertainment: 'fas fa-film',
        healthcare: 'fas fa-heartbeat',
        miscellaneous: 'fas fa-ellipsis-h'
    };
    
    const categoryNames = {
        groceries: 'Groceries',
        transport: 'Transportation',
        utilities: 'Utilities',
        entertainment: 'Entertainment',
        healthcare: 'Healthcare',
        miscellaneous: 'Miscellaneous'
    };
    
    let html = '';
    
    Object.entries(expenses).forEach(([category, amount]) => {
        if (amount > 0) {
            const percentage = ((amount / totalExpenses) * 100).toFixed(1);
            html += `
                <div class="expense-item">
                    <div class="expense-category">
                        <i class="${categoryIcons[category]}"></i>
                        <span>${categoryNames[category]}</span>
                        <small>(${percentage}%)</small>
                    </div>
                    <div class="expense-amount">₹${formatNumber(amount)}</div>
                </div>
            `;
        }
    });
    
    breakdownDiv.innerHTML = html;
}

// Update remaining budget
function updateRemainingBudget() {
    if (currentBudget > 0) {
        const remaining = currentBudget - totalExpenses;
        const remainingElement = document.getElementById('remainingBudget');
        remainingElement.textContent = `₹${formatNumber(remaining)}`;
        
        // Change color based on remaining amount
        if (remaining < 0) {
            remainingElement.style.color = '#e74c3c';
        } else if (remaining < currentBudget * 0.2) {
            remainingElement.style.color = '#f39c12';
        } else {
            remainingElement.style.color = '#27ae60';
        }
    }
}

// Update progress bar
function updateProgressBar() {
    if (currentBudget > 0) {
        const progressContainer = document.getElementById('budgetProgress');
        progressContainer.style.display = 'block';
        
        const percentage = Math.min((totalExpenses / currentBudget) * 100, 100);
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        progressFill.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage.toFixed(1)}%`;
        
        // Change color based on percentage
        if (percentage > 100) {
            progressFill.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        } else if (percentage > 80) {
            progressFill.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
        } else {
            progressFill.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
    }
}

// Get AI advice function
async function getAIAdvice() {
    const aiResponse = document.getElementById('aiResponse');
    const aiLoading = document.getElementById('aiLoading');
    
    // Show loading
    aiLoading.style.display = 'flex';
    aiResponse.innerHTML = '';
    
    try {
        // Prepare data for AI analysis
        const expenseData = {
            totalExpenses: totalExpenses,
            budget: currentBudget,
            period: currentPeriod,
            categories: {
                groceries: parseFloat(document.getElementById('groceries').value) || 0,
                transport: parseFloat(document.getElementById('transport').value) || 0,
                utilities: parseFloat(document.getElementById('utilities').value) || 0,
                entertainment: parseFloat(document.getElementById('entertainment').value) || 0,
                healthcare: parseFloat(document.getElementById('healthcare').value) || 0,
                miscellaneous: parseFloat(document.getElementById('miscellaneous').value) || 0
            }
        };
        
        const prompt = `As a financial advisor, analyze this ${expenseData.period} budget:
        Budget: ₹${expenseData.budget}
        Total Expenses: ₹${expenseData.totalExpenses}
        Breakdown:
        - Groceries: ₹${expenseData.categories.groceries}
        - Transportation: ₹${expenseData.categories.transport}
        - Utilities: ₹${expenseData.categories.utilities}
        - Entertainment: ₹${expenseData.categories.entertainment}
        - Healthcare: ₹${expenseData.categories.healthcare}
        - Miscellaneous: ₹${expenseData.categories.miscellaneous}
        
        Provide personalized financial advice in 3-4 sentences focusing on:
        1. Budget utilization analysis
        2. Category-wise spending recommendations
        3. Actionable money-saving tips
        4. Future financial planning suggestions`;
        
        // Simulate AI response (replace with actual API call)
        await simulateAIResponse(prompt, aiResponse);
        
    } catch (error) {
        console.error('Error getting AI advice:', error);
        aiResponse.innerHTML = `
            <div class="ai-advice">
                <h3><i class="fas fa-exclamation-triangle"></i> Error</h3>
                <p>Sorry, couldn't get AI advice at the moment. Here are some general tips:</p>
                <ul>
                    <li>Track your expenses regularly</li>
                    <li>Follow the 50/30/20 rule (needs/wants/savings)</li>
                    <li>Build an emergency fund of 6 months expenses</li>
                    <li>Review and adjust your budget monthly</li>
                </ul>
            </div>
        `;
    } finally {
        aiLoading.style.display = 'none';
    }
}

// Get investment tips function
async function getInvestmentTips() {
    const aiResponse = document.getElementById('aiResponse');
    const aiLoading = document.getElementById('aiLoading');
    
    // Show loading
    aiLoading.style.display = 'flex';
    aiResponse.innerHTML = '';
    
    try {
        const prompt = `Based on Indian financial market, provide investment tips for someone with ₹${totalExpenses} monthly expenses and ₹${currentBudget} budget. Focus on:
        1. Emergency fund planning
        2. SIP recommendations
        3. Tax saving investments
        4. Risk diversification
        Provide practical advice in 4-5 points.`;
        
        // Simulate AI response
        await simulateAIResponse(prompt, aiResponse, true);
        
    } catch (error) {
        console.error('Error getting investment tips:', error);
        aiResponse.innerHTML = `
            <div class="ai-advice">
                <h3><i class="fas fa-chart-line"></i> Investment Tips</h3>
                <ul>
                    <li><strong>Start SIP:</strong> Begin with ₹1000-2000 monthly SIP in diversified mutual funds</li>
                    <li><strong>Emergency Fund:</strong> Build 6 months of expenses (₹${formatNumber(totalExpenses * 6)}) in liquid funds</li>
                    <li><strong>Tax Saving:</strong> Invest in ELSS funds for 80C tax benefits</li>
                    <li><strong>PPF Account:</strong> Open PPF for long-term tax-free returns</li>
                    <li><strong>Gold Investment:</strong> Allocate 5-10% in Gold ETFs for portfolio diversification</li>
                </ul>
            </div>
        `;
    } finally {
        aiLoading.style.display = 'none';
    }
}

// Simulate AI response (replace with actual Gemini API call)
async function simulateAIResponse(prompt, responseElement, isInvestment = false) {
    // Wait for 2 seconds to simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isInvestment) {
        const tips = [
            `<strong>Emergency Fund:</strong> Build ₹${formatNumber(totalExpenses * 6)} emergency fund in liquid funds (6 months expenses).`,
            `<strong>SIP Strategy:</strong> Start with ₹${Math.max(1000, Math.floor(currentBudget * 0.2))} monthly SIP in large-cap equity funds.`,
            `<strong>Tax Planning:</strong> Invest ₹1.5L annually in ELSS funds for 80C tax benefits and equity exposure.`,
            `<strong>Debt Component:</strong> Allocate 30% in debt funds/PPF for stability, especially if you're above 30 years.`,
            `<strong>Goal-based Investing:</strong> Create separate funds for home down payment, children's education, and retirement.`
        ];
        
        responseElement.innerHTML = `
            <div class="ai-advice">
                <h3><i class="fas fa-chart-line"></i> Investment Recommendations</h3>
                <ul>
                    ${tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        let advice = '';
        const budgetUtilization = currentBudget > 0 ? (totalExpenses / currentBudget) * 100 : 0;
        
        if (budgetUtilization > 100) {
            advice = `You're overspending by ₹${formatNumber(totalExpenses - currentBudget)}! Focus on reducing entertainment and miscellaneous expenses. Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Review your grocery spending and look for bulk buying opportunities.`;
        } else if (budgetUtilization > 80) {
            advice = `You're using ${budgetUtilization.toFixed(1)}% of your budget - be cautious! Build an emergency fund with your remaining ₹${formatNumber(currentBudget - totalExpenses)}. Track daily expenses and avoid impulse purchases. Consider meal planning to reduce grocery costs.`;
        } else {
            advice = `Excellent budget management! You have ₹${formatNumber(currentBudget - totalExpenses)} remaining. Consider investing this surplus in SIP or building an emergency fund. Your current spending pattern shows good financial discipline.`;
        }
        
        responseElement.innerHTML = `
            <div class="ai-advice">
                <h3><i class="fas fa-brain"></i> Financial Analysis</h3>
                <p>${advice}</p>
            </div>
        `;
    }
}

// Format number function
function formatNumber(num) {
    if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + ' L';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('en-IN');
}

// Save data to localStorage
function saveData() {
    const data = {
        currentBudget: currentBudget,
        currentPeriod: currentPeriod,
        totalExpenses: totalExpenses,
        expenses: {
            groceries: parseFloat(document.getElementById('groceries').value) || 0,
            transport: parseFloat(document.getElementById('transport').value) || 0,
            utilities: parseFloat(document.getElementById('utilities').value) || 0,
            entertainment: parseFloat(document.getElementById('entertainment').value) || 0,
            healthcare: parseFloat(document.getElementById('healthcare').value) || 0,
            miscellaneous: parseFloat(document.getElementById('miscellaneous').value) || 0
        }
    };
    
    localStorage.setItem('budgetData', JSON.stringify(data));
}

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('budgetData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore budget
        if (data.currentBudget > 0) {
            currentBudget = data.currentBudget;
            document.getElementById('budgetAmount').value = currentBudget;
            document.getElementById('budgetDisplay').style.display = 'block';
            document.getElementById('currentBudget').textContent = `₹${formatNumber(currentBudget)}`;
        }
        
        // Restore period
        currentPeriod = data.currentPeriod || 'monthly';
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === currentPeriod);
        });
        
        // Restore expenses
        if (data.expenses) {
            Object.entries(data.expenses).forEach(([category, amount]) => {
                document.getElementById(category).value = amount || 0;
            });
            calculateExpenses();
        }
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
