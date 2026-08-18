// --- script.js : कृष्ण जन्माष्टमी महोत्सव 2026 ---

// 1. जब वेबसाइट का पूरा ढांचा (HTML) लोड हो जाए, तभी यह कोड चलेगा
document.addEventListener("DOMContentLoaded", function() {
    
    // कंसोल में चेक करने के लिए कि JS सही से जुड़ गया है
    console.log("वेबसाइट सफलतापूर्वक लोड हो गई है! जय श्री कृष्ण! 🙏");

    /* ========================================================
       2. GLOBAL / NAVIGATION LOGIC (Scrollspy)
       यूज़र जिस सेक्शन पर होगा, मेनू में वह लिंक हाईलाइट हो जाएगा
    ======================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        // चेक करें कि स्क्रीन पर अभी कौन सा सेक्शन दिख रहा है
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // अगर हम स्क्रॉल करके उस सेक्शन के हिस्से में पहुँच गए हैं
            if (pageYOffset >= (sectionTop - 150)) { 
                currentSection = section.getAttribute("id");
            }
        });

        // मेनू के सभी लिंक्स से 'active' डिज़ाइन हटाएं और सिर्फ सही वाले पर लगाएं
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });

    /* ========================================================
       3. HOME SECTION LOGIC
       (भविष्य में यहाँ होम पेज के वीडियो का प्ले/पॉज़ कंट्रोल 
       या कोई पॉप-अप मैसेज लिखा जा सकता है)
    ======================================================== */
    /* ========================================================
       HOME SECTION LOGIC (Auto-Scroll Slider)
    ======================================================== */
    let slideIndex = 0;
    
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");
        
        // अगर स्लाइडर पेज पर नहीं है, तो कोड यहीं रुक जाएगा
        if (slides.length === 0) return; 

        // सभी तस्वीरों को छुपा दें
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        
        slideIndex++;
        // अगर तस्वीरें खत्म हो जाएं, तो वापस पहली फोटो पर आ जाएं
        if (slideIndex > slides.length) { slideIndex = 1 }    
        
        // अगली तस्वीर दिखाएं
        slides[slideIndex - 1].style.display = "block";  
        
        // हर 3.5 सेकंड (3500ms) में फोटो अपने आप बदलेगी
        setTimeout(showSlides, 3500); 
    }

    // फंक्शन को चालू करें
    showSlides();
    /* ========================================================
       4. BHAGWAAN KRISHNA SECTION LOGIC (Lightbox Feature)
       यूज़र जब ग्रिड पर क्लिक करेगा, तो पॉप-अप खुलेगा
    ======================================================== */
    const gridItems = document.querySelectorAll('.grid-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxText = document.getElementById('lightbox-text');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (gridItems.length > 0 && lightboxModal) {
        
        // हर एक तस्वीर (grid-item) पर क्लिक करने का इवेंट लगाएं
        gridItems.forEach(item => {
            item.addEventListener('click', () => {
                // क्लिक किए गए कार्ड से कैप्शन और प्लेसहोल्डर का डेटा लें
                const caption = item.querySelector('.img-caption').innerText;
                const placeholderText = item.querySelector('.img-placeholder').innerText;

                // पॉप-अप के अंदर वह डेटा डालें
                lightboxText.innerHTML = `
                    <h3>${caption}</h3>
                    <p style="color:#777; font-size:1.1rem; font-style:italic;">${placeholderText} जल्द ही अपलोड की जाएगी!</p>
                `;

                // पॉप-अप को दिखाएं (active क्लास जोड़ें)
                lightboxModal.classList.add('active');
            });
        });

        // 'X' बटन पर क्लिक करने से पॉप-अप बंद हो जाए
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        // पॉप-अप के बाहर (डार्क एरिया में) क्लिक करने से भी पॉप-अप बंद हो जाए
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
                
                // यहाँ सीधा कार्ड के अंदर का पूरा HTML (या इमेज का src) ले रहे हैं
                const imgElement = card.querySelector('img');
                let imgContent = "";

                if (imgElement) {
                    // अगर असली फोटो मिल گئی, तो उसका रास्ता ले लें
                    const imgSrc = imgElement.src;
                    imgContent = `<img src="${imgSrc}" style="max-width: 100%; max-height: 65vh; border-radius: 10px; margin-bottom: 15px; object-fit: contain;">`;
                } else {
                    // अगर फोटो नहीं है तो पुराना टेक्स्ट दिखाएं
                    imgContent = `<div style="background: linear-gradient(135deg, #ffcc80 0%, #ffb74d 100%); width: 100%; min-height: 180px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">[ Photo ]</div>`;
                }

                // पॉप-अप के अंदर डेटा सेट करें
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
       जब यूज़र अबाउट सेक्शन पर पहुंचेगा, तो कार्ड्स स्लाइड होकर आएंगे
    ======================================================== */
    const aboutBoxes = document.querySelectorAll('.history-box, .founders-box');

    // IntersectionObserver का इस्तेमाल करके चेक करें कि कार्ड स्क्रीन पर कब आ रहे हैं
    if (aboutBoxes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // अगर कार्ड स्क्रीन के व्यू (viewport) में आ गया है
                if (entry.isIntersecting) {
                    // उसमें 'show' क्लास जोड़ दें ताकि वह एनिमेट होकर सामने आ जाए
                    entry.target.classList.add('show');
                    
                    // एक बार एनीमेशन पूरा होने के बाद उसे दोबारा ऑब्ज़र्व करना बंद कर दें
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // जब कार्ड का 20% हिस्सा स्क्रीन पर दिखे, तभी एनीमेशन शुरू हो
        });

        // हर बॉक्स को ऑब्जर्वर के साथ जोड़ें
        aboutBoxes.forEach(box => {
            observer.observe(box);
        });
    }
   
    /* ========================================================
       OTP VERIFICATION LOGIC (दोनों फॉर्म्स के लिए Reusable Function)
    ======================================================== */
    
    // यह एक मास्टर फंक्शन है जो किसी भी फॉर्म में OTP चालू कर सकता है
    function setupOTPForForm(mobileInputId, sendBtnId, otpSectionId, otpInputId, verifyBtnId, statusMsgId, submitBtnSelector) {
        const sendOtpBtn = document.getElementById(sendBtnId);
        const verifyOtpBtn = document.getElementById(verifyBtnId);
        const otpSection = document.getElementById(otpSectionId);
        const otpStatusMsg = document.getElementById(statusMsgId);
        const submitBtn = document.querySelector(submitBtnSelector);

        // अगर पेज पर ये बटन्स मौजूद हैं, तभी कोड चलेगा
        if (!sendOtpBtn || !submitBtn) return;

        // 1. मुख्य Submit बटन को शुरुआत में लॉक करें
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';

        // 2. Send OTP का लॉजिक
        sendOtpBtn.addEventListener('click', () => {
            const phoneNumber = document.getElementById(mobileInputId).value;
            if (phoneNumber.length !== 10) {
                alert("⚠️ कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें!");
                return;
            }

            sendOtpBtn.innerText = "Sending...";

            // UI टेस्ट टाइमर (Firebase लगने तक)
            setTimeout(() => {
                otpSection.style.display = 'block';
                sendOtpBtn.innerText = "OTP Sent!";
                sendOtpBtn.disabled = true;
            }, 1000);
        });

        // 3. Verify OTP का लॉजिक
        verifyOtpBtn.addEventListener('click', () => {
            const otpCode = document.getElementById(otpInputId).value;
            if (otpCode.length !== 6) {
                alert("⚠️ कृपया मोबाइल पर आया 6-अंकों का सही OTP दर्ज करें!");
                return;
            }

            verifyOtpBtn.innerText = "Verifying...";

            // UI टेस्ट टाइमर (Firebase लगने तक)
            setTimeout(() => {
                otpStatusMsg.innerText = "Verified ✅";
                otpStatusMsg.className = "otp-status success";
                verifyOtpBtn.innerText = "Verified";
                verifyOtpBtn.disabled = true;

                // Submit बटन अनलॉक करें
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }, 1000);
        });
    }

    // --- फंक्शन को कॉल करना (दोनों फॉर्म्स को एक्टिवेट करें) ---

    // 1. वोलेंटियर फॉर्म के लिए OTP चालू करें
    setupOTPForForm(
        'v-mobile', 'send-otp-btn', 'otp-section', 'v-otp', 'verify-otp-btn', 'otp-status-msg', 
        '#volunteerRegistrationForm button[type="submit"]'
    );

    // 2. सहयोग (Donation) फॉर्म के लिए OTP चालू करें
    setupOTPForForm(
        'd-mobile', 'send-d-otp-btn', 'd-otp-section', 'd-otp', 'verify-d-otp-btn', 'd-otp-status-msg', 
        '#donationForm button[type="submit"]'
    );
    /* ========================================================
       8. VOLUNTEER SECTION LOGIC (Form Validation & Data Collection)
       फॉर्म सबमिट होने पर चेक करना और डेटा इकट्ठा करना
    ======================================================== */
    const volunteerForm = document.getElementById('volunteerRegistrationForm');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            // 1. फॉर्म सबमिट होते ही पेज को रीलोड होने से रोकें
            e.preventDefault(); 

            // 2. चेक करें कि क्या कम से कम एक शिफ्ट (Checkbox) चुनी गई है?
            const shiftCheckboxes = volunteerForm.querySelectorAll('input[name="shift"]:checked');
            
            if (shiftCheckboxes.length === 0) {
                alert("⚠️ कृपया कम से कम एक शिफ्ट (कार्य का समय) ज़रूर चुनें!");
                return; // अगर शिफ्ट नहीं चुनी है, तो कोड यहीं रुक जाएगा और फॉर्म सबमिट नहीं होगा
            }

            // 3. फॉर्म का सारा डेटा इकट्ठा करना (भविष्य में Firebase में भेजने के लिए)
            const formData = new FormData(volunteerForm);
            const volunteerData = Object.fromEntries(formData.entries());
            
            // चूंकि यूज़र एक से ज़्यादा शिफ्ट चुन सकता है, इसलिए उन्हें एक Array (लिस्ट) में सेव करें
            const selectedShifts = [];
            shiftCheckboxes.forEach(box => selectedShifts.push(box.value));
            volunteerData.shift = selectedShifts;

            // डेवलपर के देखने के लिए कंसोल में डेटा प्रिंट करना
            console.log("नया वोलेंटियर डेटा तैयार है:", volunteerData);

            // 4. यूज़र को सफलता का मैसेज (Success Alert) दिखाएं
            alert(`🙏 जय श्री कृष्ण, ${volunteerData.name}!\n\nआपका वोलेंटियर रजिस्ट्रेशन फॉर्म सफलतापूर्वक भर गया है।`);

            // 5. फॉर्म सबमिट होने के बाद उसे खाली (Reset) कर दें
            volunteerForm.reset();
            
        });
    }
    /* ========================================================
       9. SAHYOG (DONATION) SECTION LOGIC 
       पेमेंट के बाद UTR और सहयोग विवरण कैप्चर करना
    ======================================================== */
    const donationForm = document.getElementById('donationForm');

    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const formData = new FormData(donationForm);
            const donationData = Object.fromEntries(formData.entries());
            
            // यह चेक करने के लिए कि फोटो अटैच हुई है या नहीं
            const receiptFile = document.getElementById('donation-receipt').files[0];
            
            console.log("नया सहयोग डेटा (स्क्रीनशॉट के साथ):", donationData);
            if(receiptFile) {
                console.log("अपलोड की गई फाइल का नाम:", receiptFile.name);
            }

            alert(`🙏 बहुत-बहुत धन्यवाद, ${donationData.donorName} जी!\n\nआपकी सहयोग राशि (₹${donationData.donationAmount}), UTR नंबर और पेमेंट का स्क्रीनशॉट सफलताપૂર્વक प्राप्त हो गया है।`);

            donationForm.reset();
        });
    }
    /* ========================================================
       10. BAL PRATIYOGITA SECTION LOGIC
       बाल प्रतियोगिता फॉर्म वैलिडेशन और पासवर्ड चेक
    ======================================================== */
    const balPratiyogitaForm = document.getElementById('balPratiyogitaForm');
    const danceCheckbox = document.getElementById('dance-checkbox');
    const songNameGroup = document.getElementById('song-name-group');

    if (balPratiyogitaForm) {
        
        // 1. अगर 'डांस' चुना गया है, तो 'Song name' वाला बॉक्स दिखाएं
        danceCheckbox.addEventListener('change', function() {
            if (this.checked) {
                songNameGroup.style.display = 'block';
            } else {
                songNameGroup.style.display = 'none';
                document.getElementById('bp-song').value = ''; // अनचेक करने पर नाम मिटा दें
            }
        });

        // 2. फॉर्म सबमिट होने पर लॉजिक
        balPratiyogitaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // चेक करें कि कम से कम एक प्रतियोगिता चुनी गई है
            const compCheckboxes = balPratiyogitaForm.querySelectorAll('input[name="competition"]:checked');
            if (compCheckboxes.length === 0) {
                alert("⚠️ कृपया कम से कम एक प्रतियोगिता ज़रूर चुनें!");
                return;
            }
            // कक्षा (Class) की जांच करें कि वह 0 से 7 के बीच ही हो
            const classInput = parseInt(document.getElementById('bp-class').value);
            if (classInput < 0 || classInput > 7) {
                alert("⚠️ इस प्रतियोगिता में केवल कक्षा 0 से 7 तक के बच्चे ही भाग ले सकते हैं!");
                return;
            }

            // पासवर्ड चेक करें (आपके नोट्स के अनुसार)
            const passwordInput = document.getElementById('bp-password').value;
            if (passwordInput !== '108PRASH') {
                alert("Password गलत है, युवा जूनियर संघ से संपर्क करें");
                return;
            }

            // अगर पासवर्ड सही है
            alert("Form Submitted Successfully\nThank you !!");
            
            // डेटा को कंसोल में चेक करने के लिए
            const formData = new FormData(balPratiyogitaForm);
            const compData = Object.fromEntries(formData.entries());
            const selectedComps = [];
            compCheckboxes.forEach(box => selectedComps.push(box.value));
            compData.competition = selectedComps;
            console.log("बाल प्रतियोगिता रजिस्ट्रेशन:", compData);

            // फॉर्म को रीसेट करें और डांस बॉक्स को वापस छुपाएं
            balPratiyogitaForm.reset();
            songNameGroup.style.display = 'none';
        });
    }
    /* ========================================================
       BAL PRATIYOGITA SLIDER LOGIC (With Pause/Play Feature)
    ======================================================== */
    let bpSlideIndex = 0;
    let bpTimer; // टाइमर को कंट्रोल करने के लिए वेरिएबल
    let isBpPaused = false; // यह चेक करने के लिए कि स्लाइडर रुका है या चल रहा है

    function showBpSlides() {
        let i;
        let bpSlides = document.getElementsByClassName("bp-slide"); 
        
        if (bpSlides.length === 0) return; 

        // सभी स्लाइड्स को छुपाएं
        for (i = 0; i < bpSlides.length; i++) {
            bpSlides[i].style.display = "none";  
        }
        
        bpSlideIndex++;
        if (bpSlideIndex > bpSlides.length) { bpSlideIndex = 1 }    
        
        // अगली स्लाइड दिखाएं
        bpSlides[bpSlideIndex - 1].style.display = "block";  
        
        // अगर स्लाइडर 'Pause' नहीं है, तभी अगला टाइमर सेट करें
        if (!isBpPaused) {
            // हर 4 सेकंड (4000ms) में स्लाइड बदलेगी
            bpTimer = setTimeout(showBpSlides, 4000); 
        }
    }

    // बटन क्लिक करने पर Pause और Play का लॉजिक
    const bpPauseBtn = document.getElementById("bp-pause-btn");
    if (bpPauseBtn) {
        bpPauseBtn.addEventListener("click", function() {
            if (isBpPaused) {
                // अगर रुका हुआ था, तो अब वापस 'Play' करें
                isBpPaused = false;
                bpPauseBtn.innerHTML = "⏸️ Pause";
                bpPauseBtn.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                bpPauseBtn.style.color = "#d84315";
                
                // स्लाइडर को उसी जगह से दोबारा चालू करें
                bpTimer = setTimeout(showBpSlides, 4000); 
            } else {
                // अगर चल रहा था, तो अब 'Pause' (रोक) दें
                isBpPaused = true;
                bpPauseBtn.innerHTML = "▶️ Play";
                bpPauseBtn.style.backgroundColor = "#d84315"; // रुकने पर बटन का रंग बदल जाएगा
                bpPauseBtn.style.color = "#fff";
                
                // चलते हुए टाइमर को तुरंत रोक दें
                clearTimeout(bpTimer); 
            }
        });
    }

    // शुरुआत में फंक्शन को चालू करें
    showBpSlides();
    /* ========================================================
       11. SHARE BUTTON LOGIC (Share First, Copy if Failed)
    ======================================================== */
    window.shareSection = function(title, text, sectionId) {
        // यह वेबसाइट का पूरा लिंक खुद बना लेगा
        const shareUrl = window.location.origin + window.location.pathname + sectionId;
        const shareContent = text + "\n\n" + shareUrl;

        // यह सिर्फ कॉपी करने का फंक्शन है (जब शेयर काम न करे)
        const fallbackCopy = () => {
            navigator.clipboard.writeText(shareContent).then(() => {
                alert("लिंक कॉपी हो गया है! 📋\n\nअब आप इसे WhatsApp या कहीं भी पेस्ट (Paste) करके भेज सकते हैं।");
            }).catch(err => {
                alert("कृपया इस लिंक को कॉपी करके भेजें:\n\n" + shareUrl);
            });
        };

        // 1. सबसे पहले शेयर करने की कोशिश करें
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: shareUrl
            }).then(() => {
                console.log('सफलतापूर्वक शेयर किया गया!');
            }).catch((error) => {
                // अगर यूज़र ने खुद शेयर मेनू काटा (Cancel किया) है, तो कुछ मत करो
                if (error.name === 'AbortError') {
                    console.log('यूज़र ने शेयर करना कैंसिल कर दिया।');
                } else {
                    // 2. अगर शेयर मेनू खुलने में कोई एरर आ गया, तो तुरंत कॉपी कर दो
                    fallbackCopy();
                }
            });
        } else {
            // 3. अगर ब्राउज़र (जैसे लैपटॉप) शेयर सपोर्ट ही नहीं करता, तो सीधा कॉपी कर दो
            fallbackCopy();
        }
    };
    /* ========================================================
       HAMBURGER MENU LOGIC (Mobile Navigation)
    ======================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        // 1. बटन दबाने पर मेनू खोलना और बंद करना
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            
            // अगर मेनू खुला है, तो आइकॉन बदलकर '✖ बंद करें' कर दें
            if (navMenu.classList.contains('show')) {
                hamburgerBtn.innerHTML = '✖ बंद करें';
            } else {
                hamburgerBtn.innerHTML = '☰ मेनू';
            }
        });

        // 2. जब यूज़र किसी भी लिंक पर क्लिक करे, तो मेनू अपने आप बंद हो जाए
        const mobileNavLinks = navMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                hamburgerBtn.innerHTML = '☰ मेनू'; // वापस मेनू बना दें
            });
        });
    }

});