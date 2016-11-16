browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if(message.type === 'page') {
		if(message.category === 'extension'){
			if(message.content === 'on')
				browser.browserAction.enable(sender.tab.id);
			else if(message.content === 'off')
				browser.browserAction.disable(sender.tab.id);
		}
	}
	else {
		browser.tabs.query({
			active : true,
			currentWindow : true
		}, function (tabs) {
			if(!tabs) return;
			browser.tabs.executeScript(tabs[0].id, {
				code : `window.postMessage({ type: '${message.type}', category: '${message.category}' }, '*');`
			});
		});
	}
});