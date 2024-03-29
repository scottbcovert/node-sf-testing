var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {

	var jsforce = require('jsforce');
	var conn = new jsforce.Connection();
	conn.login('scott.covert@df14.com', 'dfpassw0rdDAAtkhl4gx2pqFXueP10ZhivL', function(err, res) {
	  if (err) { return console.error(err); }
	  conn.query('SELECT Id, Name FROM Account ORDER BY Name ASC', function(err, res) {
	    if (err) { return console.error(err); }
	    else {
		    var htmlResponse = '<table><tr><td><b>Account Name</b></td></tr>';
		    res.records.forEach( function(account){
		    	htmlResponse += '<tr><td>' + JSON.stringify(account.Name).replace("\"","").replace("\"","") + '</td></tr>';
		    });
		    response.send(htmlResponse);
		}
	  });
	});
	  
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
