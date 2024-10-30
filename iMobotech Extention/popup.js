let isProxyEnabled = false;

const proxySettings = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "mseu.fastspeed.cfd",
      port: 43769
    }
  }
};

function enableProxy() {
  chrome.proxy.settings.set(
    { value: proxySettings, scope: "regular" },
    () => {
      console.log("HTTP Proxy enabled.");
      document.getElementById("status").textContent = "Proxy is currently enabled.";
      document.getElementById("toggleProxy").textContent = "Disable Proxy";
      document.body.style.backgroundColor = "#4CAF50"; 
      isProxyEnabled = true;
      chrome.storage.local.set({ proxyEnabled: true });
    }
  );
}

function disableProxy() {
  chrome.proxy.settings.set(
    { value: { mode: "direct" }, scope: "regular" },
    () => {
      console.log("Proxy disabled.");
      document.getElementById("status").textContent = "Proxy is currently disabled.";
      document.getElementById("toggleProxy").textContent = "Enable Proxy";
      document.body.style.backgroundColor = "#f44336"; 
      isProxyEnabled = false;
      chrome.storage.local.set({ proxyEnabled: false });
    }
  );
}

chrome.storage.local.get("proxyEnabled", (data) => {
  if (data.proxyEnabled) {
    enableProxy();
  } else {
    disableProxy();
  }
});

document.getElementById("toggleProxy").addEventListener("click", () => {
  if (isProxyEnabled) {
    disableProxy();
  } else {
    enableProxy();
  }
});
