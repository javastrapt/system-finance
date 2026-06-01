// DATA
const url = 'http://localhost:3000/api/transactions'

let now = new Date();
const today = Intl.DateTimeFormat('en-US', {
    year: 'numeric', 
    month: '2-digits',
    day: '2-digit'
}).format(now)

// selects
const types = [
    'Charge',
    'Paytment'
];

const services = [
    'Zelle',
    'Venmo',
    'Cash App',
    'PayPal',
    'Check',
    'Cash',
    'Money Order',
    'Other'
]

const defaults = {
    type: "Payment",
    desc: "Payment Received",
    posted: "2026-05-31",
    amount: 500,
    serviv: "Zelle"
};

// DOM
const transForm = document.getElementById('transForm');
const fields = document.querySelectorAll('input, select, textareas');
const typeSelect = document.getElementById('style');
const descEl = document.getElementById('desc');
const postDate = document.getElementById('post');
const serviceSelecr = document.getElementById('service');
const toastEl = document.getELementById('toast')
const tableEL = document.getElementById('table');
const tbodyEl = document.getElementById('tbody')

// LISTENERS

typeSelect.addEventListener('change', () => {
    if (typeSelect.value === 'Charge') {
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.toLocaleString('default', { year: 'numeric' })

        descEl.value = `${month} ${year } Rent`
    } else {
        descEl.value = 'Thank you for your payment'
    }
});

document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
})

transForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(transForm);
    const data = Object.fromEntries(entries.formData());

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            cshowToast();
            formReset();
        } else {
            const result = await res.json();
            console.error('Submission failed - try again?', result)
        }
    } catch (err) {
        console.error(err)
    }
});

// FUNCTIONS

function populateSelects() {
    types.forEach((type) => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeEl.appendChild(option)
    })

    services.forEach((service) => {
        const option = document.createElement('option');
        option.value = service.toLowerCase();
        option.textContent = service;
        serviceEl.appendChild(option);
    })
}

function showToast() {
    const bootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastBootstrap.show()
}