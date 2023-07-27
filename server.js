import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `SELECT id, name, year, quality FROM movies`;
	
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

  app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	let moviesID = req.body.moviesID;
	let userID = req.body.userID;
	let reviewTitle = req.body.reviewTitle;
	let reviewContent = req.body.reviewContent;
	let reviewScore = req.body.reviewScore;

	let sql = `INSERT INTO review (userID, moviesID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
	let data = [userID, moviesID, reviewTitle, reviewContent, reviewScore];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	let data = [userID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

//POST API for Search Page
app.post('/api/getSearchResults', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieName = req.body.movieName;
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;
	
	let sql = 
		`SELECT movieName, directorName, GROUP_CONCAT(r.reviewContent) as review, AVG(r.reviewScore) as avgScore
		FROM (
			SELECT m.name as movieName, m.id, CONCAT(d.first_name, ' ', d.last_name) as DirectorName, CONCAT(a.first_name, ' ', a.last_name) as ActorName
			FROM movies m, actors a, movies_directors md, review r, directors d, roles
			WHERE d.id = md.director_id
			AND m.id = md.movie_id
			AND m.id = roles.movie_id
			AND roles.actor_id = a.id
			AND r.moviesID = m.id
		) AS M 
		LEFT JOIN review r ON M.id = r.moviesID
		GROUP BY movieName, directorName`;
	let data = [];

	if (movieName){
		sql = sql + ` AND m.name = ?`;
		data.push(movieName);
	}
	if (actorName){
		sql = sql + ` AND CONCAT(a.first_name, ' ', a.last_name) = ?`;
		data.push(actorName);
	}
	if (review){
		sql = sql + ` AND review.reviewContent = ?`;
		data.push(review);
	}
	if (avgScore){
		sql = sql + ` AND AVG(review.reviewScore) = ?`;
		data.push(avgScore);
	}
	if (directorName){
		sql = sql + ` AND CONCAT(d.first_name, ' ', d.last_name) = ?`;
	}

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server