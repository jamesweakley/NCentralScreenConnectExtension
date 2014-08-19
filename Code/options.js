
function loadOptions() {
	var url = localStorage["ScreenConnectServerURL"];
	if (typeof url!="undefined")
	{
		document.getElementById("serverURL").value=url;
	}
	
	var match = localStorage["ScreenConnectMatchesCustomerName"];
	if (typeof match=="undefined")
	{
		match="true";
	}
	if (match=="true"){match=true;}else{match=false;}
	document.getElementById("matchCustomer").checked = match;
	
	var width = localStorage["ScreenConnectPopupWidth"];
	if (typeof width=="undefined")
	{
		width=615;
	}
	document.getElementById("popupWidth").value=width;
	
	var height = localStorage["ScreenConnectPopupHeight"];
	if (typeof height=="undefined")
	{
		height=540;
	}
	document.getElementById("popupHeight").value=height;
}

function saveOptions() {
	var url = document.getElementById("serverURL");
	var match = document.getElementById("matchCustomer");
	var width = document.getElementById("popupWidth");
	var height = document.getElementById("popupHeight");
	
	if (url.value.indexOf("http") == -1)
	{
		alert("You must include the protocol part of the url (e.g. http://)");
	}
	if (isNaN(Number(width.value)))
	{
		alert("Width supplied is not a number");
	}
	if (isNaN(Number(height.value)))
	{
		alert("Height supplied is not a number");
	}
	localStorage["ScreenConnectServerURL"] = url.value;
	localStorage["ScreenConnectMatchesCustomerName"] = match.checked;
	localStorage["ScreenConnectPopupWidth"] = width.value;
	localStorage["ScreenConnectPopupHeight"] = height.value;
}

document.addEventListener('DOMContentLoaded', function () {
  loadOptions();
  document.getElementById("save").addEventListener('click', saveOptions);
});