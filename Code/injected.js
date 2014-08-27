var dialog;
var config={};

window.openScreenConnectDialogByName = function(machineName,customerName)
{
	console.log('openScreenConnectDialogByName:'+machineName+'. customerName passed:'+customerName);
	
	if (document.getElementById("ScreenConnectMatchesCustomerName")!=null)
	{
		config.ScreenConnectMatchesCustomerName=document.getElementById("ScreenConnectMatchesCustomerName").content;
		if (typeof config.ScreenConnectMatchesCustomerName=="undefined"){config.ScreenConnectMatchesCustomerName="true";}
		if (config.ScreenConnectMatchesCustomerName=="true"){config.ScreenConnectMatchesCustomerName=true;}else{config.ScreenConnectMatchesCustomerName=false;}
	}
	else
	{
		config.ScreenConnectMatchesCustomerName=false;
	}
	console.log('ScreenConnectMatchesCustomerName: '+config.ScreenConnectMatchesCustomerName);
	if (dojo.byId("ifr_"+machineName)!=null)
	{
		console.log('removing existing iframe');
		dojo.byId("ifr_"+machineName).parentNode.removeChild(dojo.byId("ifr_"+machineName));
	}
	
	if (document.getElementById("ScreenConnectServerURL")==null || document.getElementById("ScreenConnectServerURL").content==null || document.getElementById("ScreenConnectServerURL").content.length < 1)
	{
		var msg = "<br/><div>&nbsp;&nbsp;This extension requires configuration. To configure, follow these steps:</div>"+
				  "<ol>"+
				  "<li>Go to the Chrome Extension list(Chrome menu -> Tools -> Extensions</li>"+
				  "<li>Locate N-Central ScreenConnect extension, click the Options link</li>"+
				  "<li>Configure all displayed options and click Save</li>"+
				  "<li>Reload this N-Central page</li>"+
				  "</ol>"
		dialog = new dojox.widget.Dialog({ title:"ScreenConnect Integration", showTitle: true,
						executeScripts:true, 
						content: msg,
						style: "width: 600px"});
		 dialog.set("dimensions", [400, 200]); // [width, height]
		 setTimeout(function(){
			dialog.show();
		 }, 100);
		 return;
	}
	config.ScreenConnectServerURL = document.getElementById("ScreenConnectServerURL").content;
	config.ScreenConnectPopupWidth = document.getElementById("ScreenConnectPopupWidth").content;
	config.ScreenConnectPopupHeight = document.getElementById("ScreenConnectPopupHeight").content;
	var popupWidth=Number(config.ScreenConnectPopupWidth);
	var popupHeight=Number(config.ScreenConnectPopupHeight);
	
	var sessionGroupTitleText="";
	if (config.ScreenConnectMatchesCustomerName)
	{
		if (typeof customerName!="undefined")
		{
			sessionGroupTitleText="<b>"+customerName+"</b>";
		}
		else
		{
			sessionGroupTitleText="<i>Unavailable from here</i>";
		}
	}
	else
	{
		sessionGroupTitleText="<i>Matching not enabled</i>";
	}
	var iframeContent;
	
	dialog = new dojox.widget.Dialog({ title:"ScreenConnect - Machine Name: <b>"+machineName+"</b>, Session Group: "+sessionGroupTitleText, showTitle: true,
					executeScripts:true, 
					content: "<iframe id='ifr_"+machineName+"' width='"+(popupWidth-15)+"' height='"+(popupHeight-40)+"'></iframe>"});
	 dialog.set("dimensions", [popupWidth, popupHeight]);
	 setTimeout(function(){
		var loadText = "Loading ScreenConnect...<br/><br/>If this remains blank, check the chrome omnibar for a shield icon.";
		div_el = document.createElement('div');
		div_el.innerHTML = loadText;
		dojo.byId('ifr_'+machineName).contentWindow.document.body.appendChild(div_el);
		
		if (config.ScreenConnectMatchesCustomerName && typeof customerName!="undefined")
		{
			dojo.byId('ifr_'+machineName).src=config.ScreenConnectServerURL+'Host#'+customerName+"/"+machineName;
		}
		else
		{
			dojo.byId('ifr_'+machineName).src=config.ScreenConnectServerURL+'Host#All%20Machines/'+machineName;
		}
		dialog.show();
	 }, 100);
	 
}

