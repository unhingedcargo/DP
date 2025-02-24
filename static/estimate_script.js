function show_summary() {
    if (document.getElementById('summary_tag').hasAttribute("hidden")) {
        set_total()
        document.getElementById('summary_tag').removeAttribute("hidden");
    } else {
        document.getElementById('summary_tag').setAttribute("hidden", "hidden");
    }
}

function qty_changed(){
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[1].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[1].children[0].value);
        rate = Number(table.rows[index].cells[2].children[0].value);
        document.getElementById('est_table').rows[index].cells[4].children[0].value = Number(qty*rate).toFixed(2);
        }
    }
}

function rate_changed(){
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[2].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[1].children[0].value);
        rate = Number(table.rows[index].cells[2].children[0].value);
        document.getElementById('est_table').rows[index].cells[4].children[0].value = Number(qty*rate).toFixed(2);
        }
    }
}

function set_total() {
    let table = document.getElementById('est_table');
    let amount = 0.0;
    let taxable_amount = 0.0;
    for(let i = 1; i<table.rows.length; i++) {                
        taxable_amount += Number(table.rows[i].cells[4].children[0].value);
    }

    disc = Number(document.getElementById('discount').value);
    taxable_amount -= disc;
    amount = taxable_amount;
    document.getElementById('subtotal_text').innerText = Math.round(taxable_amount);
    document.getElementById('subtotal').value = Math.round(taxable_amount);
    
    document.getElementById('total').innerText = Math.round(amount);
    document.getElementById('grandtotal').value = Math.round(amount);
    advance_added()
    tax_applied()
    calculate_taxes()
}

function tax_applied() {
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {
        table.rows[i].cells[3].onchange = function(){
        index = this.parentElement.rowIndex;
        qty = Number(table.rows[index].cells[1].children[0].value);
        rate = Number(table.rows[index].cells[2].children[0].value);
        tax_rate = Number(table.rows[index].cells[3].children[0].value);
        tax = (tax_rate/100);
        table.rows[index].cells[3].children[1].value = Number(qty*rate*tax).toFixed(2);
        }
    }
}

function put_discount() {
    set_total()
    // let amount = Number(document.getElementById('total').innerText);
    // let disc = Number(document.getElementById('discount').value);
    // document.getElementById('total').innerText = (amount - disc);
    // document.getElementById('total_text').value = (amount-disc);
    // document.getElementById('disc_value').innerText = ("-" + disc);
    

}

function advance_added() {
    let amount = Number(document.getElementById('total').innerText);
    let advance = Number(document.getElementById('advance').value);
    document.getElementById('balance_text').innerText = Math.round(amount - advance);
    document.getElementById('balance').value = Math.round(amount - advance);
}

