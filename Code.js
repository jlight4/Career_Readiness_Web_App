var Route = {};
Route.path = function(route, callBack)
{
  Route[route] = callBack;
}

function doGet(e)
{
  Route.path("reg", loadReg)
  Route.path("ID", loadID)

  Route.path("home", loadHome)
  Route.path("profile", loadPro)
  Route.path("survey", loadSurvey)
  Route.path("sug", loadSug)


  if(Route [e.parameters.v])
  {
    return Route [e.parameters.v]();
  } 
  else 
  {
    return HtmlService.createTemplateFromFile("page-login").evaluate();
  }
}



function test()
{
  var cache = CacheService.getUserCache();
  var test = cache.get('id');

  Logger.log(test);
}