// nav js
 
document.addEventListener('DOMContentLoaded', function () {
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    // 1. Target standard top-level links (Home, About, etc.)
    // We exclude links with 'dropdown-toggle' so the "Brands" menu stays open
    const topLevelLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    
    // 2. Target the sub-category links inside the mega menu
    const subCategoryLinks = document.querySelectorAll('.dropdown-item');

    const closeNavbar = () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            bsCollapse.hide();
        }
    };

    // Attach click events to both sets of links
    [...topLevelLinks, ...subCategoryLinks].forEach(link => {
        link.addEventListener('click', closeNavbar);
    });
});


 // 1. Updated Array (Har product ki apni details ke sath)
const item = [
    { 
        tag: "Premium Ring", 
        name: "The Royal Emerald", 
        price: "$249.00", 
        desc: "Handcrafted excellence with silver plating. This masterpiece features a mesmerizing emerald-cut centerpiece designed for those who value true elegance.", 
        img: "images/25 (19).jpeg",
        mat: "Shiny and Bright Stone",
        stone: "Semi-Precious Emerald"
    },
    { 
        tag: "Fine Set", 
        name: "Imperial Glow", 
        price: "$180.00", 
        desc: "A stunning set that radiates luxury. Perfect for evening events, these earrings are designed to catch the light from every angle with imperial grace.", 
        img: "images/25 (7).jpeg",
        mat: "Gold Plated Silver",
        stone: "Zirconia Crystals"
    },
    { 
        tag: "New Bow Necklace", 
        name: "Bow Pearl Necklace", 
        price: "$340.00", 
        desc: "Elegant and playful, this bow necklace features high-quality pearls. A timeless piece that adds a touch of sophisticated charm to any outfit.", 
        img: "images/25 (3).jpeg",
        mat: "14k Gold Finish",
        stone: "Freshwater Pearls"
    },
    { 
        tag: "Classic Style", 
        name: "Vintage Red Zarkoon", 
        price: "$550.00", 
        desc: "Embrace the vintage era with this deep red Zarkoon masterpiece. Detailed craftsmanship meets traditional design for a truly decent look.", 
        img: "images/25 (4).jpeg",
        mat: "Antique Brass Base",
        stone: "Ruby Red Zarkoon"
    },
    { 
        tag: "Shiny Rings", 
        name: "Elegent Pearls", 
        price: "$300.00", 
        desc: "Extra shiny finish with selected pearls. This ring set is designed for durability and maximum sparkle, making it a favorite for daily luxury.", 
        img: "images/25 (5).jpeg",
        mat: "Sterling Silver",
        stone: "Premium Pearls"
    },
    { 
        tag: "Gold Butterfly", 
        name: "Butterflies Braclets", 
        price: "$440.00", 
        desc: "Delicate butterflies linked in a timeless golden string. This bracelet represents freedom and beauty, handcrafted to fit perfectly on your wrist.", 
        img: "images/25 (12).jpeg",
        mat: "Pure Gold Plating",
        stone: "Miniature Diamonds"
    }
];

// 2. Product js
function updateProduct(index) {
    const data = item[index];
    
    // Badi image change karein
    const mainImg = document.getElementById('activeImg');
    if (mainImg) {
        mainImg.src = data.img;
    }

    // Text details update karein
    if(document.getElementById('pTag')) document.getElementById('pTag').innerText = data.tag;
    if(document.getElementById('pName')) document.getElementById('pName').innerText = data.name;
    if(document.getElementById('pPrice')) document.getElementById('pPrice').innerText = data.price;
    if(document.getElementById('pDesc')) document.getElementById('pDesc').innerText = data.desc;
    if(document.getElementById('pMat')) document.getElementById('pMat').innerText = data.mat;
    if(document.getElementById('pStone')) document.getElementById('pStone').innerText = data.stone;

    // Active thumbnail style (Glow effect)
    const thumbnails = document.querySelectorAll('.p-thumb');
    thumbnails.forEach(t => t.classList.remove('active'));
    if(thumbnails[index]) thumbnails[index].classList.add('active');
}

// 3. Modal Information Sync
function prepareOrderModal() {
    // Current name modal mein set karein
    const currentName = document.getElementById('pName').innerText;
    document.getElementById('modalProd').innerText = currentName;
    
    // Form views reset karein
    document.getElementById('orderFormStep').style.display = 'block';
    document.getElementById('orderSuccessStep').style.display = 'none';
}

// 4. Order Processing (Success Step)
function processOrder() {
    const currentName = document.getElementById('pName').innerText;
    document.getElementById('orderFormStep').style.display = 'none';
    document.getElementById('orderSuccessStep').style.display = 'block';
    document.getElementById('successItem').innerText = currentName;
}
// brands categories js

 
let cartItems = []; 
let tempProduct = null; 

function showModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'flex'; 
}

function hideModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'none'; 
}

function toggleCart() { 
    document.getElementById('cart-panel').classList.toggle('active'); 
}

function prepareItem(name, price) {
    tempProduct = { name: name, price: parseFloat(price) };
    showModal('confirmModal');
}

function addToCart() {
    if (tempProduct) {
        cartItems.push(tempProduct);
        updateUI();
        hideModal('confirmModal');
        tempProduct = null;
    }
}

function remove(index) {
    cartItems.splice(index, 1);
    updateUI();
}

function updateUI() {
    const list = document.getElementById('cart-list');
    const buyBtn = document.getElementById('cart-buy-btn');
    const totalContainer = document.getElementById('total-container');
    const totalPriceDisplay = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    if(cartCount) cartCount.innerText = cartItems.length;

    if (cartItems.length === 0) {
        list.innerHTML = '<p style="color:#888; text-align:center;">Your cart is empty</p>';
        if(buyBtn) buyBtn.style.display = 'none';
        if(totalContainer) totalContainer.style.display = 'none';
    } else {
        list.innerHTML = '';
        let total = 0;
        cartItems.forEach((item, i) => {
            total += item.price;
            list.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                    <div>
                        <div style="font-weight:600;">${item.name}</div>
                        <div style="font-size:13px; color:#C5A021;">$${item.price.toFixed(2)}</div>
                    </div>
                    <span style="color:red; cursor:pointer; font-size:12px; font-weight:bold;" onclick="remove(${i})">REMOVE</span>
                </div>`;
        });
        if(totalPriceDisplay) totalPriceDisplay.innerText = `$${total.toFixed(2)}`;
        if(buyBtn) buyBtn.style.display = 'block';
        if(totalContainer) totalContainer.style.display = 'block';
    }
}

// FIX: Sirf EK checkout function rakhein jo confirmation modal dikhaye
function checkout() {
    if(cartItems.length > 0) {
        toggleCart(); 
        showModal('checkoutConfirmModal');
    } else {
        alert("Please add items to cart first!");
    }
}

// FIX: CONFIRM dabane par yeh function WhatsApp par le jayega
function processFinalOrder() {
    if(cartItems.length === 0) return;

    // 1. WhatsApp message banayein
    let message = "Hi, I want to order:%0A";
    cartItems.forEach(item => {
        message += `- ${item.name} ($${item.price.toFixed(2)})%0A`;
    });
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    message += `%0ATotal: $${total.toFixed(2)}`;

    // 2. WhatsApp URL (Replace with your actual number)
    const phoneNumber = "923001234567";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // 3. WhatsApp ko nayi tab mein kholein
    window.open(whatsappUrl, '_blank');

    // 4. UI clean-up
    hideModal('checkoutConfirmModal');
    showModal('successModal');

    // 5. Cart reset karein
    cartItems = [];
    updateUI();
}
    // js gallery
    // Order form kholne ke liye
function openOrderForm(productName) {
    document.getElementById('selected-product').innerText = "Product: " + productName;
    document.getElementById('orderFormModal').style.display = 'flex';
}

// Modal band karne ke liye
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Final Order Confirm karne ke liye
function confirmFinalOrder(event) {
    event.preventDefault(); // Page refresh hone se rokna
    
    // Form data yahan handle ho sakta hai
    
    document.getElementById('orderFormModal').style.display = 'none'; // Form band karo
    document.getElementById('gallerySuccessModal').style.display = 'flex'; // Success dikhao
    
    event.target.reset(); // Form clear karo
}

// Esc key se modal band karne ka option (Bonus)
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}
    
    function showTab(tabId, btnElement) {
    const tabs = document.querySelectorAll('.tab-content-box');
    const buttons = document.querySelectorAll('.tab-btn');
    const isAlreadyActive = btnElement.classList.contains('active');

    // 1. Pehle sab clear karo
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (isAlreadyActive) {
        // Agar wahi button dobara dabaya to Default state (Teeno barabar)
        tabs.forEach(tab => {
            tab.style.display = 'block';
            tab.style.flex = '1';
        });
    } else {
        // 2. Sirf select kiye huye ko dikhao baaki hide karo
        tabs.forEach(tab => {
            if (tab.id === tabId) {
                tab.style.display = 'block';
                tab.style.flex = 'none';
                tab.style.width = '100%'; // Full width single view
                btnElement.classList.add('active');
            } else {
                tab.style.display = 'none';
            }
        });
    }
}
    // js about us with feedback
    document.getElementById('ultraLuxForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    // Luxury Animation State
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> AUTHENTICATING...';
    btn.disabled = true;

    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById('luxSuccess'));
        modal.show();
        
        btn.innerHTML = 'SUBMIT FEEDBACK <i class="fas fa-chevron-right ms-2 small"></i>';
        btn.disabled = false;
        this.reset();
    }, 2000);
});