var atSOLevel=false;
var customerLevelName="";
var navArrowButton = document.getElementById('navArrowBtnMidId');
if (navArrowButton!=null && navArrowButton.getAttribute('class')!=null && navArrowButton.getAttribute('class').indexOf("navArrowBtnMidSo") > -1)
{
	atSOLevel=true;
}
else
{
	customerLevelName=document.getElementById('customerListId').value;
}
var temp;
var mainPanel = document.getElementById("MainPanel");
if (mainPanel !=null)
{
	var tbody = mainPanel.getElementsByClassName("ListDashboardWindowBody")[0];
	if (tbody != null)
	{
		console.log('searching for elements of class ListLink');
		var devices=tbody.getElementsByClassName('ListLink');
		console.log(devices.length+' instances found');
		var pcName;
		var serverNameDiv;
		
		for(var i=0; i<devices.length; i++)
		{
			pcName=devices[i].text;
			pcName=pcName.substring(0,15); // truncate computer name to 16 characters, as screenconnect does this
			serverNameDiv = devices[i].parentNode;
			
			var a = document.createElement("a");
			a.href="#";
			a.id=pcName;
			if (atSOLevel)
			{
				a.class=serverNameDiv.parentNode.childNodes[1].firstChild.data.trim();
			}
			else
			{
				a.class=customerLevelName;
			}
			a.onclick=function(){window.openScreenConnectDialogByName(this.id,this.class);}
			
			serverNameDiv.insertBefore(a,serverNameDiv.firstChild);
			
			var img = document.createElement("img");
			img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfklEQVR42q2SUQrAIAxDeyb/PMamR/CI2/kcDgKuS7sKC+RHmydqRIi2Utpea//ymGN5iYRhFyCOlgBnTh0+cmrLAGiEB+Qxg8XZ3skvgA5bAKybgMgb0JlfAQhZf017wAC6iRbgbqIGsHqyK9BN6+QwwFIIEDEFsCYyo4laFzR0H3RkZYgQAAAAAElFTkSuQmCC"
			img.setAttribute('style','padding-right:3px');
			a.appendChild(img);
			
		}
	}
	else
	{
		console.log('search for ListDashboardWindowBody under MainPanel failed');
	}
	
	var activeIncidentGrid = document.getElementById("activeIncidentGrid");
	if (activeIncidentGrid != null)
	{
		console.log('searching for elements of class field-deviceName');
		var activeIssuesDevices=document.getElementsByClassName('field-deviceName');
		console.log(activeIssuesDevices.length+' instances found');
		var pcName;
		
		for(var i=1; i<activeIssuesDevices.length; i++)
		{
			pcName=activeIssuesDevices[i].firstChild.firstChild.firstChild.data;
			pcName=pcName.substring(0,15); // truncate computer name to 16 characters, as screenconnect does this
			
			rcImg = activeIssuesDevices[i].parentNode.getElementsByClassName('xtndRemoteControlIcon')[0];
			if (rcImg.parentNode.getElementsByTagName('a').length > 0)
			{
				continue; // skip if icon was already added. This code can be called multiple times due to dynamic scroll loading
			}
			var a = document.createElement("a");
			a.href="#";
			a.id=pcName;
			if (atSOLevel)
			{
				a.class=activeIssuesDevices[i].parentNode.getElementsByClassName("field-customerName")[0].firstChild.data.trim();
			}
			else
			{
				a.class=customerLevelName;
			}
			a.onclick=function(){window.openScreenConnectDialogByName(this.id,this.class);}
			
			rcImg.parentNode.insertBefore(a,rcImg);
			
			var img = document.createElement("img");
			img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfklEQVR42q2SUQrAIAxDeyb/PMamR/CI2/kcDgKuS7sKC+RHmydqRIi2Utpea//ymGN5iYRhFyCOlgBnTh0+cmrLAGiEB+Qxg8XZ3skvgA5bAKybgMgb0JlfAQhZf017wAC6iRbgbqIGsHqyK9BN6+QwwFIIEDEFsCYyo4laFzR0H3RkZYgQAAAAAElFTkSuQmCC"
			img.setAttribute('style','padding-right:3px');
			a.appendChild(img);
			
		}
	}
	else
	{
		console.log('search for activeIncidentGrid failed');
	}

	var lanDevice = document.getElementById('lanDeviceIndexGrid');

	if (lanDevice != null)
	{
		var devices = lanDevice.getElementsByClassName('field-name');
		var rcImg;
		var rowElement;
		for(var i=1; i<devices.length; i++) // skip the first row, it's the header
		{
			pcName=devices[i].firstChild.firstChild.data;
			pcName=pcName.substring(0,15); // truncate computer name to 16 characters, as screenconnect does this
			rowElement = devices[i].parentNode;
			rcImg = rowElement.getElementsByClassName('xtndRemoteControlIcon')[0];
			if (rcImg.parentNode.getElementsByTagName('a').length > 0)
			{
				continue; // skip if icon was already added. This code can be called multiple times due to dynamic scroll loading
			}
			var a = document.createElement("a");
			a.href="#";
			a.id=pcName;
			if (atSOLevel)
			{
				a.class=rowElement.childNodes[1].firstChild.data.trim();
			}
			else
			{
				a.class=customerLevelName;
			}
				
			a.onclick=function(){window.openScreenConnectDialogByName(this.id,this.class);}
			rcImg.parentNode.insertBefore(a,rcImg);
			
			var img = document.createElement("img");
			img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfklEQVR42q2SUQrAIAxDeyb/PMamR/CI2/kcDgKuS7sKC+RHmydqRIi2Utpea//ymGN5iYRhFyCOlgBnTh0+cmrLAGiEB+Qxg8XZ3skvgA5bAKybgMgb0JlfAQhZf017wAC6iRbgbqIGsHqyK9BN6+QwwFIIEDEFsCYyo4laFzR0H3RkZYgQAAAAAElFTkSuQmCC"
			img.setAttribute('style','padding-right:3px');
			a.appendChild(img);
			
		}
	}

	var editDevice = document.getElementById('editDeviceServicesFormId');

	if (editDevice != null)
	{
		var pcName=document.getElementById('pageTitleBarTextId').firstChild.data;
		pcName=pcName.substr(pcName.indexOf(':')+2); // get PC name from title
		pcName=pcName.substring(0,15); // truncate computer name to 16 characters, as screenconnect does this
		var rcImg = editDevice.getElementsByClassName('xtndRemoteControlIcon')[0];
		
		var a = document.createElement("a");
		a.href="#";
		a.id=pcName;
		if (!atSOLevel)
		{
			a.class=customerLevelName;
		}
		a.onclick=function(){window.openScreenConnectDialogByName(this.id,this.class);}
		rcImg.parentNode.insertBefore(a,rcImg);
		
		var img = document.createElement("img");
		img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1UlEQVR42tXWSw6DMAwEUM7EjmO0cEgOQM8HYoGUGtLMjA1JI3mXz5Ntyem6f1qvcZzf07R6Y7+n2uMyIvLxI2SAlMKLLMoATx/dAvgM/ZqLZejnqgCLeLQE+8MHogogzU7xnlR7FWrNIUDpcQZgERCgdCELSPfTAJtCtAdsFmWApwmbBED3NAmwm5oC5KZhCZCdhiwAme/UfgSA/IgYwFcWEQCCQAGnEqIAdPD8akL4oPL9CgWwNQ8HsDW/BcCuEEBuGjLfLxcgKlx6b0hZjEKoJay2NmcMo1DvzqsKAAAAAElFTkSuQmCC"
		img.setAttribute('style','padding-right:3px');
		a.appendChild(img);
		
	}

}
else
{
	console.log('initial search for MainPanel failed');
}



