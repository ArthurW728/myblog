class Performance {
    static init() {
        this.measurePageLoad();
        this.measureInteractions();
    }

    static measurePageLoad() {
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`页面加载时间: ${loadTime}ms`);
        });
    }

    static measureInteractions() {
        // 监测用户交互性能
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`交互延迟: ${entry.duration}ms`);
            }
        });
        
        observer.observe({ entryTypes: ['first-input', 'layout-shift'] });
    }
}

Performance.init(); 