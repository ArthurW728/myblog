// 粒子效果
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        {
            transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0,0.2,1,1)'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// 鼠标移动粒子效果
function handleMouseMove(e) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        {
            transform: 'scale(1)',
            opacity: 1
        },
        {
            transform: 'scale(0)',
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0,0.2,1,1)'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// 页面切换效果
function initPageTransitions() {
    const mask = document.querySelector('.mask');
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

    // 修改链接点击事件处理
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const isIndex = href.includes('index.html') || href === '/';
            
            // 添加遮罩动画
            mask.classList.add('active');
            
            // 延迟跳转
            setTimeout(() => {
                // 如果是跳转到首页，添加hash处理
                if (isIndex) {
                    const hash = this.getAttribute('href').split('#')[1];
                    if (hash) {
                        window.location.href = href;
                        // 等待页面加载完成后滚动到指定位置
                        window.addEventListener('load', () => {
                            const targetSection = document.querySelector(`#${hash}`);
                            if (targetSection) {
                                targetSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        });
                    } else {
                        window.location.href = href;
                    }
                } else {
                    window.location.href = href;
                }
            }, 500);
        });
    });

    // 页面加载完成时的动画
    window.addEventListener('load', () => {
        mask.classList.add('loaded');
        
        // 检查URL中是否有hash
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });
}

// 3D 卡片效果
function init3DCards() {
    const cards = document.querySelectorAll('.info-card, .portfolio-box');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// 导航跳转效果
function initNavigation() {
    const header = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]');

    // 滚动效果
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        
        // 更新当前活动section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // 更新导航栏活动状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 汉堡菜单
    menuBtn?.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // 点击链接关闭菜单并添加动画
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 关闭移动端菜单
            menuBtn.classList.remove('active');
            navbar.classList.remove('active');

            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // 移除所有导航链接的激活状态
                navLinks.forEach(link => link.classList.remove('active'));
                // 添加当前链接的激活状态
                this.classList.add('active');

                if (targetSection) {
                    // 平滑滚动到目标位置
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 初始化section显示
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });

    // 创建观察器来显示sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-hidden');
                entry.target.classList.add('section-active');
            }
        });
    }, {
        threshold: 0.15
    });

    // 观察所有sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// 初始化所有效果
function initAllEffects() {
    // 添加遮罩层（如果不存在）
    if (!document.querySelector('.mask')) {
        const mask = document.createElement('div');
        mask.className = 'mask';
        document.body.appendChild(mask);
    }

    // 初始化页面切换效果
    initPageTransitions();
    
    // 初始化3D卡片效果
    init3DCards();
    
    // 启动粒子效果
    setInterval(createParticle, 300);
    
    // 添加鼠标移动监听
    document.addEventListener('mousemove', handleMouseMove);
    
    // 添加导航初始化
    initNavigation();

    // 添加技能部分动画效果
    initSkillsAnimation();

    // 添加技能详情弹出效果
    initSkillsTooltips();

    // 添加图片效果
    initImageEffect();
}

// 当DOM加载完成时初始化所有效果
document.addEventListener('DOMContentLoaded', initAllEffects);

