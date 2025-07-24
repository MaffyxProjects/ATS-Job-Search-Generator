# ATS Job Search Generator

A simple yet powerful single-page web application designed to streamline the job search process. This tool allows users to generate targeted Google search queries for job postings across a curated list of popular Applicant Tracking Systems (ATS).

It's built with vanilla HTML, CSS, and JavaScript, focusing on usability, performance, and a clean user interface.

<!-- Add a link to your live demo here -->
**Live Site:** [[Check it out here!](https://jobs.maffyxprojects.com/)]

## Features

- **Targeted ATS Searching**: Search for jobs directly on platforms like Greenhouse, Lever, Ashby, Workday, and more.
- **Customizable Queries**: Refine searches with keywords, location, and work type (Any, Remote, Hybrid, On-Site).
- **"Search All" Functionality**: Open search tabs for all supported ATS platforms at once with a single click (browser permission may be required).
- **Quick Region Filters**: Use pre-defined buttons for common geographical regions (e.g., USA, Europe, UK, APAC) to auto-fill complex location queries.
- **Persistent Inputs**: Your last search criteria (keywords, location, work type) are saved in local storage, so you can pick up where you left off.
- **Dark/Light Mode**: A sleek theme toggle that respects your OS-level color scheme preference and saves your choice.
- **Responsive Design**: A clean, mobile-first interface that works great on any device.
- **AJAX Contact Form**: A "Get in Touch" section with a contact form that submits data asynchronously without a page reload.
- **No Dependencies**: Built with pure HTML, CSS, and JavaScript. No frameworks or libraries are needed.

## How to Use

1.  **Enter Keywords**: Type the job titles, skills, or technologies you're looking for (e.g., `Software Engineer, Python`).
2.  **Specify Location (Optional)**:
    -   Type a city, country, or region (e.g., `London`, `USA`).
    -   Or, click one of the **Region** pill buttons for a pre-formatted query (e.g., `United States / USA`).
3.  **Select Work Type (Optional)**: Choose between `Any`, `Remote`, `Hybrid`, or `On-Site`.
4.  **Search**:
    -   Click an individual **ATS button** (like `Lever` or `Greenhouse`) to open a Google search for that specific platform in a new tab.
    -   Click the **Search All ATS** button to open a new tab for *every* ATS in the list. You will be asked to confirm this action.
5.  **Clear**: Click the **Clear Fields** button to reset all inputs and remove the saved criteria from your browser.

## Local Development / Setup

This is a static web project and requires no special build steps or dependencies.

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3.  Open the `index.html` file in your favorite web browser.

That's it! You can now use the application locally and make any changes you see fit.

## File Structure

```
.
├── 📄 index.html      # The main HTML file containing the structure of the page.
├── 🎨 style.css       # All CSS for styling, including dark mode variables and responsive queries.
├── ⚙️ script.js       # All JavaScript logic for DOM manipulation, event handling, and search generation.
└── 📁 icons/
    └── favicon.ico    # The site's favicon.
```

## Technologies Used

- **HTML5**: For the core structure and content.
- **CSS3**: For styling, layout, and theming (utilizing CSS Custom Properties/Variables).
- **JavaScript (ES6+)**: For all dynamic functionality, including DOM manipulation, event listeners, and interacting with Local Storage.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

If you'd like to add a new ATS, you can do so by modifying the `atsSites` array in `script.js`. Please ensure the Google dork (`site:*.example.com`) is accurate.


---

*This README was generated based on the project's source code.*
