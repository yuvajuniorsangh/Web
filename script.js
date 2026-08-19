// --- script.js : कृष्ण जन्माष्टमी महोत्सव 2026 ---

// 🔥 1. फायरबेस के सही इम्पोर्ट्स (गिनती करने वाले फीचर के साथ)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBRI36zVkKt6PShl0AWzyLWw_V92zpA4g4",
    authDomain: "yuva-juniour-sangh.firebaseapp.com",
    projectId: "yuva-juniour-sangh",
    storageBucket: "yuva-juniour-sangh.firebasestorage.app",
    messagingSenderId: "372832457105",
    appId: "1:372832457105:web:3b5ce1fad0cbbc87b40a30",
    measurementId: "G-X9V947QE96"
};

// फायरबेस चालू करें
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// अब बाकी का DOM कोड शुरू होगा
document.addEventListener("DOMContentLoaded", function() {
    
    console.log("वेबसाइट सफलतापूर्वक लोड हो गई है! जय श्री कृष्ण! 🙏");

    /* ========================================================
       🌟 नया फीचर: बड़े अक्षरों वाला कस्टम सक्सेस पॉप-अप
    ======================================================== */
    function showSuccessPopup(regNo, message) {
        const modal = document.createElement('div');
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px;`;
        modal.innerHTML = `
            <div style="background: #fffaf0; padding: 30px; border-radius: 15px; text-align: center; max-width: 450px; width: 100%; border: 4px solid #d84315; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: zoomIn 0.3s ease;">
                <h2 style="color: #2e7d32; font-size: 28px; margin-top: 0;">🎉 रजिस्ट्रेशन सफल!</h2>
                <p style="font-size: 17px; color: #444; margin-bottom: 15px;">${message}</p>
                <div style="background: #fff3e0; padding: 20px; border-radius: 10px; border: 2px dashed #ffb74d;">
                    <p style="margin: 0; color: #555; font-size: 16px; font-weight: bold;">आपका रजिस्ट्रेशन नंबर:</p>
                    <h1 style="color: #d84315; font-size: 42px; margin: 10px 0; letter-spacing: 2px; font-weight: 900;">${regNo}</h1>
                </div>
                <p style="color: #c62828; font-weight: bold; font-size: 16px; margin-top: 20px;">⚠️ कृपया भविष्य के लिए इस नंबर को लिख लें या इसका स्क्रीनशॉट ले लें।</p>
                <button id="closePopupBtn" style="background: #d84315; color: white; border: none; padding: 12px 30px; font-size: 18px; border-radius: 8px; cursor: pointer; margin-top: 15px; font-weight: bold; width: 100%;">ठीक है (OK)</button>
            </div>
            <style>@keyframes zoomIn { from {transform: scale(0.5); opacity: 0;} to {transform: scale(1); opacity: 1;} }</style>
        `;
        document.body.appendChild(modal);
        document.getElementById('closePopupBtn').addEventListener('click', () => { modal.remove(); });
    }
    /* ========================================================
       🌟 नया फीचर: डेटा सेव होते समय लोडिंग (Please Wait) स्क्रीन
    ======================================================== */
    function showLoading() {
        if(document.getElementById('global-loader')) return;
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 999999;`;
        loader.innerHTML = `
            <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #d84315; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 15px;"></div>
            <h3 style="color: white; font-family: sans-serif; margin: 0; font-size: 22px;">⏳ कृपया प्रतीक्षा करें...</h3>
            <p style="color: #ffcc80; font-family: sans-serif; margin-top: 8px; font-size: 15px;">डेटा सेव हो रहा है, कृपया बैक (Back) न करें!</p>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        `;
        document.body.appendChild(loader);
    }

    function hideLoading() {
        const loader = document.getElementById('global-loader');
        if (loader) loader.remove();
    }

    /* ========================================================
       🌟 नया फीचर: पेमेंट QR के नीचे महत्वपूर्ण सूचना बॉक्स जोड़ना
       यह कोड अपने आप QR इमेज के नीचे सुंदर बॉक्स बना देगा
    ======================================================== */
    const qrImage = document.querySelector('#donationForm img, .payment-qr-img, [src*="qr"]');
    if (qrImage && !document.querySelector('.payment-alert')) {
        const alertBox = document.createElement('div');
        alertBox.className = 'payment-alert';
        alertBox.style.cssText = `
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
            padding: 15px;
            margin: 15px auto;
            width: 90%;
            max-width: 400px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.5;
            text-align: left;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        alertBox.innerHTML = `
            <strong style="color: #d84315; font-size: 16px; display: inline-block; margin-bottom: 5px;">⚠️ महत्वपूर्ण सूचना:</strong><br>
            कृपया पेमेंट करने के बाद उसका <b>स्क्रीनशॉट (SS)</b> ज़रूर लें और नीचे दिया गया <b>फॉर्म अवश्य भरें</b>। यह QR कोड सीधे तौर पर संघ का नहीं है, बल्कि संघ के एक सदस्य का व्यक्तिगत QR कोड है। इसलिए, आपके सहयोग की सही पुष्टि के लिए फॉर्म भरना अनिवार्य है।
        `;
        qrImage.parentNode.insertBefore(alertBox, qrImage.nextSibling);
    }

    /* ========================================================
       2. GLOBAL / NAVIGATION LOGIC (Scrollspy)
    ======================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) { 
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });

    /* ========================================================
       3. HOME SECTION LOGIC (Auto-Scroll Slider)
    ======================================================== */
    let slideIndex = 0;
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return; 

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }    
        slides[slideIndex - 1].style.display = "block";  
        setTimeout(showSlides, 3500); 
    }
    showSlides();

    /* ========================================================
       4. BHAGWAAN KRISHNA SECTION LOGIC (Lightbox Feature)
    ======================================================== */
    const gridItems = document.querySelectorAll('.grid-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxText = document.getElementById('lightbox-text');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (gridItems.length > 0 && lightboxModal) {
        gridItems.forEach(item => {
            item.addEventListener('click', () => {
                const caption = item.querySelector('.img-caption').innerText;
                const placeholderText = item.querySelector('.img-placeholder').innerText;
                lightboxText.innerHTML = `
                    <h3>${caption}</h3>
                    <p style="color:#777; font-size:1.1rem; font-style:italic;">${placeholderText} जल्द ही अपलोड की जाएगी!</p>
                `;
                lightboxModal.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }

    /* ========================================================
       5. GALLERY SECTION LOGIC (Lightbox Feature)
    ======================================================== */
    const galleryCards = document.querySelectorAll('.memory-card');

    if (galleryCards.length > 0 && lightboxModal) {
        galleryCards.forEach(card => {
            card.addEventListener('click', () => {
                const caption = card.querySelector('.photo-caption').innerText;
                const imgElement = card.querySelector('img');
                let imgContent = "";

                if (imgElement) {
                    imgContent = `<img src="${imgElement.src}" style="max-width: 100%; max-height: 65vh; border-radius: 10px; margin-bottom: 15px; object-fit: contain;">`;
                } else {
                    imgContent = `<div style="background: linear-gradient(135deg, #ffcc80 0%, #ffb74d 100%); width: 100%; min-height: 180px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">[ Photo ]</div>`;
                }

                lightboxText.innerHTML = `
                    <h3 style="color: #d84315; border-bottom: 2px dashed #ffcc80; padding-bottom: 8px; margin-bottom: 15px;">${caption}</h3>
                    ${imgContent}
                    <p style="color:#555; font-size:1rem; margin: 0;">युवा जूनियर संघ की पुरानी यादें...</p>
                `;
                lightboxModal.classList.add('active');
            });
        });
    }

    /* ========================================================
       6. ABOUT US SECTION LOGIC (Scroll Reveal Animation)
    ======================================================== */
    const aboutBoxes = document.querySelectorAll('.history-box, .founders-box');
    if (aboutBoxes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        aboutBoxes.forEach(box => { observer.observe(box); });
    }
   
    /* ========================================================
       7. वॉलंटियर फॉर्म (Custom ID, Photo Storage & Loading के साथ)
    ======================================================== */
    const volunteerForm = document.getElementById('volunteerRegistrationForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const vPassword = document.getElementById('v-password').value;
            if(vPassword !== "101PRASH") {
                alert("पासवर्ड गलत है! यह फॉर्म केवल अधिकृत सदस्यों के लिए है।"); return;
            }
            const mobile = document.getElementById('v-mobile').value;
            if(mobile.length !== 10) {
                alert("⚠️ कृपया 10 अंकों का सही मोबाइल नंबर डालें।"); return;
            }
            const shifts = Array.from(document.querySelectorAll('input[name="shift"]:checked')).map(cb => cb.value);
            if(shifts.length === 0) {
                alert("⚠️ कृपया कम से कम एक शिफ्ट ज़रूर चुनें!"); return;
            }
            const genderObj = document.querySelector('input[name="gender"]:checked');
            const gender = genderObj ? genderObj.value : "नहीं बताया";
            const photoFile = document.getElementById('v-photo').files[0];

            try {
                showLoading(); // 👉 1. फॉर्म सबमिट होते ही सबसे पहले लोडिंग चालू करें

                // 2. ऑटोमैटिक रजिस्ट्रेशन नंबर जेनरेट करना
                const collRef = collection(db, "volunteers");
                const snapshot = await getCountFromServer(collRef);
                const count = snapshot.data().count;
                const regNo = `VOL-2026/${count + 1}`; // नया रजिस्ट्रेशन नंबर

                // 3. फोटो अपलोड करना
                let photoUrl = "";
                if (photoFile) {
                    const storageRef = ref(storage, 'volunteer_photos/' + Date.now() + '_' + photoFile.name);
                    const snap = await uploadBytes(storageRef, photoFile);
                    photoUrl = await getDownloadURL(snap.ref);
                }

                // 4. डेटा सेव करना
                await addDoc(collRef, {
                    registrationNo: regNo,
                    name: document.getElementById('v-name').value,
                    fatherName: document.getElementById('v-fname').value,
                    mobile: mobile,
                    email: document.getElementById('v-email').value,
                    address: document.getElementById('v-address').value,
                    gender: gender,
                    availableShifts: shifts,
                    feedback: document.getElementById('v-feedback').value,
                    photoUrl: photoUrl,
                    timestamp: new Date()
                });
            
                hideLoading(); // 👉 5. डेटा सुरक्षित सेव होने के बाद लोडिंग बंद करें
                
                // 6. शानदार पॉप-अप दिखाना
                showSuccessPopup(regNo, `जय श्री कृष्ण, ${document.getElementById('v-name').value}! आपका कार्यकर्ता फॉर्म जमा हो गया है।`);
                e.target.reset();
            
            } catch(error) {
                hideLoading(); // 👉 7. अगर कोई एरर आए, तब भी लोडिंग बंद करें
                console.error("Firebase Error: ", error);
                alert("डेटा सेव करने में तकनीकी दिक्कत आई: " + error.message);
            }
        });
    }

    /* ========================================================
       8. सहयोग फॉर्म (स्क्रीनशॉट स्टोरेज और लोडिंग के साथ)
    ======================================================== */
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const mobile = document.getElementById('d-mobile').value;
            if(mobile.length !== 10) {
                alert("⚠️ कृपया 10 अंकों का सही मोबाइल नंबर डालें।");
                return;
            }

            const receiptFile = document.getElementById('donation-receipt').files[0];
            let receiptUrl = "";

            try {
                showLoading(); // 👉 1. फॉर्म सबमिट होते ही सबसे पहले लोडिंग चालू करें

                // पेमेंट का स्क्रीनशॉट Storage में अपलोड करें
                if (receiptFile) {
                    const storageRef = ref(storage, 'donation_receipts/' + Date.now() + '_' + receiptFile.name);
                    const snapshot = await uploadBytes(storageRef, receiptFile);
                    receiptUrl = await getDownloadURL(snapshot.ref);
                }

                // डेटाबेस में टेक्स्ट और स्क्रीनशॉट का लिंक सेव करें
                await addDoc(collection(db, "donations"), {
                    donorName: document.getElementById('d-name').value,
                    mobile: mobile,
                    donationAmount: document.getElementById('d-amount').value,
                    utrNumber: document.getElementById('d-utr').value,
                    receiptUrl: receiptUrl,
                    timestamp: new Date()
                });
            
                hideLoading(); // 👉 2. डेटा सुरक्षित सेव होने के बाद लोडिंग बंद करें
                
                alert(`🙏 बहुत-बहुत धन्यवाद, ${document.getElementById('d-name').value} जी!\n\nआपकी सहयोग राशि का विवरण सफलतापूर्वक दर्ज कर लिया गया है।`);
                e.target.reset();
            
            } catch(error) {
                hideLoading(); // 👉 3. अगर कोई एरर आए, तब भी लोडिंग बंद करें
                console.error("Firebase Error: ", error);
                alert("डेटा सेव करने में तकनीकी दिक्कत आई: " + error.message);
            }
        });
    }
   /* ========================================================
       10. BAL PRATIYOGITA SECTION LOGIC (Custom ID & Loading के साथ)
    ======================================================== */
    const balPratiyogitaForm = document.getElementById('balPratiyogitaForm');
    const danceCheckbox = document.getElementById('dance-checkbox');
    const songNameGroup = document.getElementById('song-name-group');

    if (balPratiyogitaForm) {
        if (danceCheckbox) {
            danceCheckbox.addEventListener('change', function() {
                if (this.checked) { songNameGroup.style.display = 'block'; } 
                else { songNameGroup.style.display = 'none'; document.getElementById('bp-song').value = ''; }
            });
        }

        balPratiyogitaForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const compCheckboxes = Array.from(balPratiyogitaForm.querySelectorAll('input[name="competition"]:checked')).map(cb => cb.value);
            if (compCheckboxes.length === 0) { alert("⚠️ कृपया कम से कम एक प्रतियोगिता ज़रूर चुनें!"); return; }
            
            const classInput = parseInt(document.getElementById('bp-class').value);
            if (classInput < 0 || classInput > 7) { alert("⚠️ इस प्रतियोगिता में केवल कक्षा 0 से 7 तक के बच्चे ही भाग ले सकते हैं!"); return; }
            
            const passwordInput = document.getElementById('bp-password').value;
            if (passwordInput !== '108PRASH') { alert("पासवर्ड गलत है! यह फॉर्म केवल अधिकृत सदस्यों के लिए है।"); return; }

            try {
                showLoading(); // 👉 1. फॉर्म सबमिट होते ही सबसे पहले लोडिंग चालू करें

                // 2. ऑटोमैटिक रजिस्ट्रेशन नंबर जेनरेट करना
                const collRef = collection(db, "bal_pratiyogita_entries");
                const snapshot = await getCountFromServer(collRef);
                const count = snapshot.data().count;
                const regNo = `COM-2026/${count + 1}`; // नया रजिस्ट्रेशन नंबर

                // 3. डेटा सेव करना
                await addDoc(collRef, {
                    registrationNo: regNo,
                    participantName: document.getElementById('bp-name').value,
                    fatherName: document.getElementById('bp-fname').value,
                    className: classInput,
                    mobile: document.getElementById('bp-mobile').value,
                    competitions: compCheckboxes,
                    songName: document.getElementById('bp-song') ? document.getElementById('bp-song').value : "",
                    timestamp: new Date()
                });
                
                hideLoading(); // 👉 4. डेटा सुरक्षित सेव होने के बाद लोडिंग बंद करें
                
                // 5. शानदार पॉप-अप दिखाना
                showSuccessPopup(regNo, `${document.getElementById('bp-name').value} का बाल प्रतियोगिता फॉर्म सफलतापूर्वक जमा हो गया है!`);
                balPratiyogitaForm.reset();
                if(songNameGroup) songNameGroup.style.display = 'none';

            } catch(error) { 
                hideLoading(); // 👉 6. अगर कोई एरर आए, तब भी लोडिंग बंद करें
                alert("डेटा सेव करने में तकनीकी दिक्कत आई: " + error.message); 
            }
        });
    }

    /* ========================================================
       BAL PRATIYOGITA SLIDER LOGIC (With Pause/Play Feature)
    ======================================================== */
    let bpSlideIndex = 0;
    let bpTimer; 
    let isBpPaused = false; 

    function showBpSlides() {
        let i;
        let bpSlides = document.getElementsByClassName("bp-slide"); 
        if (bpSlides.length === 0) return; 

        for (i = 0; i < bpSlides.length; i++) {
            bpSlides[i].style.display = "none";  
        }
        bpSlideIndex++;
        if (bpSlideIndex > bpSlides.length) { bpSlideIndex = 1 }    
        bpSlides[bpSlideIndex - 1].style.display = "block";  
        if (!isBpPaused) {
            bpTimer = setTimeout(showBpSlides, 4000); 
        }
    }

    const bpPauseBtn = document.getElementById("bp-pause-btn");
    if (bpPauseBtn) {
        bpPauseBtn.addEventListener("click", function() {
            if (isBpPaused) {
                isBpPaused = false;
                bpPauseBtn.innerHTML = "⏸️ Pause";
                bpPauseBtn.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                bpPauseBtn.style.color = "#d84315";
                bpTimer = setTimeout(showBpSlides, 4000); 
            } else {
                isBpPaused = true;
                bpPauseBtn.innerHTML = "▶️ Play";
                bpPauseBtn.style.backgroundColor = "#d84315"; 
                bpPauseBtn.style.color = "#fff";
                clearTimeout(bpTimer); 
            }
        });
    }
    showBpSlides();

    /* ========================================================
       11. SHARE BUTTON LOGIC (Share First, Copy if Failed)
    ======================================================== */
    window.shareSection = function(title, text, sectionId) {
        const shareUrl = window.location.origin + window.location.pathname + sectionId;
        const shareContent = text + "\n\n" + shareUrl;

        const fallbackCopy = () => {
            navigator.clipboard.writeText(shareContent).then(() => {
                alert("लिंक कॉपी हो गया है! 📋\n\nअब आप इसे WhatsApp या कहीं भी पेस्ट (Paste) करके भेज सकते हैं।");
            }).catch(err => {
                alert("कृपया इस link को कॉपी करके भेजें:\n\n" + shareUrl);
            });
        };

        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: shareUrl
            }).then(() => {
                console.log('सफलतापूर्वक शेयर किया गया!');
            }).catch((error) => {
                if (error.name !== 'AbortError') {
                    fallbackCopy();
                }
            });
        } else {
            fallbackCopy();
        }
    };
    
    /* ========================================================
       HAMBURGER MENU LOGIC (Mobile Navigation)
    ======================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                hamburgerBtn.innerHTML = '✖ बंद करें';
            } else {
                hamburgerBtn.innerHTML = '☰ मेनू';
            }
        });

        const mobileNavLinks = navMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburgerBtn.innerHTML = '☰ मेनू'; 
            });
        });
    }
    
});