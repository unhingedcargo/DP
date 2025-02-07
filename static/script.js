
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
    let table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {

        table.rows[i].cells[6].onclick = function() {
            if (table.rows.length !== 2){
                let index = this.parentElement.rowIndex;
                table.deleteRow(index);
            }
        }
    }
}

function add_row() {
    let table = document.getElementById('est_table');
    console.log(table);
    console.log("Estimate");
    const newRow = table.insertRow();

    const cell0 = newRow.insertCell(0);
    const cell1 = newRow.insertCell(1);
    const cell2 = newRow.insertCell(2);
    const cell3 = newRow.insertCell(3);
    const cell4 = newRow.insertCell(4);
    const cell5 = newRow.insertCell(5);
    const cell6 = newRow.insertCell(6);


    cell0.innerHTML = cell0.innerHTML + `<td> <select class="form-select" name="tax" id="tax">
                <option value=""></option>
              </select>
              <!-- <input type="text" name="item" id="item" class="form-control"> --> </td>`
    cell1.innerHTML = cell1.innerHTML + `<td> <input type="text" name="desc" id="desc" class="form-control" maxlength=30> </td>`
    cell2.innerHTML = cell2.innerHTML + `<td> <input type="text" name="qty" id="qty" class="form-control" maxlength=5 value=0.0> </td>`
    cell3.innerHTML = cell3.innerHTML + `<td> <input type="text" name="rate" id="rate" class="form-control" maxlength=5 value=0.0> </td>`
    cell4.innerHTML = cell4.innerHTML + `<td>
              <select class="form-select" name="tax" id="tax">
                <option value=""></option>
              </select>
            </td>`
    cell5.innerHTML = cell5.innerHTML + `<td>
              <input type="text" name="details" id="amount" class="form-control" readonly  value=0.0>              
            </td>`
    cell6.innerHTML = cell6.innerHTML + `<td>
              <button type="button" class="btn-close" aria-label="Close" onclick="delete_row()"></button>
            </td>`

  }




