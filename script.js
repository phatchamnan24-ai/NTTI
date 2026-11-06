function toggleReason() {
    const status = document.getElementById('status').value;
    const reasonGroup = document.getElementById('reasonGroup');
    const reasonInput = document.getElementById('reason');

    if (status === 'ច្បាប់') {
        reasonGroup.style.display = 'block';
        reasonInput.required = true;
    } else {
        reasonGroup.style.display = 'none';
        reasonInput.required = false;
        reasonInput.value = '';
    }
}

// ចាប់យកព្រឹត្តិការណ៍ Submit Form ដើម្បីរុញទៅ Sheet Monkey
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault(); // ការពារកុំឱ្យ Page ធ្វើការ Refresh
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "កំពុងរក្សាទុក...";
    submitBtn.disabled = true;

    // បញ្ជូនទិន្នន័យទៅកាន់ Link របស់ Sheet Monkey ផ្ទាល់
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
    })
    .then(response => {
        if (response.ok) {
            // បង្ហាញផ្ទាំងចលនាជោគជ័យ
            const popup = document.getElementById('successPopup');
            popup.classList.add('show');

            form.reset();
            toggleReason();

            // លាក់ផ្ទាំងជោគជ័យវិញក្រោយ ២.៥ វិនាទី
            setTimeout(() => {
                popup.classList.remove('show');
                submitBtn.innerText = "រក្សាទុកទិន្នន័យ";
                submitBtn.disabled = false;
            }, 2500);
        } else {
            alert("មានបញ្ហាក្នុងការរក្សាទុក! សូមពិនិត្យមើល Link ម្តងទៀត។");
            submitBtn.innerText = "រក្សាទុកទិន្នន័យ";
            submitBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("ការតភ្ជាប់អ៊ីនធឺណិតមានបញ្ហា!");
        submitBtn.innerText = "រក្សាទុកទិន្នន័យ";
        submitBtn.disabled = false;
    });
});

// ==========================================
// 🛠️ ផ្នែកកូដបន្ថែមសម្រាប់ភ្ជាប់ Link ទៅ Sheet Monkey ដោយអូតូ (មិនប៉ះពាល់កូដចាស់)
// ==========================================
const mySheetMonkeyLink = "https://sheetmonkey.io";

document.addEventListener("DOMContentLoaded", function() {
    // ស្វែងរក Form ចាស់របស់អ្នកតាមរយៈ ID ឬ Tag
    const myForm = document.getElementById('attendanceForm') || document.querySelector('form');
    if (myForm) {
        myForm.action = mySheetMonkeyLink;
        myForm.method = "POST";
    }
});

// ចាប់យកព្រឹត្តិការណ៍ Submit ចាស់ ដើម្បីបន្ថែមផ្ទាំង Animation ជោគជ័យ
const targetForm = document.getElementById('attendanceForm') || document.querySelector('form');

if (targetForm) {
    targetForm.addEventListener('submit', function() {
        const submitBtn = document.getElementById('submitBtn') || document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.innerText = "កំពុងរក្សាទុក...";
        
        const popup = document.getElementById('successPopup');
        if (popup) popup.classList.add('show');
    });
}

// =======================================================
// 🛠️ កូដបន្ថែមនៅខាងក្រោមបង្អស់៖ សម្រាប់ចាប់យកលេខសូន្យខាងមុខ (009) អូតូ
// =======================================================
if (document.getElementById('attendanceForm')) {
    document.getElementById('attendanceForm').addEventListener('submit', function() {
        // ស្វែងរកប្រអប់បញ្ចូល ID រួចថែមសញ្ញា ' ពីមុខវាភ្លាមៗមុនពេលទិន្នន័យបញ្ជូនទៅ Excel
        const idInput = document.getElementById('studentId') || document.querySelector('input[name="ID"]');
        if (idInput && idInput.value && !idInput.value.startsWith("'")) {
            idInput.value = "'" + idInput.value;
        }
    }, true); // ប្រើលក្ខខណ្ឌ true ដើម្បីឱ្យវាដំណើរការមុនកូដចាស់របស់អ្នកបន្តិច
}
