let abc = "";
let sound = new Audio("./sound.wav");
function extractData(res, pincode, i) {
	abc = res;
	res = res.centers;
	for (let i = 0; i < res.length; i++) {
		let sessions = res[i].sessions;
		for (let j = 0; j < sessions.length; j++) {
			let capacity = sessions[j].available_capacity;
			let ageLimit = sessions[j].min_age_limit;

			if (ageLimit == 18 && capacity > 0) {
				console.log(pincode[i]);
				console.log("available");
				sound.play();
				return;
			}
		}
	}
	console.log("not available");
}

setInterval(() => {
	let date = new Date().getDate();

	let pincodes = [124001, 124419, 124501, 124514, 124412, 124112, 124111];
	for (let i = 0; i < pincodes.length; i++) {
		$.ajax({
			url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincodes[i]}&date=${date}-05-2021`,
			type: "GET",
			success: function (res) {
				extractData(res, pincodes, i);
			},
			error: function (err) {
				console.log(err);
			},
		});
	}
}, 1000 * 10);
console.log("new code");
window.addEventListener("keyup", (e) => {
	if (e.key == "Enter") {
		if (sound) {
			sound.pause();
		}
	}
});
