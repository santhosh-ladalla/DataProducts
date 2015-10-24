
var http=getHTTPObject();var isBusy=false;var processing=false;var ajaxqueue=new Array();var lastAjaxRequest="";function handleHttpResponse(){if(http.readyState==4){results=http.responseText;results=results.split("\n");var method=results.shift();results=results.join("\n");isBusy=false;switch(method){case"getcontent":parseGetAjaxContent(results);break;case"putget":parseAjaxPutGet(results);break;case"rapidvote":location.reload();break;}}}
function doSend(){if(isBusy){http.onreadystatechange=function(){}
http.abort();}
isBusy=true;http.send(null);}
function process_ajaxqueue(){if(processing)return;processing=true;var elem="";while(ajaxqueue.length>0){if(isBusy){processing=false;setTimeout('process_ajaxqueue();',50);return;}
elem=ajaxqueue.shift();if(elem.indexOf("key=MyDNLogin")==-1&&elem.indexOf("option=MyDN-NotLoggedIn")==-1)
lastAjaxRequest=elem;http.open("GET",elem,true);if('withCredentials' in http)http.withCredentials = true;http.onreadystatechange=handleHttpResponse;doSend();}
processing=false;}
function getAjaxContent(objid,key,option){ajaxqueue.push("/ajax?type=getcontent&objid="+escape(objid)+"&key="+escape(key)+"&option="+escape(option));process_ajaxqueue();return;}
function parseGetAjaxContent(ret){ret=ret.split("\n");var objid=ret.shift();if(ret[0]=="MYDN-NOTLOGGEDIN"){shadeDivPopup('MyDN-NotLoggedIn','');return;}
var cparts=ret[0].split(":");var cpt=cparts.shift();var evCode="";if(cpt=="JS"){ret[0]=cparts.join(":");evCode=ret[0];ret.shift();}
ret=ret.join("\n");if(ret=="")ret="<strong>AJAX Error!</strong>";document.getElementById(objid).innerHTML=ret;if(evCode!="")eval(evCode);return;}
function ajaxPutGet(key,option1,option2){ajaxqueue.push("/ajax?type=putget&key="+escape(key)+"&option1="+escape(option1)+"&option2="+escape(option2));process_ajaxqueue();return;}
function parseAjaxPutGet(results){results=results.split("\n");var key=results.shift();results=results.join("\n");if(key=="MYDN-NOTLOGGEDIN"){shadeDivPopup('MyDN-NotLoggedIn','');return;}
switch(key){case"error":alert("An Error Has Occurred!\n\n"+results);shadeDivMouseDown();break;case"composePMAC":parseComposePMAC(results);break;case"sendemail2friend":document.getElementById('e2fstatus').innerHTML="<br />Message added to queue.  It'll be sent shortly.  Thanks!<br /><br />";setTimeout("shadeDivMouseDown(); sendingemail2friend = false;",4000);break;case"add2favorites":document.getElementById('addtofavoritespopup-status').innerHTML=results;break;case"checkwallpaper":checkWallpaperRet(results);break
case"docrop":doCropRet(results);break;case"resetcrop":resetCropRet();break;case"uploadstatus":handleUploadStatus(results);break;case"joingroup":handleJoinGroup();break;case"leavegroup":handleLeaveGroup(results);break;case"reportViolation":handleReportViolation(results);break;case"saveProfileBlock":editProfileBlock(results);break;case"savePersonalPreferences":handleSavePersonalPreferences(results);break;case"addFan":handleAddFan(results);break;case"profileHideUpdate":handleProfileHideUpdate(results);break;case"hideAnnouncement":checkHash();break;case"deleteProfileComment":handleDeleteProfileComment(results);break;case"profileMemberIgnoreAdd":handleProfileMemberIgnoreAdd(results);break;case"profileMemberIgnoreRemove":handleProfileMemberIgnoreRemove(results);break;case"newJournalEntry":handleNewJournalEntry(results);break;case"deleteJournalEntry":handleDeleteJournalEntry(results);break;case"modifyPassword":handleModifyPassword(results);break;case"saveEmailNotifications":handleSaveEmailNotifications(results);break;case"PMAction":handle_profilePMAction(results);break;case"sendPM":handle_profileSendPM(results);break;case"PMViolation":handle_sendPMViolationReport(results);break;case"profileAddComment":handle_profileAddComment(results);break;case"MyDNLogin":handle_profileMyDNLogin(results);break;case"postStatusUpdate":handle_postStatusUpdate(results);break;case"fanFeedCustomizeView":handle_fanFeedCustomizeView(results);break;case"queueCheckDupes":handle_queueCheckDupes(results);break;case"queueSaveDetails":handle_queueSaveDetails(results);break;}
return;}
function getHTTPObject(){var xmlhttp;
/*@cc_on
        @if (@_jscript_version >= 5)
                try {
                        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                }catch(e){
                        try{
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(E){
                        xmlhttp = false;
                }
        }
        @else
                xmlhttp = false;
        @end @*/
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
return xmlhttp;}