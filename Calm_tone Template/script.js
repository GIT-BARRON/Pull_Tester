// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation items on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add CSS for active class
    const style = document.createElement('style');
    style.textContent = `
        nav li a.active {
            background-color: var(--active-color);
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Add subtle animation for sections
    const animateSections = () => {
        const sections = document.querySelectorAll('section');
        const animateSection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const sectionObserver = new IntersectionObserver(animateSection, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        });
    };
    
    // Wait for page to load before animating
    setTimeout(animateSections, 200);
});

// Add back to top button
window.addEventListener('scroll', () => {
    if (!document.querySelector('.back-to-top')) {
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '&uarr;';
        backToTopButton.className = 'back-to-top';
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopButton);
    }
    
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Enhance publication section with button-style year filter
document.addEventListener('DOMContentLoaded', () => {
    const publicationsSection = document.querySelector('#publications');
    
    if (publicationsSection) {
        // Restructure publications section to match the design in the image
        const restructurePublications = () => {
            // Get all publication years (h3 elements)
            const years = Array.from(publicationsSection.querySelectorAll('h3'));
            
            if (years.length > 0) {
                // Create filter container
                const filterContainer = document.createElement('div');
                filterContainer.className = 'publication-filter';
                
                // Add "All Years" button
                const allButton = document.createElement('button');
                allButton.textContent = 'All Years';
                allButton.className = 'filter-btn active';
                
                allButton.addEventListener('click', () => {
                    setActiveButton(allButton);
                    years.forEach(year => {
                        year.style.display = 'block';
                        const publications = getPublicationsForYear(year);
                        publications.forEach(pub => {
                            pub.style.display = 'block';
                        });
                    });
                });
                
                filterContainer.appendChild(allButton);
                
                // Add year buttons
                years.forEach(year => {
                    const yearButton = document.createElement('button');
                    yearButton.textContent = year.textContent;
                    yearButton.className = 'filter-btn';
                    
                    yearButton.addEventListener('click', () => {
                        setActiveButton(yearButton);
                        
                        // Hide all years and publications
                        years.forEach(y => {
                            y.style.display = 'none';
                            const publications = getPublicationsForYear(y);
                            publications.forEach(pub => {
                                pub.style.display = 'none';
                            });
                        });
                        
                        // Show selected year and its publications
                        year.style.display = 'block';
                        const publications = getPublicationsForYear(year);
                        publications.forEach(pub => {
                            pub.style.display = 'block';
                        });
                    });
                    
                    filterContainer.appendChild(yearButton);
                });
                
                // Reformat publication entries
                years.forEach(year => {
                    const publications = getPublicationsForYear(year);
                    publications.forEach(pub => {
                        reformatPublication(pub);
                    });
                });
                
                // Insert filter before first h3
                publicationsSection.insertBefore(filterContainer, years[0]);
            }
        };
        
        // Helper function to set active button
        function setActiveButton(activeButton) {
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            activeButton.classList.add('active');
        }
        
        // Helper function to get publications for a specific year
        function getPublicationsForYear(yearHeading) {
            const publications = [];
            let nextNode = yearHeading.nextElementSibling;
            
            while (nextNode && !nextNode.matches('h3')) {
                if (nextNode.classList.contains('publication')) {
                    publications.push(nextNode);
                }
                nextNode = nextNode.nextElementSibling;
            }
            
            return publications;
        }
        
        // Helper function to reformat a publication entry
        function reformatPublication(publicationDiv) {
            // No need to restructure if already done
            if (publicationDiv.dataset.reformatted) return;
            
            // Mark as reformatted
            publicationDiv.dataset.reformatted = true;
            
            // Add hover effect
            publicationDiv.addEventListener('mouseenter', () => {
                publicationDiv.style.backgroundColor = 'var(--hover-color)';
            });
            
            publicationDiv.addEventListener('mouseleave', () => {
                publicationDiv.style.backgroundColor = '';
            });
        }
        
        // Call restructure function
        setTimeout(restructurePublications, 100);
    }
});

// Enhance project section with subtle hover effects
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        // Add subtle border and shadow on hover
        project.addEventListener('mouseenter', () => {
            project.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
            project.style.borderColor = 'var(--primary-color)';
            project.style.transform = 'translateY(-5px)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.boxShadow = '';
            project.style.borderColor = 'var(--border-color)';
            project.style.transform = '';
        });
    });
});

// Add theme toggle
document.addEventListener('DOMContentLoaded', () => {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
    themeToggle.className = 'theme-toggle';
    themeToggle.title = 'Toggle light/dark mode';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--card-background);
        color: var(--text-color);
        border: 1px solid var(--border-color);
        font-size: 16px;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Theme toggle logic
    let isDarkMode = false;
    
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.style.setProperty('--background-color', '#2a2a2a');
            document.documentElement.style.setProperty('--card-background', '#333333');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--text-light', '#d0d0d0');
            document.documentElement.style.setProperty('--border-color', '#444444');
            document.documentElement.style.setProperty('--hover-color', '#3a3a3a');
            document.documentElement.style.setProperty('--active-color', '#4a4a4a');
            themeToggle.innerHTML = '☀️'; // Sun emoji for light mode
        } else {
            document.documentElement.style.setProperty('--background-color', '#f8f7f4');
            document.documentElement.style.setProperty('--card-background', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#3a3a3a');
            document.documentElement.style.setProperty('--text-light', '#5a5a5a');
            document.documentElement.style.setProperty('--border-color', '#e7e5e1');
            document.documentElement.style.setProperty('--hover-color', '#f1f0ec');
            document.documentElement.style.setProperty('--active-color', '#e8f0f8');
            themeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
        }
    });
});