
function do_nothing(){
    let table = document.getElementById('est_table');
    amount = 0;
    // console.log(document.getElementById('est_table').rows[0].cells[4].children[0].value);
    for(let i=1; i < table.rows.length; i++){
        console.log(document.getElementById('est_table').rows[i].cells[4].children[0].value);
        x = Number(document.getElementById('est_table').rows[i].cells[4].children[0].value);
        amount += x;
    }

    document.getElementById('amount').value = amount;
    // console.log(document.getElementById('est_table').rows[2].cells[4].children[0].value);

}

function show_balance(){
    amount = Number(document.getElementById('amount').value);
    advance = Number(document.getElementById('advance').value);
    document.getElementById('balance').value = amount - advance;
}

function select_product(){
    // console.log(document.getElementById('product').value)
}

function qty_change(){
    qty = Number(document.getElementById('qty').value);
    rate = Number (document.getElementById('rate').value);
    document.getElementById('total').value = qty*rate;

}

function calculate(){
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[3].onchange = function(){
        index = this.parentElement.rowIndex;
        }
        qty = Number(document.getElementById('est_table').rows[index].cells[2].children[0].value);
        rate = Number(document.getElementById('est_table').rows[index].cells[3].children[0].value);
        document.getElementById('est_table').rows[index].cells[4].value = qty*rate;
    }
}

function delete_row() {
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {

        table.rows[i].cells[5].onclick = function() {
            if (table.rows.length !== 2){
                index = this.parentElement.rowIndex;
                table.deleteRow(index);
            }
        }
    }
}

function add_row(){
    let table = document.getElementById('est_table');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = cell1.innerHTML + `<td> <input list="products" name="product" id="product" class="form-control col">
                            <datalist id="products">
                                {% for product in products %}
                                    <option value="{{product.3}}">
                                {% endfor %}
                            </datalist>
                        </td>`
    cell2.innerHTML = cell2.innerHTML + `<td><input type="text" id="desc" class="form-control" value="" maxlength="30"></td>`
    cell3.innerHTML = cell3.innerHTML + `<td><input type="text" id="qty" class="form-control" value="" maxlength="6" onchange="calculate()"></td>`
    cell4.innerHTML = cell4.innerHTML + `<td><input type="text" id="rate" class="form-control" value="" maxlength="6" onchange="calculate()"></td>`
    cell5.innerHTML = cell5.innerHTML + `<td><input type="text" id="total" class="form-control" value="" maxlength="8" onchange="do_nothing()"></td>`
    cell6.innerHTML = cell6.innerHTML + `<td><input type="button" value="Delete" class="btn btn-outline-danger material-symbols-outlined" onclick="delete_row()" title="Delete this row"></td>`

}