// Enhanced Loading Screen with Creative Animations
(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingCircleProgress = document.getElementById('loadingCircleProgress');
    
    // Create loading particles
    const loadingParticlesContainer = document.querySelector('.loading-particles');
    if (loadingParticlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'loading-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            loadingParticlesContainer.appendChild(particle);
        }
    }
    
    // Creative loading animation
    let progress = 0;
    const circumference = 565.48; // 2 * PI * 90 (radius)
    
    const loadingInterval = setInterval(() => {
        // Simulate more realistic loading with variable speeds
        const increment = Math.random() * 15 + 5;
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Add completion animation
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Clean up after animation completes
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 300);
        }
        
        // Update percentage text
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Update circular progress
        if (loadingCircleProgress) {
            const offset = circumference - (progress / 100) * circumference;
            loadingCircleProgress.style.strokeDashoffset = offset;
        }
    }, 150);
    
    // Ensure loading screen shows for at least 1 second
    const minLoadTime = 1000;
    const startTime = Date.now();
    
    window.addEventListener('load', () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            // Force completion if not already done
            if (progress < 100) {
                progress = 100;
                loadingPercentage.textContent = '100%';
                if (loadingCircleProgress) {
                    loadingCircleProgress.style.strokeDashoffset = 0;
                }
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }, 300);
            }
        }, remainingTime);
    });
})();