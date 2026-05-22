document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Toggle aria-expanded for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);

            // Prevent body scroll when menu is open
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('aria-label', 'ページトップへ戻る');
    scrollBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(scrollBtn);

    let scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                if (window.scrollY > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // Shared Category Config
    // ==========================================
    var cats = {
        basics: {
            label: '基礎知識',
            bg: '#EFF6FF', color: '#004EEB',
            grad: 'linear-gradient(135deg, #004EEB 0%, #2563eb 40%, #06b6d4 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
            imgs: []
        },
        screening: {
            label: '審査',
            bg: '#F5F3FF', color: '#7c3aed',
            grad: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 40%, #a78bfa 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
            imgs: []
        },
        interest: {
            label: '金利・返済',
            bg: '#ECFDF5', color: '#059669',
            grad: 'linear-gradient(135deg, #059669 0%, #10b981 40%, #34d399 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
            imgs: []
        },
        comparison: {
            label: '比較・選び方',
            bg: '#ECFEFF', color: '#0891b2',
            grad: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 40%, #22d3ee 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
            imgs: []
        },
        caution: {
            label: '注意点',
            bg: '#FEF2F2', color: '#dc2626',
            grad: 'linear-gradient(135deg, #dc2626 0%, #ef4444 40%, #f97316 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            imgs: []
        },
        application: {
            label: '申込・手続き',
            bg: '#EEF2FF', color: '#4f46e5',
            grad: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #818cf8 100%)',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
            imgs: []
        }
    };

    // ==========================================
    // Knowledge Articles
    // ==========================================
    var knowledgeGrid = document.getElementById('knowledgeGrid');
    if (knowledgeGrid) {
        var articles = [
            {id:16,c:'screening',t:'ブラックリストとは？登録条件と解除時期',e:'いわゆる「ブラックリスト」に載る条件と、事故情報が消えるまでの期間を解説します。',m:'5'},
            {id:17,c:'screening',t:'パート・アルバイトの審査通過のコツ',e:'非正規雇用でもカードローン審査に通るためのポイントと注意点を紹介します。',m:'4'},
            {id:18,c:'screening',t:'学生でもカードローンは利用できる？',e:'学生のカードローン利用の可否、条件、おすすめの商品選びのポイントを解説します。',m:'4'},
            {id:19,c:'interest',t:'利息の計算方法を具体例でマスターしよう',e:'10万円を30日間借りた場合の利息など、具体的なシミュレーションで計算方法を解説します。',m:'5'},
            {id:20,c:'interest',t:'無利息期間を最大限に活用するテクニック',e:'初回30日間無利息サービスの賢い使い方と、各社の無利息サービス比較を紹介します。',m:'5'},
        ];

        var showCount = 12;
        var activeFilter = 'all';

        function renderCards() {
            var filtered = activeFilter === 'all' ? articles : articles.filter(function(a) { return a.c === activeFilter; });
            var toShow = filtered.slice(0, showCount);

            knowledgeGrid.innerHTML = toShow.map(function(a) {
                var cat = cats[a.c];
                var aid = a.id;
                var imgSrc = 'images/articles/article-' + aid + '.jpg';
                return '<a href="article.html?id=' + aid + '" class="knowledge-card">' +
                    '<div class="knowledge-card-thumb"><img src="' + imgSrc + '" alt="' + a.t + '" loading="lazy"></div>' +
                    '<div class="knowledge-card-body">' +
                    '<span class="knowledge-card-cat" style="background:' + cat.bg + ';color:' + cat.color + '">' + cat.label + '</span>' +
                    '<h3>' + a.t + '</h3>' +
                    '<p class="knowledge-card-excerpt">' + a.e + '</p>' +
                    '<div class="knowledge-card-meta">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
                    a.m + '分で読める</div>' +
                    '</div></a>';
            }).join('');

            var moreDiv = document.getElementById('knowledgeMore');
            if (moreDiv) {
                var remaining = filtered.length - showCount;
                if (remaining > 0) {
                    moreDiv.innerHTML = '<button class="knowledge-more-btn" id="loadMoreBtn">もっと見る（残り' + remaining + '件）<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>';
                    document.getElementById('loadMoreBtn').addEventListener('click', function() {
                        showCount += 12;
                        renderCards();
                    });
                } else {
                    moreDiv.innerHTML = '';
                }
            }
        }

        var filtersDiv = document.getElementById('knowledgeFilters');
        if (filtersDiv) {
            var filterHtml = '<button class="knowledge-filter-btn active" data-filter="all">すべて</button>';
            var catKeys = []; for (var ck = 0; ck < articles.length; ck++) { if (catKeys.indexOf(articles[ck].c) === -1) catKeys.push(articles[ck].c); }
            for (var i = 0; i < catKeys.length; i++) {
                filterHtml += '<button class="knowledge-filter-btn" data-filter="' + catKeys[i] + '">' + cats[catKeys[i]].label + '</button>';
            }
            filtersDiv.innerHTML = filterHtml; if (catKeys.length <= 1) { filtersDiv.style.display = "none"; }

            filtersDiv.addEventListener('click', function(e) {
                var btn = e.target.closest('.knowledge-filter-btn');
                if (!btn) return;
                var allBtns = filtersDiv.querySelectorAll('.knowledge-filter-btn');
                for (var j = 0; j < allBtns.length; j++) { allBtns[j].classList.remove('active'); }
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-filter');
                showCount = 12;
                renderCards();
            });
        }

        renderCards();
    }

    // ==========================================
    // Article Page Rendering
    // ==========================================
    var articlePage = document.getElementById('articlePage');
    if (articlePage && typeof ARTICLES_DATA !== 'undefined') {
        var params = new URLSearchParams(window.location.search);
        var articleId = parseInt(params.get('id'));
        var article = null;
        for (var ai = 0; ai < ARTICLES_DATA.length; ai++) {
            if (ARTICLES_DATA[ai].id === articleId) { article = ARTICLES_DATA[ai]; break; }
        }

        if (article) {
            var ac = cats[article.cat];
            document.title = article.title + ' | ペパロンエデスラ';

            // Breadcrumb
            var breadHtml = '<div class="container"><nav class="breadcrumb">' +
                '<a href="index.html">トップ</a>' +
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
                '<a href="index.html#knowledge">基礎知識</a>' +
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
                ac.label +
                '</nav></div>';

            // Hero - with photo background
            var heroImgSrc = 'images/articles/article-' + article.id + '.jpg';
            var heroHtml = '<div class="ap-hero" style="background-image:url(' + heroImgSrc + ')">' +
                '<div class="ap-hero-overlay" style="background:' + ac.grad + ';opacity:0.78"></div>' +
                '<div class="ap-hero-inner">' +
                '<span class="ap-hero-cat">' + ac.label + '</span>' +
                '<h1>' + article.title + '</h1>' +
                '<div class="ap-hero-meta">' +
                '<span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + article.time + '分で読める</span>' +
                '<span><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + article.date + '</span>' +
                '</div></div></div>';

            // Body - replace a-visual gradients with real images
            var bodyContent = article.body;
            var visualCount = 0;
            bodyContent = bodyContent.replace(/<div class="a-visual"[^>]*>[\s\S]*?<\/div>/g, function() {
                visualCount++;
                return '<div class="a-visual"><img src="images/articles/article-' + article.id + '.jpg" alt="' + article.title + '"></div>';
            });
            var bodyHtml = '<div class="ap-body">' + bodyContent + '</div>';

            // Related articles
            var related = [];
            for (var ri = 0; ri < ARTICLES_DATA.length; ri++) {
                if (ARTICLES_DATA[ri].cat === article.cat && ARTICLES_DATA[ri].id !== article.id) {
                    related.push(ARTICLES_DATA[ri]);
                }
                if (related.length >= 3) break;
            }

            var relatedHtml = '';
            if (related.length > 0) {
                relatedHtml = '<div class="ap-related"><h2>関連記事</h2><div class="ap-related-grid">';
                for (var rj = 0; rj < related.length; rj++) {
                    var ra = related[rj];
                    var rc = cats[ra.cat];
                    relatedHtml += '<a href="article.html?id=' + ra.id + '" class="knowledge-card">' +
                        '<div class="knowledge-card-thumb"><img src="images/articles/article-' + ra.id + '.jpg" alt="' + ra.title + '" loading="lazy"></div>' +
                        '<div class="knowledge-card-body">' +
                        '<span class="knowledge-card-cat" style="background:' + rc.bg + ';color:' + rc.color + '">' + rc.label + '</span>' +
                        '<h3>' + ra.title + '</h3>' +
                        '</div></a>';
                }
                relatedHtml += '</div></div>';
            }

            articlePage.innerHTML = breadHtml + heroHtml + bodyHtml + relatedHtml;

            // Reading progress bar
            var progressEl = document.createElement('div');
            progressEl.className = 'reading-progress';
            progressEl.innerHTML = '<div class="reading-progress-bar"></div>';
            document.body.appendChild(progressEl);
            var progressBar = progressEl.querySelector('.reading-progress-bar');
            var apBody = articlePage.querySelector('.ap-body');

            function updateProgress() {
                if (!apBody) return;
                var rect = apBody.getBoundingClientRect();
                var bodyTop = rect.top + window.pageYOffset;
                var bodyHeight = apBody.offsetHeight;
                var scrolled = window.pageYOffset - bodyTop;
                var viewH = window.innerHeight;
                var pct = Math.min(Math.max(scrolled / (bodyHeight - viewH * 0.3), 0), 1) * 100;
                progressBar.style.width = pct + '%';
            }
            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();
        } else {
            articlePage.innerHTML = '<div class="container" style="padding:80px 20px;text-align:center;">' +
                '<h1 style="font-size:24px;margin-bottom:16px;">記事が見つかりませんでした</h1>' +
                '<a href="index.html#knowledge" class="btn btn-primary">記事一覧に戻る</a></div>';
        }
    }
});
