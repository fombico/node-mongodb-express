var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	port = 8080,
	MongoClient = require('mongodb').MongoClient;

app.use(morgan('combined')); // logging of requests
app.use(bodyParser.urlencoded({extended: false})); // converts request body to json
app.set('view engine', 'ejs'); // view engine to EJS (default is jade)

MongoClient.connect('mongodb://127.0.0.1:27017/myExample', (err, db) => {
	if (err) return console.log(err);

	var collection = db.collection('requests');

	var indexCallback = (req, res) => {
		collection.find().toArray((err, docs) => {
			if (err) return console.log(err);
			
			res.render('index', {docs: docs});
		});
	};

	app.get('/', indexCallback);

	app.get('*', (req, res) => {
		res.render('form.ejs');
	});

	app.post('*', (req, res) => {
		collection.insert(req.body, (err, doc) => {
			if (err) {
				req.sendStatus(500);
				return console.log(err);
			}

			console.log("Inserted: %s", JSON.stringify(doc));
			res.redirect('/');
		});
	});

	app.listen(port);
	console.log('server on %s', port);
});