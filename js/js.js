 
 
 
 let currentPrescriptionIndex = null;


let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];


function saveToLocalStorage() {
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
}


function renderPrescriptions() {
    const prescriptionList = document.getElementById('prescriptionList');
    prescriptionList.innerHTML = '';

    prescriptions.forEach((prescription, index) => {
        const prescriptionItem = document.createElement('div');
        prescriptionItem.className = 'list-group-item';
        prescriptionItem.id = `prescription-${index}`;
        prescriptionItem.innerHTML = `
            <h5>${prescription.patientName}</h5>
            <p><strong>الأدوية:</strong> ${prescription.medications}</p>
            <p><strong>ملاحظات الطبيب:</strong> ${prescription.doctorNotes}</p>
            <button class="btn btn-warning btn-sm" onclick="editPrescription(${index})">تعديل</button>
            <button class="btn btn-danger btn-sm" onclick="deletePrescription(${index})">حذف</button>
        `;
        prescriptionList.appendChild(prescriptionItem);
    });
}

// التعامل مع حفظ النموذج (إضافة أو تعديل)
document.getElementById('prescriptionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const medications = document.getElementById('medications').value;
    const doctorNotes = document.getElementById('doctorNotes').value;

    if (currentPrescriptionIndex !== null) {
        // تعديل روشتة موجودة
        prescriptions[currentPrescriptionIndex] = { patientName, medications, doctorNotes };
        currentPrescriptionIndex = null;
    } else {
       
        prescriptions.push({ patientName, medications, doctorNotes });
    }

    saveToLocalStorage();
    renderPrescriptions();
    document.getElementById('prescriptionForm').reset();
});


function editPrescription(index) {
    const prescription = prescriptions[index];
    document.getElementById('patientName').value = prescription.patientName;
    document.getElementById('medications').value = prescription.medications;
    document.getElementById('doctorNotes').value = prescription.doctorNotes;
    currentPrescriptionIndex = index;
}


function deletePrescription(index) {
    prescriptions.splice(index, 1);
    saveToLocalStorage();
    renderPrescriptions();
}


document.addEventListener('DOMContentLoaded', renderPrescriptions);