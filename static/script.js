function show_summary() {
    // var x = document.getElementById("summary_tag");
    // if (x.style.display === "none") {
    //     x.style.display = "inline";
    // } else {
    //     x.style.display = "none";
    // }
    if (document.getElementById('summary_tag').hasAttribute("hidden")) {
        document.getElementById('summary_tag').removeAttribute("hidden");
    } else {
        document.getElementById('summary_tag').setAttribute("hidden", "hidden");
    }
    set_total()
}


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

function qty_changed(){
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[2].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[2].children[0].value);
        rate = Number(table.rows[index].cells[3].children[0].value);
        document.getElementById('est_table').rows[index].cells[5].children[0].value = Number(qty*rate).toFixed(2);
        }
    }
}

function rate_changed(){
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[3].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[2].children[0].value);
        rate = Number(table.rows[index].cells[3].children[0].value);
        document.getElementById('est_table').rows[index].cells[5].children[0].value = Number(qty*rate).toFixed(2);
        }
    }
}

function set_total() {
    let table = document.getElementById('est_table');
    let amount = 0.0;
    let taxable_amount = 0.0;
    for(let i = 1; i<table.rows.length; i++) {
        qty = Number(table.rows[i].cells[2].children[0].value);
        rate = Number(table.rows[i].cells[3].children[0].value);
        
        amount += Number(table.rows[i].cells[5].children[0].value);
        taxable_amount += qty*rate;
    }
        document.getElementById('sub_total').innerText = taxable_amount;
        document.getElementById('subtotal_text').value = taxable_amount;

    if(document.getElementById('sgst')) {
        document.getElementById('sgst').innerText = Number((amount - taxable_amount)/2).toFixed(2);
        document.getElementById('sgst_text').value = Number((amount - taxable_amount)/2).toFixed(2);        
    }
    if(document.getElementById('cgst')) {
        document.getElementById('cgst').innerText = Number((amount - taxable_amount)/2).toFixed(2);
        document.getElementById('cgst_text').value = Number((amount - taxable_amount)/2).toFixed(2);
    }
    if(document.getElementById('igst')) {
        document.getElementById('igst').innerText = Number((amount - taxable_amount)).toFixed(2);
        document.getElementById('igst_text').value = Number((amount - taxable_amount)).toFixed(2);
    }
    
    document.getElementById('total').innerText = Math.round(amount);
    document.getElementById('total_text').value = Math.round(amount);
    advance_added()
}

function tax_applied() {
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[4].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[2].children[0].value);
        rate = Number(table.rows[index].cells[3].children[0].value);
        tax_rate = Number(table.rows[index].cells[4].children[0].value);
        tax = 1 + (tax_rate/100);
        document.getElementById('est_table').rows[index].cells[5].children[0].value = Number(qty*rate*tax).toFixed(2);
        }
    }
}

function put_discount() {
    set_total()
    let amount = Number(document.getElementById('total').innerText);
    let disc = Number(document.getElementById('discount').value);
    document.getElementById('total').innerText = (amount - disc);
    document.getElementById('total_text').value = (amount-disc);
    document.getElementById('disc_value').innerText = ("-" + disc);
    

}

function advance_added() {
    let amount = Number(document.getElementById('total').innerText);
    let advance = Number(document.getElementById('advance').value)
    document.getElementById('balance').innerText = (amount - advance);
    document.getElementById('balance_text').value = (amount - advance);
}

function delete_row() {
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {

        table.rows[i].cells[6].onclick = function() {
            if (table.rows.length !== 2){
                index = this.parentElement.rowIndex;
                if (index !== 1) {
                    table.deleteRow(index);
                }
            }
        }
    }
}

function add_row() {
    let table = document.getElementById('est_table');
    
    const newRow = table.insertRow();

    const cell0 = newRow.insertCell(0);
    const cell1 = newRow.insertCell(1);
    const cell2 = newRow.insertCell(2);
    const cell3 = newRow.insertCell(3);
    const cell4 = newRow.insertCell(4);
    const cell5 = newRow.insertCell(5);
    const cell6 = newRow.insertCell(6);


    cell0.innerHTML = cell0.innerHTML + `<td> 
              <input type="text" name="item" id="item" class="form-control">
              </td>`
    cell1.innerHTML = cell1.innerHTML + `<td> <input type="text" name="desc" id="desc" class="form-control" maxlength=30> </td>`
    cell2.innerHTML = cell2.innerHTML + `<td> <input type="text" name="qty" id="qty" class="form-control" maxlength=5 value=0.0 onchange="qty_changed()"> </td>`
    cell3.innerHTML = cell3.innerHTML + `<td> <input type="text" name="rate" id="rate" class="form-control" maxlength=5 value=0.0 onchange="rate_changed()"> </td>`
    cell4.innerHTML = cell4.innerHTML + `<td>
              <input type="text" name="tax" id="tax" class="form-control" maxlength=2 value=0 onchange="tax_applied()">
            </td>`
    cell5.innerHTML = cell5.innerHTML + `<td>
              <input type="text" name="amount" id="amount" class="form-control" readonly  value=0.0 onblur="set_total()" onfocus="set_total()">              
            </td>`
    cell6.innerHTML = cell6.innerHTML + `<td>
              <button type="button" class="btn-close" aria-label="Close" onclick="delete_row()"></button>
            </td>`

  }




