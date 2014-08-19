
chrome.webRequest.onCompleted.addListener(function(details)
{
	console.log('dashboard page loaded: '+details.url);
	console.log(details);
	chrome.tabs.executeScript(null, {file: "injector.js"});
},
{urls: [ "http://*/filterDashboardViewAction.action*","https://*/filterDashboardViewAction.action*","http://*/rest/lan-devices*","https://*/rest/lan-devices*","http://*/editDeviceAction*","https://*/editDeviceAction*","http://*/rest/active-incident*","https://*/rest/active-incident*"]}
);

chrome.extension.onRequest.addListener(
     function(request, sender, sendResponse)
     {
        switch (request.name)
        {
           case "getPreferences":
			
			if (typeof localStorage["ScreenConnectServerURL"] == "undefined")
			{
				return;
			}
			var url = localStorage["ScreenConnectServerURL"];
			if (typeof url!="undefined" && url.substring(url.length-1)!="/")
			{
				url=url+"/";
			}
			
			var width = localStorage["ScreenConnectPopupWidth"];
			if (typeof localStorage["ScreenConnectPopupWidth"]=="undefined")
			{
				width=615;
			}
			
			var height = localStorage["ScreenConnectPopupHeight"];
			if (typeof localStorage["ScreenConnectPopupHeight"]=="undefined")
			{
				height=540;
			}
			
			console.log('Server address: '+url);
			
			sendResponse(
				{
				   ScreenConnectServerURL : url,
				   ScreenConnectMatchesCustomerName : localStorage["ScreenConnectMatchesCustomerName"],
				   ScreenConnectPopupWidth : width,
				   ScreenConnectPopupHeight : height
				});
			break;
        }
     }
);
