chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});

// Listener برای احراز هویت پروکسی
chrome.webRequest.onAuthRequired.addListener(
    (details) => {
        return new Promise((resolve) => {
            const username = "TSR"; // نام کاربری پروکسی
            const password = "OH44BuykEF"; // رمز عبور پروکسی
            resolve({ authCredentials: { username: username, password: password } });
        });
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
