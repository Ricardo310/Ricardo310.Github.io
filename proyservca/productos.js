/* =====================================================
   PetroServ Solutions — Products Page Logic
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Category Filter ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    const productCount = document.getElementById('productCount');

    if (filterBtns.length && catalogCards.length) {
        // Filter function
        function applyFilter(category) {
            let visibleCount = 0;

            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                if (b.dataset.category === category) b.classList.add('active');
            });

            catalogCards.forEach(card => {
                const cardCategory = card.dataset.category;

                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'catalogFadeIn 0.4s ease forwards';
                    card.style.animationDelay = `${visibleCount * 0.08}s`;
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.animation = '';
                }
            });

            // Update count
            if (productCount) {
                const label = visibleCount === 1 ? 'producto' : 'productos';
                productCount.textContent = `${visibleCount} ${label}`;
            }
        }

        // Click handlers
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                applyFilter(btn.dataset.category);
            });
        });

        // Auto-filter from URL param (e.g. ?cat=valvuleria)
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        if (catParam && ['valvuleria', 'instrumentacion'].includes(catParam)) {
            applyFilter(catParam);
        }
    }

    // ---------- Card hover mouse tracking for glow effect ----------
    catalogCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--card-glow-x', `${x}%`);
            card.style.setProperty('--card-glow-y', `${y}%`);
        });
    });
});

// Add animation keyframes
const catalogStyle = document.createElement('style');
catalogStyle.textContent = `
    @keyframes catalogFadeIn {
        from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(catalogStyle);
