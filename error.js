class ErrorHandler {
    static init() {
        window.addEventListener('error', this.handleError);
        window.addEventListener('unhandledrejection', this.handlePromiseError);
    }

    static handleError(event) {
        console.error('Error:', event.error);
        // 可以添加错误上报逻辑
    }

    static handlePromiseError(event) {
        console.error('Promise Error:', event.reason);
        // 可以添加错误上报逻辑
    }
}

ErrorHandler.init(); 