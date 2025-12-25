// document.addEventListener('DOMContentLoaded', () => {
    
//     // 1. DATA: Load from LocalStorage OR use defaults if empty
//     const defaultProperties = [
//         {
//             id: 1,
//             title: "Bole Luxury Estate",
//             neighborhood: "Bole District",
//             price: 12500000,
//             currency: "ETB",
//             specs: { "Total Land Area": "450 sq.m", "Garden Width": "12 Meters", "Floor Count": "G+2" },
//             description: "A monumental geometric design focused on open spaces."
//         }
//     ];
//     document.addEventListener('DOMContentLoaded', () => {
//     // Select the Overlays
//     const listOverlay = document.getElementById('listOverlay');
//     const authBtn = document.getElementById('authBtn');
//     const listBtn = document.getElementById('listBtn');
//     const closeList = document.getElementById('closeList');

//     // --- LIST PROPERTY BUTTON LOGIC ---
//     if (listBtn) {
//         listBtn.addEventListener('click', () => {
//             console.log("List button clicked!"); // Check your console for this!
//             listOverlay.style.display = 'block';
//             document.body.style.overflow = 'hidden'; // Stop scrolling
//         });
//     }

//     if (closeList) {
//         closeList.addEventListener('click', () => {
//             listOverlay.style.display = 'none';
//             document.body.style.overflow = 'auto';
//         });
//     }

//     // --- SIGN IN BUTTON LOGIC ---
//     if (authBtn) {
//         authBtn.addEventListener('click', () => {
//             const userName = prompt("Please enter your name to sign in:");
//             if (userName) {
//                 authBtn.innerHTML = `Welcome, ${userName}`;
//                 authBtn.style.background = "#c5a059"; // Changes to gold color
//                 authBtn.style.borderColor = "#c5a059";
//             }
//         });
//     }
// });

//     // This line "remembers" your added houses after a refresh
//     let properties = JSON.parse(localStorage.getItem('myCommunityProperties')) || defaultProperties;

//     const grid = document.getElementById('propertyGrid');
//     const overlay = document.getElementById('detailOverlay');
//     const listOverlay = document.getElementById('listOverlay');
//     const dynamicContent = document.getElementById('dynamicContent');

//     // 2. RENDER FUNCTION
//     function renderGrid(dataToRender) {
//         grid.innerHTML = '';
//         dataToRender.forEach(p => {
//             const card = document.createElement('div');
//             card.className = 'card';
//             card.innerHTML = `
//                 <div>
//                     <div class="card-meta">${p.neighborhood}</div>
//                     <div class="card-title">${p.title}</div>
//                     <div class="card-price">${p.price.toLocaleString()} ${p.currency}</div>
//                 </div>
//                 <div style="display:flex; justify-content: space-between; align-items: center;">
//                     <div class="badge" onclick="showDetails(${p.id})">Details →</div>
//                     <button class="delete-btn" onclick="deleteProperty(event, ${p.id})">Delete</button>
//                 </div>
//             `;
//             // Card click opens details, but we stop propagation on the delete button
//             card.onclick = () => showDetails(p.id);
//             grid.appendChild(card);
//         });
//     }

//     // 3. DELETE FEATURE
//     window.deleteProperty = function(event, id) {
//         event.stopPropagation(); // Prevents the "Details" overlay from opening
//         if(confirm("Are you sure you want to remove this listing?")) {
//             properties = properties.filter(p => p.id !== id);
//             saveAndRefresh();
//         }
//     }

//     // 4. BROWSE BUTTON (Scrolls to grid)
//     document.querySelector('.btn-text').onclick = () => {
//         grid.scrollIntoView({ behavior: 'smooth' });
//     };

//     // 5. SAVE TO LOCALSTORAGE
//     function saveAndRefresh() {
//         localStorage.setItem('myCommunityProperties', JSON.stringify(properties));
//         renderGrid(properties);
//     }

