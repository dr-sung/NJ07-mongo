// find all documents
// db: 'wspdb'  user: 'wsp', password: 'password'
// collection: students
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const userUri = encodeURIComponent('wsp');
const passUri = encodeURIComponent('password');
const url = 'mongodb://' + userUri + ':'+passUri + 
            '@localhost:27017/wspdb?authSource=wspdb';
            
// update query
const updateQuery = { age: 22 };
const newValue = { $set: {age: 33} };

client.connect(url, {poolSize: 20}, (err, db) => {
	if (err) {
		console.log('connection error', err);
		return;
	}
	if (!db) {
		console.log('db is null: connection by client object failed');
		return;
	}
	console.log('connected via client object');
	db.collection('students', (err, collection) => {
		if (err) {
			console.log('students collection is null');
			return;
		}
		collection.updateMany(updateQuery, newValue, (err, results) => {
			if (err) {
				console.log('update error', err);
			}
			console.log('updated', newValue);
			db.logout((err, result) => {
				db.close();
				console.log('connection closed');
			});
		});
	});
});