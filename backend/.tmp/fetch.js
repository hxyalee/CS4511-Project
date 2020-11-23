const fetch = require('node-fetch')

fetch('http://localhost:5000/project-4d358/asia-east2/api/getReviews', {
	method:'POST',
	headers:{
		'Accept': 'application/json',
	  	'Content-Type': 'application/json'
	}
}).then((res) => res.json())
.then(res => console.log(res))