//     // 6. FORM SUBMISSION
//     document.getElementById('propertyForm').onsubmit = (e) => {
//         e.preventDefault();
//         const newProperty = {
//             id: Date.now(),
//             title: document.getElementById('newTitle').value,
//             neighborhood: document.getElementById('newNeighborhood').value,
//             price: parseInt(document.getElementById('newPrice').value),
//             currency: "ETB",
//             specs: {
//                 "Total Land Area": document.getElementById('newArea').value,
//                 "Garden Width": document.getElementById('newGarden').value,
//                 "Floor Count": document.getElementById('newFloors').value
//             },
//             description: document.getElementById('newDesc').value
//         };

//         properties.push(newProperty);
//         saveAndRefresh(); // Saves to disk and updates screen
        
//         alert("Published!");
//         document.getElementById('propertyForm').reset();
//         listOverlay.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     };

//     // Initialization
//     window.showDetails = function(id) {
//         const p = properties.find(x => x.id === id);
//         let specHtml = '';
//         for (const [key, value] of Object.entries(p.specs)) {
//             specHtml += `<div class="spec-item"><span class="spec-label">${key}</span><span class="spec-value">${value}</span></div>`;
//         }
//         dynamicContent.innerHTML = `<h1 style="font-size: 3rem;">${p.title}</h1><div class="spec-grid">${specHtml}</div>`;
//         overlay.style.display = 'block';
//     };

//     renderGrid(properties);
// });
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA PERSISTENCE (LocalStorage)
    const defaults = [{
        id: 1, title: "Bole Luxury Estate", neighborhood: "Bole", price: 12000000,
        currency: "ETB", specs: {"Area": "450sqm", "Garden": "12m", "Floors": "G+2"},
        description: "A monumental design with luxury finishes."
    }];
    
    let properties = JSON.parse(localStorage.getItem('nestData')) || defaults;

    // 2. DOM ELEMENTS
    const grid = document.getElementById('propertyGrid');
    const listOverlay = document.getElementById('listOverlay');
    const detailOverlay = document.getElementById('detailOverlay');
    const propForm = document.getElementById('propertyForm');

    // 3. RENDER GRID
    function render(data) {
        grid.innerHTML = '';
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div onclick="showDetails(${p.id})">
                    <small>${p.neighborhood}</small>
                    <h3>${p.title}</h3>
                    <div class="card-price">${p.price.toLocaleString()} ${p.currency}</div>
                </div>
                <button class="delete-btn" onclick="deleteItem(${p.id})">Remove Listing</button>
            `;
            grid.appendChild(card);
        });
    }

    // 4. CORE FUNCTIONS
    window.showDetails = (id) => {
        const p = properties.find(x => x.id === id);
        let specs = '';
        for (let s in p.specs) {
            specs += `<div class="spec-item"><span class="spec-label">${s}</span><span class="spec-value">${p.specs[s]}</span></div>`;
        }
        document.getElementById('dynamicContent').innerHTML = `
            <h1>${p.title}</h1>
            <div class="spec-grid">${specs}</div>
            <p>${p.description}</p>
        `;
        detailOverlay.style.display = 'block';
    };

    window.deleteItem = (id) => {
        if(confirm("Delete this property?")) {
            properties = properties.filter(x => x.id !== id);
            sync();
        }
    };

    function sync() {
        localStorage.setItem('nestData', JSON.stringify(properties));
        render(properties);
    }

    // 5. BUTTON EVENTS
    document.getElementById('listBtn').onclick = () => listOverlay.style.display = 'block';
    document.getElementById('closeList').onclick = () => listOverlay.style.display = 'none';
    document.getElementById('closeDetails').onclick = () => detailOverlay.style.display = 'none';
    
    document.getElementById('authBtn').onclick = () => {
        let user = prompt("Username:");
        if(user) document.getElementById('authBtn').innerText = user;
    };

    // 6. FORM SUBMISSION
    propForm.onsubmit = (e) => {
        e.preventDefault();
        const newP = {
            id: Date.now(),
            title: document.getElementById('newTitle').value,
            neighborhood: document.getElementById('newNeighborhood').value,
            price: Number(document.getElementById('newPrice').value),
            currency: "ETB",
            specs: {
                "Area": document.getElementById('newArea').value,
                "Garden": document.getElementById('newGarden').value,
                "Floors": document.getElementById('newFloors').value
            },
            description: document.getElementById('newDesc').value
        };
        properties.push(newP);
        sync();
        listOverlay.style.display = 'none';
        propForm.reset();
    };

    // 7. FILTERING
    document.getElementById('searchInput').oninput = (e) => {
        const val = e.target.value.toLowerCase();
        render(properties.filter(p => p.title.toLowerCase().includes(val) || p.neighborhood.toLowerCase().includes(val)));
    };

    render(properties);
});
const estArea = document.getElementById('estArea');
const estQuality = document.getElementById('estQuality');
const estTotal = document.getElementById('estTotal');

function calculateEstimate() {
    const area = parseFloat(estArea.value) || 0;
    const rate = parseFloat(estQuality.value);
    const total = area * rate;
    
    // Smoothly update the text with local currency formatting
    estTotal.innerText = `${total.toLocaleString()} ETB`;
}

// Event Listeners
estArea.addEventListener('input', calculateEstimate);
estQuality.addEventListener('change', calculateEstimate);
let selectedIds = [];

// Update the renderGrid function to include a checkbox
function renderGrid(dataToRender) {
    grid.innerHTML = '';
    dataToRender.forEach(p => {
        const isChecked = selectedIds.includes(p.id) ? 'checked' : '';
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <small>${p.neighborhood}</small>
                <input type="checkbox" class="compare-check" ${isChecked} onclick="toggleCompare(event, ${p.id})">
            </div>
            <div onclick="showDetails(${p.id})">
                <h3>${p.title}</h3>
                <div class="card-price">${p.price.toLocaleString()} ETB</div>
            </div>
            <button class="delete-btn" onclick="deleteItem(${p.id})">Remove</button>
        `;
        grid.appendChild(card);
    });
}

