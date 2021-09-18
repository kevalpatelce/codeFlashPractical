const fs = require('fs');
const XLSX = require("xlsx");
const moment = require("moment");

fs.readFile(__dirname + `/sampleData.json`, 'utf8', function(err, response){
	if (err) {
			console.log("File read failed:", err);
			return;
		}
	let data_convert_json = JSON.parse(response); //data convert into json

	let insertrecord =[];
	data_convert_json.forEach(element => {
		insertrecord.push({
			Name: `${element.title} ${element.first_name} ${element.last_name}`,
			Username:element.username,
			Email: element.email,
			Phonenumber: element.phone_number,
			Dateofbirth: moment(element.birthdate).format("LL"),
			Address: `${element.location.street}, ${element.location.city}, ${element.location.state} - ${element.location.postcode}`,
		})
	});
	
	const convertjsontoexcel = () => {
			const worksheet = XLSX.utils.json_to_sheet(insertrecord);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook,worksheet,"students");
			XLSX.write(workbook,{bookType:"xlsx",type:"buffer"});
			XLSX.write(workbook,{bookType:"xlsx",type:"binary"});
			XLSX.writeFile(workbook,"demo6.xlsx");
	};

	convertjsontoexcel();
	
});
