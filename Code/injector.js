var s = document.createElement('script');
s.src = chrome.extension.getURL("injected.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

console.log('injector page fetching preferences');
chrome.extension.sendRequest({name: "getPreferences"},
	 function(response)
	 {
		console.log('injector page received preferences');
		console.log(response);
		
		if (document.getElementById('ScreenConnectServerURL')!=null)
		{
			document.getElementById('ScreenConnectServerURL').content=response.ScreenConnectServerURL;
		}
		else
		{
			var meta=document.createElement('meta');
			meta.id="ScreenConnectServerURL";
			meta.content=response.ScreenConnectServerURL;
			document.head.appendChild(meta);
		}
		
		if (document.getElementById('ScreenConnectMatchesCustomerName')!=null)
		{
			document.getElementById('ScreenConnectMatchesCustomerName').content=response.ScreenConnectMatchesCustomerName;
		}
		else
		{
			var meta2=document.createElement('meta');
			meta2.id="ScreenConnectMatchesCustomerName";
			meta2.content=response.ScreenConnectMatchesCustomerName;
			document.head.appendChild(meta2);
		}
		
		if (document.getElementById('ScreenConnectPopupWidth')!=null)
		{
			document.getElementById('ScreenConnectPopupWidth').content=response.ScreenConnectPopupWidth;
		}
		else
		{
			var meta3=document.createElement('meta');
			meta3.id="ScreenConnectPopupWidth";
			meta3.content=response.ScreenConnectPopupWidth;
			document.head.appendChild(meta3);
		}
		
		if (document.getElementById('ScreenConnectPopupHeight')!=null)
		{
			document.getElementById('ScreenConnectPopupHeight').content=response.ScreenConnectPopupHeight;
		}
		else
		{
			var meta4=document.createElement('meta');
			meta4.id="ScreenConnectPopupHeight";
			meta4.content=response.ScreenConnectPopupHeight;
			document.head.appendChild(meta4);
		}
	 });
