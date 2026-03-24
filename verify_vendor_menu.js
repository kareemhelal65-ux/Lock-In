async function run() {
    const vendorId = 'fake_vendor_1772707414470';

    console.log('1. Testing ADD Item Endpoint...');
    const addForm = new FormData();
    addForm.append('name', 'Agent Special Burger');
    addForm.append('price', '99');
    addForm.append('category', 'Burgers');
    addForm.append('description', 'Created by the test script');
    addForm.append('requiredHypeLevel', '0');

    const addRes = await fetch(`http://localhost:3001/api/vendorData/${vendorId}/menu`, {
        method: 'POST',
        body: addForm,
    });

    const addData = await addRes.json();
    if (!addRes.ok) throw new Error('ADD Failed: ' + JSON.stringify(addData));
    console.log('ADD Success! Created ID:', addData.item.id);

    console.log('\n2. Testing EDIT Item Endpoint...');
    const editForm = new FormData();
    editForm.append('name', 'Agent Premium Burger');
    editForm.append('price', '150');

    const editRes = await fetch(`http://localhost:3001/api/vendorData/${vendorId}/menu/${addData.item.id}`, {
        method: 'PUT',
        body: editForm,
    });

    const editData = await editRes.json();
    if (!editRes.ok) throw new Error('EDIT Failed: ' + JSON.stringify(editData));

    console.log('EDIT Success! Updated Item Name:', editData.item.name, 'Updated Price:', editData.item.price);
    console.log('Verification Complete: Menu items successfully add and edit with the Vendor API.');
}

run().catch(console.error);