function delete_row() {
    let index, table = document.getElementById('est_table');
    for(let i = 0; i<table.rows.length; i++) {

        table.rows[i].cells[5].onclick = function() {
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
    const item_html = document.getElementById('table_item_list').outerHTML;
    const tax_html = document.getElementById('table_tax_list').outerHTML;
    const table_body = document.getElementById("est_table_body").innerHTML;
    const table = document.getElementById('est_table');
    
    const newRow = table.insertRow();

    const cell0 = newRow.insertCell(0);
    const cell1 = newRow.insertCell(1);
    const cell2 = newRow.insertCell(2);
    const cell3 = newRow.insertCell(3);
    const cell4 = newRow.insertCell(4);
    const cell5 = newRow.insertCell(5);
    


    cell0.innerHTML = cell0.innerHTML + item_html;
    cell1.innerHTML = cell1.innerHTML + `<td> <input type="text" name="qty" id="qty" class="form-control text-end" maxlength=5 value=0.0 onchange="qty_changed()"> </td>`;
    cell2.innerHTML = cell2.innerHTML + `<td> <input type="text" name="rate" id="rate" class="form-control text-end" maxlength=5 value=0.0 onchange="rate_changed()"> </td>`;
    cell3.innerHTML = cell3.innerHTML + tax_html;
    cell4.innerHTML = cell4.innerHTML + `<td>
              <input type="text" name="amount" id="amount" class="form-control text-end" readonly value=0.0 onblur="set_total()" onfocus="set_total()">              
            </td>`;
    cell5.innerHTML = cell5.innerHTML + `<td> 
        <button type="button" class="btn-close" aria-label="Close" onclick="delete_row()"></button>
            </td>`;

  }

function calculate_taxes() {
    let table = document.getElementById('est_table');
    let gst0=0.0, gst5=0.0, gst12=0.0, gst18=0.0, gst28=0.0;
    for(let i = 1; i<table.rows.length; i++) {
        let tax_rate = Number(table.rows[i].cells[3].children[0].value);
        let tax_amount = Number(table.rows[i].cells[3].children[1].value);

        if(tax_rate == 0) {
            gst0 += tax_amount;
        } else if(tax_rate == 5) {
            gst5 += tax_amount;
        } else if(tax_rate == 12) {
            gst12 += tax_amount;
        } else if(tax_rate == 18) {
            gst18 += tax_amount;
        } else if(tax_rate == 28) {
            gst28 += tax_amount;
        }
    }
    total_tax = gst0+gst5+gst12+gst18+gst28;
    taxes = [gst0, gst5, gst12, gst18, gst28];
    document.getElementById('sgst_text').innerText = Number(total_tax/2).toFixed(2);
    document.getElementById('sgst').value = Number(total_tax/2).toFixed(2);
    document.getElementById('cgst_text').innerText = Number(total_tax/2).toFixed(2);
    document.getElementById('cgst').value = Number(total_tax/2).toFixed(2);
    document.getElementById('igst_text').innerText = total_tax;
    document.getElementById('igst').value = total_tax;
    document.getElementById('applied_tax_amount').value = total_tax;
    document.getElementById('total').innerText = Math.round(Number(document.getElementById('total').innerText)+total_tax);
    document.getElementById('grandtotal').value = Math.round(Number(document.getElementById('grandtotal').value)+total_tax);

    advance_added()
}

function add_contact() {
    document.getElementById('contact').value = document.getElementById("customer_contact").value;
}

function add_customer() {
    document.getElementById('customer_select').setAttribute("hidden", "hidden");
    
}

function search_customer() {
    let x = document.getElementById("customercontainer");
    let cust_data = JSON.parse(x.getAttribute("data-json"));
    let z = document.getElementById("gstcode");
    const company_gstcode = z.getAttribute("data");
    

    let c_search = document.getElementById("customer_select").value;
    document.getElementById('customer').value = c_search;

    let c_load = document.getElementById("customer_load");
    cust_gstcode = "";
       
    for(let i=0;i<cust_data.length;i++) {
        if (c_search == "") {
            c_load.setAttribute("hidden","hidden");
            document.getElementById("contact_text").setAttribute("hidden","hidden");
            
        } else if(c_search == "Cash Sales" || c_search == "Cash") {
            document.getElementById("contact_text").removeAttribute("hidden");
            c_load.setAttribute("hidden","hidden");
    
        } else if(c_search!="" && c_search == cust_data[i]['display_name']) {
            cust_details = cust_data[i];
            cust_gstcode = cust_details['gstin'].slice(0,2)
            
            document.getElementById("contact_text").setAttribute("hidden","hidden");
            document.getElementById('contact').value = cust_details['contact'];
        c_load.innerHTML = `<tbody class="text-start">
        <tr class="row mx-3">
        <td class="col bg-opacity-10 bg-light">Bill To : ${ cust_details['display_name'] }</td>
            
        </tr>
        <tr class="row mx-3">
        <td class="col bg-opacity-10 bg-light">Contact No. : ${ cust_details['contact'] }</td>
        </tr>
        
        <tr class="row mx-3">
        <td class="col bg-opacity-10 bg-light">Place of Supply : </td>
        
        </tr>
        </tbody>`;
        document.getElementById("customer_load").removeAttribute("hidden");
        }
            if(cust_gstcode != "" && company_gstcode != cust_gstcode) {
                document.getElementById('idigst').removeAttribute('hidden');
                document.getElementById('idsgst').setAttribute('hidden','hidden');
                document.getElementById('tax_type').value = 'igst';
            } else {
                document.getElementById('idsgst').removeAttribute('hidden');
                document.getElementById('idigst').setAttribute('hidden','hidden');
                document.getElementById('tax_type').value = 'sgst';
            }
    }
}


function item_added() {
    console.log("Item selected");
}




// {{customer|json_script:"customer_json"}}