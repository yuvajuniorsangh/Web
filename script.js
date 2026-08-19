// --- script.js : कृष्ण जन्माष्टमी महोत्सव 2026 ---

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);



// अब बाकी का DOM कोड शुरू होगा
document.addEventListener("DOMContentLoaded", function() {
    
    console.log("वेबसाइट सफलतापूर्वक लोड हो गई है! जय श्री कृष्ण! 🙏");

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
       7. वॉलंटियर फॉर्म (फोटो स्टोरेज के साथ)
    ======================================================== */
    const volunteerForm = document.getElementById('volunteerRegistrationForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const vPassword = document.getElementById('v-password').value;
            if(vPassword !== "101PRASH") {
                alert("पासवर्ड गलत है! यह फॉर्म केवल अधिकृत सदस्यों के लिए है।");
                return;
            }

            const mobile = document.getElementById('v-mobile').value;
            if(mobile.length !== 10) {
                alert("⚠️ कृपया 10 अंकों का सही मोबाइल नंबर डालें।");
                return;
            }

            const shifts = Array.from(document.querySelectorAll('input[name="shift"]:checked')).map(cb => cb.value);
            if(shifts.length === 0) {
                alert("⚠️ कृपया कम से कम एक शिफ्ट ज़रूर चुनें!");
                return;
            }

            const genderObj = document.querySelector('input[name="gender"]:checked');
            const gender = genderObj ? genderObj.value : "नहीं बताया";

            const photoFile = document.getElementById('v-photo').files[0];
            let photoUrl = "";

            try {
                // अगर यूजर ने फोटो चुनी है, तो उसे पहले Storage में अपलोड करें
                if (photoFile) {
                    const storageRef = ref(storage, 'volunteer_photos/' + Date.now() + '_' + photoFile.name);
                    const snapshot = await uploadBytes(storageRef, photoFile);
                    photoUrl = await getDownloadURL(snapshot.ref);
                }

                // अब सारी जानकारी और फोटो का लिंक Firestore में सेव करें
                await addDoc(collection(db, "volunteers"), {
                    name: document.getElementById('v-name').value,
                    fatherName: document.getElementById('v-fname').value,
                    mobile: mobile,
                    email: document.getElementById('v-email').value,
                    address: document.getElementById('v-address').value,
                    gender: gender,
                    availableShifts: shifts,
                    feedback: document.getElementById('v-feedback').value,
                    photoUrl: photoUrl, // यहाँ फोटो का सुरक्षित लिंक सेव होगा
                    timestamp: new Date()
                });
            
                alert(`🙏 जय श्री कृष्ण, ${document.getElementById('v-name').value}!\n\nआपका कार्यकर्ता रजिस्ट्रेशन फॉर्म सफलतापूर्वक जमा हो गया है।`);
                e.target.reset();
            
            } catch(error) {
                console.error("Firebase Error: ", error);
                alert("डेटा सेव करने में तकनीकी दिक्कत आई: " + error.message);
            }
        });
    }

    /* ========================================================
       8. सहयोग फॉर्म (स्क्रीनशॉट स्टोरेज के साथ)
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
                    receiptUrl: receiptUrl, // यहाँ स्क्रीनशॉट का लिंक सेव होगा
                    timestamp: new Date()
                });
            
                alert(`🙏 बहुत-बहुत धन्यवाद, ${document.getElementById('d-name').value} जी!\n\nआपकी सहयोग राशि का विवरण सफलतापूर्वक दर्ज कर लिया गया है।`);
                e.target.reset();
            
            } catch(error) {
                console.error("Firebase Error: ", error);
                alert("डेटा सेव करने में तकनीकी दिक्कत आई: " + error.message);
            }
        });
    }
    /* ========================================================
       10. BAL PRATIYOGITA SECTION LOGIC
    ======================================================== */
    const balPratiyogitaForm = document.getElementById('balPratiyogitaForm');
    const danceCheckbox = document.getElementById('dance-checkbox');
    const songNameGroup = document.getElementById('song-name-group');

    if (balPratiyogitaForm) {
        if (danceCheckbox) {
            danceCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    songNameGroup.style.display = 'block';
                } else {
                    songNameGroup.style.display = 'none';
                    document.getElementById('bp-song').value = '';
                }
            });
        }

        balPratiyogitaForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const compCheckboxes = Array.from(balPratiyogitaForm.querySelectorAll('input[name="competition"]:checked')).map(cb => cb.value);
            if (compCheckboxes.length === 0) {
                alert("⚠️ कृपया कम से कम एक प्रतियोगिता ज़रूर चुनें!");
                return;
            }

            const classInput = parseInt(document.getElementById('bp-class').value);
            if (classInput < 0 || classInput > 7) {
                alert("⚠️ इस प्रतियोगिता में केवल कक्षा 0 से 7 तक के बच्चे ही भाग ले सकते हैं!");
                return;
            }

            const passwordInput = document.getElementById('bp-password').value;
            if (passwordInput !== '108PRASH') {
                alert("पासवर्ड गलत है! यह फॉर्म केवल अधिकृत सदस्यों के लिए है।");
                return;
            }

            try {
                await addDoc(collection(db, "bal_pratiyogita_entries"), {
                    participantName: document.getElementById('bp-name').value,
                    fatherName: document.getElementById('bp-fname').value,
                    className: classInput,
                    mobile: document.getElementById('bp-mobile').value,
                    competitions: compCheckboxes,
                    songName: document.getElementById('bp-song') ? document.getElementById('bp-song').value : "",
                    timestamp: new Date()
                });
                
                alert("बाल प्रतियोगिता का फॉर्म सफलतापूर्वक जमा हो गया! जय श्री कृष्ण! 🙏");
                balPratiyogitaForm.reset();
                if(songNameGroup) songNameGroup.style.display = 'none';

            } catch(error) { 
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