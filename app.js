function initializeExpenseTracker() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const editExpenseForm = document.getElementById('editExpenseForm');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function updateLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <strong>Amount</strong>: $${expense.amount},
                <strong>Description</strong>: ${expense.description},
                <strong>Category</strong>: ${expense.category}
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                    <button type="button" class="btn btn-primary btn-sm edit-btn" data-index="${index}">Edit</button>
                </div>
            `;
            expenseList.appendChild(listItem);
        });
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        updateLocalStorage();
        renderExpenses();
    }

    function editExpense(index) {
        const editedExpense = expenses[index];
        document.getElementById('expenseAmount').value = editedExpense.amount;
        document.getElementById('expenseDescription').value = editedExpense.description;
        document.getElementById('expenseCategory').value = editedExpense.category;
        editExpenseForm.style.display = 'block';
        editExpenseForm.dataset.editIndex = index;
    }

    editExpenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const index = editExpenseForm.dataset.editIndex;
        expenses[index].amount = document.getElementById('expenseAmount').value;
        expenses[index].description = document.getElementById('expenseDescription').value;
        expenses[index].category = document.getElementById('expenseCategory').value;
        editExpenseForm.reset();
        editExpenseForm.style.display = 'none';
        updateLocalStorage();
        renderExpenses();
    });

    function saveChanges() {
        const index = editExpenseForm.dataset.editIndex;
        expenses[index].amount = document.getElementById('expenseAmount').value;
        expenses[index].description = document.getElementById('expenseDescription').value;
        expenses[index].category = document.getElementById('expenseCategory').value;
        editExpenseForm.reset();
        editExpenseForm.style.display = 'none';
        updateLocalStorage();
        renderExpenses();
    }

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const expenseAmount = document.getElementById('expenseAmount').value;
        const expenseDescription = document.getElementById('expenseDescription').value;
        const expenseCategory = document.getElementById('expenseCategory').value;
        const newExpense = {
            amount: expenseAmount,
            description: expenseDescription,
            category: expenseCategory,
        };
        expenses.push(newExpense);
        updateLocalStorage();
        renderExpenses();
        expenseForm.reset();
    });

    expenseList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.dataset.index, 10);
            deleteExpense(index);
        } else if (event.target.classList.contains('edit-btn')) {
            const index = parseInt(event.target.dataset.index, 10);
            editExpense(index);
        }
    });

    renderExpenses();
}

initializeExpenseTracker();
