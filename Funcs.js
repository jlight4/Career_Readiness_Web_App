var url ="https://docs.google.com/spreadsheets/d/1W8w-oEFtouXCUuC_ntT4a2W_uXRYjY_ga-upgW5RklE/edit#gid=0"
var ss = SpreadsheetApp.openByUrl(url);

var ws = ss.getSheetByName("UserLoginInfo");
var wsSP = ss.getSheetByName("ProfileQuestions");
var wsG = ss.getSheetByName("Grades");




//Include CSS file
function include(filename)
{
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}



//Register User
function userClickedReg(userInfo)
{
  id = guidGenerator();

  ws.appendRow([userInfo.username, userInfo.passcode, id]);
}

//Generate Unique ID
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}




//Check Login Info
function checkLogin(username, password) 
{
  var getLastRow =  ws.getLastRow();
  var found_record = '';
  for(var i = 1; i <= getLastRow; i++)
  {
   if(ws.getRange(i, 1).getValue() == username && ws.getRange(i, 2).getValue() == password)
   {
     found_record = 'TRUE';
   }    
  }
  if(found_record == '')
  {
    found_record = 'FALSE'; 
  }
  
  return found_record;
}



//Get user ID
function findID(username, password)
{
  
  var getLastRow =  ws.getLastRow();
  var userID = '';

  for(var i = 1; i <= getLastRow; i++)
  {
   if(ws.getRange(i, 1).getValue() == username && ws.getRange(i, 2).getValue() == password)
   {
     userID = ws.getRange(i, 3).getValue();
   }    
  }

  if(userID == '')
  {
    userID = 'ID Not Found'; 
  }

  Logger.log(userID);
  Logger.log(typeof userID);
  
  return userID;
}


//Get Profile Data
function getProfileData(userID)
{
  var getLastRow =  wsSP.getLastRow();

  var name = 'N/A';
  var style = 'N/A';
  var subject = 'N/A';
  var job = 'N/A';

  for(var i = 1; i <= getLastRow; i++)
  {
   if(wsSP.getRange(i, 6).getValue() == userID)
   {
     name = wsSP.getRange(i, 2).getValue();
     style = wsSP.getRange(i, 3).getValue();
     subject = wsSP.getRange(i, 4).getValue();
     job = wsSP.getRange(i, 5).getValue();
   }
      
  }

  return [name, style, subject, job];
}


function getGrades(userID)
{
  var getLastRow =  wsG.getLastRow();

  var math = 'N/A';
  var english = 'N/A';
  var science = 'N/A';
  var history = 'N/A';

  for(var i = 1; i <= getLastRow; i++)
  {
   if(wsG.getRange(i, 6).getValue() == userID)
   {
     math = wsG.getRange(i, 2).getValue();
     english = wsG.getRange(i, 3).getValue();
     science = wsG.getRange(i, 4).getValue();
     history = wsG.getRange(i, 5).getValue();
   }
      
  }

  return [math, english, science, history];
}