// 技能部分动画效果
function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const skillsBoxes = document.querySelectorAll('.skills-box');
    const progressBars = document.querySelectorAll('.progress .bar span');
    const progressNumbers = document.querySelectorAll('.progress h3 span');

    // 3D移动效果
    skillsBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 更新发光效果位置
            box.style.setProperty('--x', `${x}px`);
            box.style.setProperty('--y', `${y}px`);
            
            // 计算旋转角度
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -(y - centerY) / 20;
            const rotateY = (x - centerX) / 20;
            
            box.style.transform = `
                translateZ(50px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateZ(0)';
        });
    });

    // 进度条动画
    function updateProgress(bar, targetWidth) {
        bar.style.width = `${targetWidth}%`;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加入场动画
                entry.target.querySelectorAll('.skills-box').forEach((box, index) => {
                    box.style.opacity = '0';
                    box.style.transform = 'translateZ(-100px) rotateX(30deg)';
                    
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateZ(0) rotateX(0)';
                    }, index * 200);
                });

                // 进度条动画
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const targetWidth = bar.parentElement.parentElement.querySelector('span').textContent;
                        updateProgress(bar, parseInt(targetWidth));
                    }, (index * 200) + 500);
                });

                // 数字动画
                progressNumbers.forEach((number, index) => {
                    const targetNum = parseInt(number.textContent);
                    let currentNum = 0;
                    
                    const updateNumber = () => {
                        if (currentNum < targetNum) {
                            currentNum += 1;
                            number.textContent = `${currentNum}%`;
                            requestAnimationFrame(updateNumber);
                        }
                    };
                    
                    setTimeout(updateNumber, (index * 200) + 500);
                });
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(skillsSection);
}

// 技能详情弹出效果
function initSkillsTooltips() {
    const skillsItems = document.querySelectorAll('.skills-content .progress');
    
    // 技能详情数据
    const skillsData = {
        'Web Development': {
            title: 'Web 开发',
            description: '全栈开发能力，专注于现代化Web应用',
            details: [
                '精通 HTML5, CSS3 和响应式设计',
                '掌握前端工程化和模块化开发',
                '熟悉 Web 性能优化和安全实践',
                '具备跨浏览器兼容性处理经验'
            ]
        },
        'JavaScript': {
            title: 'JavaScript',
            description: '深入理解核心概���和最新特性',
            details: [
                '熟练运用 ES6+ 新特性开发',
                '掌握异步编程和事件循环机制',
                '了解 TypeScript 和设计模式',
                '具备前端性能优化经验'
            ]
        },
        'React': {
            title: 'React',
            description: '专注React生态系统开发',
            details: [
                '熟练使用 React Hooks 和组件开发',
                '掌握 Redux/Mobx 状态管理',
                '��解 React 性能优化技巧',
                '具备 Next.js SSR 开发经验'
            ]
        },
        'Node.js': {
            title: 'Node.js',
            description: '服务端开发和工具开发经验',
            details: [
                '熟练使用 Express/Koa 框架',
                '掌握数据库设计和优化',
                '了解服务端性能调优',
                '具备微服务架构经验'
            ]
        },
        'UI/UX Design': {
            title: 'UI/UX 设计',
            description: '注重用户体验的界面设计',
            details: [
                '熟练使用 Figma/Sketch 等设计工具',
                '掌握界面设计原则和规范',
                '了解用户体验研究方法',
                '具备产品原型设计能力'
            ]
        },
        'Python': {
            title: 'Python',
            description: '数据处理和自动化开发',
            details: [
                '熟练使用 Python 进行数据分析',
                '掌握爬虫开发和自动化脚本',
                '了解机器学习基础算法',
                '具备数据可视化经验'
            ]
        },
        'Database': {
            title: '数据库',
            description: '关系型和非关系型数据库应用',
            details: [
                '熟练使用 MySQL/PostgreSQL',
                '掌握 MongoDB/Redis 应用',
                '了解数据库优化和运维',
                '具备大数据处理经验'
            ]
        },
        'DevOps': {
            title: 'DevOps',
            description: '开发运维和自动化部署',
            details: [
                '熟练使用 Docker/Kubernetes',
                '掌握 CI/CD 流程和工具',
                '了解云服务和服务器运维',
                '具备自动化测试经验'
            ]
        }
    };

    // 创建tooltip元素
    function createTooltip(data) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skills-tooltip';
        tooltip.innerHTML = `
            <h4>${data.title}</h4>
            <p>${data.description}</p>
            <ul>
                ${data.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;
        return tooltip;
    }

    // 为每个技能项添加交互
    skillsItems.forEach(item => {
        // 获取完整的技能名称文本
        const skillText = item.querySelector('h3').textContent;
        // 移除百分比部分
        const skillName = skillText.replace(/\s+\d+%$/, '').trim();
        const data = skillsData[skillName];
        
        if (data) {
            const tooltip = createTooltip(data);
            item.appendChild(tooltip);
            
            item.addEventListener('mouseenter', () => {
                tooltip.classList.add('active');
            });
            
            item.addEventListener('mouseleave', () => {
                tooltip.classList.remove('active');
            });
        } else {
            console.log(`No data found for skill: ${skillName}`); // 用于调试
        }
    });
}

// 图片效果
function initImageEffect() {
    const homeImg = document.querySelector('.home-img');
    
    homeImg.addEventListener('mousemove', (e) => {
        const rect = homeImg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        homeImg.style.setProperty('--x', `${x}%`);
        homeImg.style.setProperty('--y', `${y}%`);
    });
}

// 添加防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动监听
window.addEventListener('scroll', debounce(() => {
    // 原有的滚动监听代码
}, 16));

// 优化图片加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}