// Logic to handle selection
window.toggleCompare = (event, id) => {
    event.stopPropagation();
    if (selectedIds.includes(id)) {
        selectedIds = selectedIds.filter(x => x !== id);
    } else {
        if (selectedIds.length < 3) {
            selectedIds.push(id);
        } else {
            alert("You can compare up to 3 properties at a time.");
            event.target.checked = false;
        }
    }
    updateCompareBar();
};

function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const count = document.getElementById('compareCount');
    count.innerText = selectedIds.length;
    
    if (selectedIds.length >= 2) {
        bar.classList.add('active');
    } else {
        bar.classList.remove('active');
    }
}

// The Comparison Table Generator
document.getElementById('launchCompare').onclick = () => {
    const compareItems = properties.filter(p => selectedIds.includes(p.id));
    const container = document.getElementById('compareTableContainer');
    
    let tableHtml = `<table class="comparison-table"><thead><tr><th>Feature</th>`;
    compareItems.forEach(item => tableHtml += `<th>${item.title}</th>`);
    tableHtml += `</tr></thead><tbody>`;

    const features = ["Price", "Area", "Garden", "Floors"];
    features.forEach(f => {
        tableHtml += `<tr><td>${f}</td>`;
        compareItems.forEach(item => {
            let val = f === "Price" ? item.price.toLocaleString() + " ETB" : item.specs[f] || item.specs["Total Land Area"] || "N/A";
            tableHtml += `<td>${val}</td>`;
        });
        tableHtml += `</tr>`;
    });

    tableHtml += `</tbody></table>`;
    container.innerHTML = tableHtml;
    document.getElementById('compareOverlay').style.display = 'block';
};

document.getElementById('closeCompare').onclick = () => {
    document.getElementById('compareOverlay').style.display = 'none';
};