const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
//create a server object:
app.use(cors());
app.get("/login", function (req, res) {
	const code = req.query.code;
	axios
		.post(
			`https://rest.cameramanager.com/oauth/token?grant_type=authorization_code&scope=read&code=${code}&redirect_uri=http://localhost:8080`,
			null,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization:
						"Basic ZGV2X3Rlc3Q6M0gxQmY2bUNjdElncEN1enZybnlla2YzVmhBVUVuS0o=",
				},
			}
		)
		.then((response) => {
			res.json(response.data);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.get("/refresh-token", async function (req, res) {
	const refreshToken = req.query.token;
	await axios
		.post(
			`https://rest.cameramanager.com/oauth/token?grant_type=refresh_token&scope=write&refresh_token=${refreshToken}`,
			null,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization:
						"Basic ZGV2X3Rlc3Q6M0gxQmY2bUNjdElncEN1enZybnlla2YzVmhBVUVuS0o=",
				},
			}
		)
		.then((response) => {
			res.json(response.data);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

app.listen(9000, function () {
	console.log("server running on 9000");
}); //the server object listens on port 8080
