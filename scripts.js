// script.js

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.getAttribute('data-page');

    // Initialize data if not already present
    if (!localStorage.getItem('transactions')) {
        generateAndStoreData();
    }

    if (currentPage === 'transactions') {
        displayTransactions();
    } else if (currentPage === 'alerts') {
        displayAlerts();
    } else if (currentPage === 'home') {
        displayStatistics();
    }

    // Function to generate and store transactions and alerts
    function generateAndStoreData() {
        const transactions = generateTransactions(1000);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        const alerts = generateAlerts(transactions);
        localStorage.setItem('alerts', JSON.stringify(alerts));
    }

    // Function to generate random date within the past 30 days
    function getRandomDate() {
        const start = new Date();
        const end = new Date(start);
        end.setDate(start.getDate() - 30);
        const date = new Date(start.getTime() - Math.random() * (start.getTime() - end.getTime()));
        return date.toISOString().split('T')[0];
    }

    // Function to generate random amount
    function getRandomAmount() {
        return `$${(Math.random() * 2000 + 50).toFixed(2)}`;
    }

    // Function to generate random status
    function getRandomStatus() {
        const rand = Math.random();
        if (rand > 0.7) return 'Failed';
        if (rand > 0.2) return 'Approved';
        return 'Suspicious';
    }

    // Function to generate transactions
    function generateTransactions(count) {
        return Array.from({ length: count }, (_, i) => ({
            id: `T${String(i + 1).padStart(4, '0')}`,
            amount: getRandomAmount(),
            status: getRandomStatus(),
            date: getRandomDate()
        }));
    }

    // Function to generate alerts based on transactions
    function generateAlerts(transactions) {
        return transactions.filter(tx => tx.status === 'Suspicious' || tx.status === 'Failed')
            .map(tx => ({
                id: `A${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
                type: tx.status === 'Suspicious' ? 'Suspicious Transaction' : 'Failed Transaction',
                description: tx.status === 'Suspicious' 
                    ? `Transaction ID ${tx.id} flagged due to unusual activity.` 
                    : `Transaction ID ${tx.id} failed due to insufficient funds.`,
                date: tx.date
            }));
    }

    // Function to display transactions on Transactions Page
    function displayTransactions() {
        const transactionTable = document.querySelector('#transaction-table tbody');
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.status}</td>
                <td>${transaction.date}</td>
            `;
            transactionTable.appendChild(row);
        });
    }

    // Function to display alerts on Alerts Page
    function displayAlerts() {
        const alertBox = document.querySelector('#alert-box');
        const alerts = JSON.parse(localStorage.getItem('alerts')) || [];

        alerts.forEach(alert => {
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('alert-item');
            alertDiv.innerHTML = `
                <h4>${alert.type}</h4>
                <p>${alert.description}</p>
                <span>${alert.date}</span>
            `;
            alertBox.appendChild(alertDiv);
        });
    }

    // Function to display statistics on Home Page
    function displayStatistics() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        const stats = {
            UPI: {
                name: 'UNIFIED PAYMENTS INTERFACE',
                category: 'Live Banks',
                count: '605',
                img: './UPI.png'
            },
            IMPS: {
                name: 'IMMEDIATE PAYMENT SERVICE',
                category: 'Member Banks',
                count:  '895',
                img: './imps-logo.png'
            },
            NACH: {
                name: 'NATIONAL AUTOMATED CLEARING HOUSE',
                category: 'NACH Credit',
                count: '1359',
                img: './NACH.png'
            },
            AEPS: {
                name: 'AADHAAR ENABLED PAYMENT SYSTEM',
                category: 'Live Entities',
                count: '151',
                img: './AEPS.png'
            },
            NFS: {
                name: 'NATIONAL FINANCIAL SWITCH',
                category: 'NFS Member Banks',
                count:  '1358',
                img: './nfs.png'
            },
            RuPay: {
                name: 'RuPay',
                category: 'Live Banks',
                count: "1333",
                img: './RUPAY.png'
            }
        };
        

        const statisticsContainer = document.querySelector('.statistics-container');
        Object.keys(stats).forEach(key => {
            const stat = stats[key];
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${stat.img}" alt="${key} Logo">
                <h2>${key}</h2>
                <p>${stat.name}</p>
                <p>${stat.category}</p>
                <p class="count">${stat.count}</p>
                <span class="arrow"></span>
            `;
            statisticsContainer.appendChild(card);
        });
    }
});
