// Wait for the entire HTML document to be fully loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlEl = document.documentElement; // Get the <html> element to set the data-theme attribute.

    // Function to apply the chosen theme
    const applyTheme = (theme) => {
        htmlEl.dataset.theme = theme; // Set the data-theme attribute on the <html> tag.
        localStorage.setItem('theme', theme); // Save the user's preference in local storage.
        // The text content is now handled by CSS, so this line is no longer needed.
    };

    // Event listener for the toggle button
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.dataset.theme || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Set the initial theme when the page loads.
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);     // Priority 1: Use the theme saved in local storage.
    } else if (prefersDark) {
        applyTheme('dark');         // Priority 2: Use the user's OS-level color scheme preference.
    } else {
        applyTheme('light');        // Priority 3: Default to the light theme.
    }
    // --- End Dark Mode Logic ---

    // An array of objects, each representing an Applicant Tracking System (ATS).
    // 'name' is for display, and 'url' is the Google dork for site-specific searching.
    let atsSites = [ 
        { name: 'Ashby', url: 'site:jobs.ashbyhq.com' }, 
        { name: 'AvaHR', url: 'site:jobs.avahr.com/*' }, 
        { name: 'Avature', url: 'site:*avature.net' }, 
        { name: 'Greenhouse', url: 'site:boards.greenhouse.io/*' }, 
        { name: 'Gem', url: 'site:jobs.gem.com/*' }, 
        { name: 'iCIMS', url: 'site:*.icims.com/*' }, 
        { name: 'Jobvite', url: 'site:jobs.jobvite.com/*' }, 
        { name: 'Lever', url: 'site:jobs.lever.co/*' }, 
        { name: 'Personio', url: 'site:*.jobs.personio.com' }, 
        { name: 'Pinpoint', url: 'site:*.pinpointhq.com' }, 
        { name: 'Recruitee', url: 'site:*.recruitee.com' }, 
        { name: 'Rippling', url: 'site:ats.rippling.com/*' }, 
        { name: 'SmartRecruiters', url: 'site:careers.smartrecruiters.com/* OR site:jobs.smartrecruiters.com/*' }, 
        { name: 'Taleo', url: 'site:*.taleo.net' }, 
        { name: 'Teamtailor', url: 'site:*.teamtailor.com' }, 
        { name: 'Trakstar Hire', url: 'site:*.hire.trakstar.com' },
        { name: 'Workable', url: 'site:apply.workable.com/*' }, 
        { name: 'Workday', url: 'site:*.myworkdayjobs.com/*' }, 
        { name: 'Breezy HR', url: 'site:breezy.hr' }, 
        { name: 'Zoho Recruit', url: 'site:*.zohorecruit.com/*' }, 
        { name: 'ADP Workforce Now', url: 'site:adp.com/careers' }, 
        { name: 'UltiPro (UKG Pro)', url: 'site:*.ultipro.com/*' }, 
        { name: 'Comeet', url: 'site:www.comeet.com/jobs/*' },
        { name: 'ApplicantStack', url: 'site:*.applicantstack.com/*' } 
    ];
  
    // Sort the ATS list to show priority systems first, then the rest alphabetically.
    const priorityOrder = ['Lever', 'Greenhouse', 'Ashby', 'Rippling'];
    const prioritySites = [];
    const otherSites = [];

    // Separate sites into priority and other
    atsSites.forEach(site => {
        priorityOrder.includes(site.name) ? prioritySites.push(site) : otherSites.push(site);
    });

    // Sort priority sites by the specified order and other sites alphabetically
    prioritySites.sort((a, b) => priorityOrder.indexOf(a.name) - priorityOrder.indexOf(b.name));
    otherSites.sort((a, b) => a.name.localeCompare(b.name));
    atsSites = [...prioritySites, ...otherSites]; // Combine the sorted lists back into one.

    // Get references to the main DOM elements the script will interact with.
    const buttonsContainer = document.getElementById('ats-buttons-container');
    const keywordsInput = document.getElementById('keywords');
    const locationInput = document.getElementById('location');
    const geoButtonsContainer = document.getElementById('geo-buttons-container');

    // Function to create and add buttons to the DOM
    function createButtons() {
        buttonsContainer.innerHTML = ''; // Clear existing buttons
        atsSites.forEach(ats => {
        const button = document.createElement('button');
        button.textContent = ats.name;
        button.className = 'ats-button';
        button.dataset.url = ats.url;
        button.addEventListener('click', handleSearch);
        buttonsContainer.appendChild(button);
        });
    }

    // Function to create and add geo buttons to the DOM
    // These buttons provide pre-formatted, complex location queries.
    function createGeoButtons() {
        const geoLocations = [
            { name: 'United States / USA', query: '("United States" OR "USA" OR "US")' },  
            { name: 'United Kingdom / UK', query: '("United Kingdom" OR "UK")' },
            { name: 'Canada', query: '"Canada"' },
            { name: 'Europe', query: '("Europe" OR "European Union" OR "EU")' },
            { name: 'Germany', query: '"Germany"' },
            { name: 'France', query: '"France"' },
            { name: 'LATAM', query: '(LATAM OR "Latin America" OR "South America" OR "Central America")' },
            { name: 'Brazil', query: '"Brazil"' },
            { name: 'Mexico', query: '"Mexico"' },
            { name: 'Asia-Pacific / APAC', query: '(APAC OR "Asia-Pacific")' },
            { name: 'India', query: '"India"' },
            { name: 'China', query: '"China"' },
            { name: 'Australia', query: '"Australia"' },
            { name: 'ANZ', query: '(ANZ OR "Australia and New Zealand")' },
        ];
        geoLocations.forEach(geo => {
            const button = document.createElement('button');
            button.textContent = geo.name;
            button.className = 'pill-button';
            button.dataset.location = geo.query; // Use the formatted query
            button.addEventListener('click', (event) => { 
                // Set the location input value when a geo button is clicked
                locationInput.value = event.target.dataset.location;
            });
            geoButtonsContainer.appendChild(button);
        });
    }

    // Function to handle the "Search All" logic
    function handleSearchAll() {
        const keywords = keywordsInput.value.trim();
        // Ensure keywords are entered before attempting a multi-search.
        if (!keywords) {
            alert('Please enter at least one keyword before "Search All".');
            keywordsInput.focus();
            return;
        }

        // Warn the user that this will open many tabs.
        const confirmSearch = confirm(
            `This will open ${atsSites.length} new tabs. Your browser might ask for permission. Do you want to continue?`
        );

        if (confirmSearch) { 
            // We will create a "dummy" event object to pass to our existing handler
            atsSites.forEach(ats => {
                const dummyEvent = {
                    target: {
                        dataset: {
                            url: ats.url
                        }
                    }
                };
                // Reuse the existing single-search logic for each ATS.
                handleSearch(dummyEvent);
            });
        }
    }

    // --- Persistence Functions ---
    // Saves the user's search criteria (keywords, location, work type) to local storage.
    function saveCriteria(criteriaToSave) {
        localStorage.setItem('atsSearchCriteria', JSON.stringify(criteriaToSave));
    }

    // Loads search criteria from local storage and populates the form fields.
    function loadCriteria() {
        const savedCriteria = localStorage.getItem('atsSearchCriteria');
        if (savedCriteria) { 
            const criteria = JSON.parse(savedCriteria);
            keywordsInput.value = criteria.keywords || '';
            locationInput.value = criteria.location || '';
            // Check the correct radio button
            // Defensively check the workType value. It should be a simple string without special characters
            // for a selector. This prevents crashes from old, invalid data in localStorage.
            if (criteria.workType && !/[ "()']/.test(criteria.workType)) {
                const workTypeRadio = document.querySelector(`input[name="workType"][value="${criteria.workType}"]`);
                if (workTypeRadio) {
                    workTypeRadio.checked = true;
                }
            }
            // Check the correct radio button for date posted
            if (criteria.datePosted) {
                const datePostedRadio = document.querySelector(`input[name="datePosted"][value="${criteria.datePosted}"]`);
                if (datePostedRadio) {
                    datePostedRadio.checked = true;
                }
            }
        }
    }

    // Clears the input fields and removes the saved criteria from local storage.
    function clearCriteria() {
        localStorage.removeItem('atsSearchCriteria');
        keywordsInput.value = '';
        locationInput.value = '';
        document.getElementById('any').checked = true; // Reset to default
        document.getElementById('any-time').checked = true; // Reset to default
    }
    
    // Core function to handle a single search request (from an ATS button).
    function handleSearch(event) {
        // Step 1: Gather all criteria from the form into a single, clean object.
        // This object becomes the single source of truth for this search operation.
        const criteria = {
            keywords: keywordsInput.value.trim(),
            location: locationInput.value.trim(),
            // Use optional chaining `?` for safety in case no radio is checked
            workType: document.querySelector('input[name="workType"]:checked')?.value || '',
            datePosted: document.querySelector('input[name="datePosted"]:checked')?.value || ''
        };
        // Validate that keywords have been entered.
        if (!criteria.keywords) {
            alert('Please enter at least one keyword.');
            keywordsInput.focus();
            return;
        }
        
        // Step 2: Save the clean criteria object. This prevents complex query strings
        // from being saved and causing errors on page load.
        saveCriteria(criteria);
        
        // Get the site-specific search string from the button's data attribute.
        const siteSearch = event.target.dataset.url;

        // Step 3: Build the final Google search query string from all parts.
        const keywordsQuery = criteria.keywords
            .split(',')
            .map(kw => kw.trim())
            .filter(kw => kw.length > 0)
            .map(kw => `"${kw}"`)
            .join(' ');

        // Handle location: use pre-formatted queries directly, otherwise format the input.
        let locationQuery = '';
        if (criteria.location) {
            // If query is pre-formatted from a button, use it as is.
            if (criteria.location.startsWith('(') || criteria.location.startsWith('"')) {
                locationQuery = criteria.location;
            } else {
                // Otherwise, treat as comma-separated terms and wrap each in quotes.
                locationQuery = criteria.location.split(',')
                    .map(loc => loc.trim())
                    .filter(loc => loc.length > 0)
                    .map(loc => `"${loc}"`)
                    .join(' ');
            }
        }

        // Handle work type: create a specific OR query for "On-Site" for better results.
        let workTypeQuery = '';
        if (criteria.workType) {
            if (criteria.workType === 'On-Site') {
                // This creates a proper Google OR search. The previous version was searching for a literal string.
                workTypeQuery = '("On-Site" OR "On Site")';
            } else {
                workTypeQuery = `"${criteria.workType}"`;
            }
        }

        // Combine all parts, clean up extra spaces, and encode for a URL.
        const query = `${siteSearch} ${keywordsQuery} ${workTypeQuery} ${locationQuery}`.replace(/\s+/g, ' ').trim();
        let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        // Append the time filter parameter if a value is selected
        if (criteria.datePosted) {
            googleSearchUrl += `&tbs=qdr:${criteria.datePosted}`;
        }
        
        // Open the generated search URL in a new browser tab.
        window.open(googleSearchUrl, '_blank');
    }
    
    // --- Initialization ---
    // Run these functions when the script starts.
    loadCriteria(); // Load any saved criteria on page start
    createButtons();
    createGeoButtons();

    // Attach event listener for the new Search All button
    document.getElementById('searchAllBtn').addEventListener('click', handleSearchAll);
    // Attach event listener for the Clear button
    document.getElementById('clearBtn').addEventListener('click', clearCriteria);

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        // Handle the form submission event.
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            formStatus.innerHTML = "Please wait...";
            formStatus.style.display = "block";
            formStatus.className = ''; // Reset classes

            // Use the Fetch API to send the form data to the web3forms service.
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                // Handle the JSON response from the server.
                let resJson = await response.json();
                if (response.status == 200) {
                    formStatus.textContent = resJson.message || "Form submitted successfully!";
                    formStatus.className = 'success';
                    contactForm.reset();
                    setTimeout(() => { formStatus.style.display = "none"; }, 5000);
                } else {
                    formStatus.textContent = resJson.message || "An error occurred. Please try again.";
                    formStatus.className = 'error';
                }
            })
            .catch(error => {
                // Handle network or other errors.
                console.error("Contact form submission error:", error);
                formStatus.innerHTML = "Something went wrong! Please try again.";
                formStatus.className = 'error';
            });
        });
    }
});