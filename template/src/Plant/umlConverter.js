function setJSON(dict){
	console.log("JSON is set", dict, dict.Code);
	console.log(dict.Name);

	let encode6bit = e => {
		return e<10?String.fromCharCode(48+e):(e-=10)<26?String.fromCharCode(65+e):(e-=26)<26?String.fromCharCode(97+e):0==(e-=26)?"-":1==e?"_":"?"
	}

	let append3bytes = (e,n,t) => {
		return c1=e>>2,c2=(3&e)<<4|n>>4,c3=(15&n)<<2|t>>6,c4=63&t,r="",r+=encode6bit(63&c1),r+=encode6bit(63&c2),r+=encode6bit(63&c3),r+=encode6bit(63&c4),r
	}

	let encode64_ = e => {
		for(r="",i=0;i<e.length;i+=3)
			i+2==e.length?r+=append3bytes(e[i],e[i+1],0):i+1==e.length?r+=append3bytes(e[i],0,0):r+=append3bytes(e[i],e[i+1],e[i+2]);
		return r
	}


	let zopfli = require('node-zopfli');


	var text =
	`
	@startuml
	bob -> helen : hello
	helen -> bob
	@enduml
	`


	module.exports = text => {
		// text =  unescape(encodeURIComponent(text))
		let input = new Buffer(unescape(encodeURIComponent(text)),"utf8")
		let res = zopfli.deflateSync(input, {blocksplitting: false})
		return encode64_(res)
	}


	var input = new Buffer(text)
	console.log(input.toString())
	let defl

	var deflated = zopfli.deflateSync(input, {blocksplitting: false});
	return "http://www.plantuml.com/plantuml/png/"+encode64_(deflated)
}

module.exports.setJSON = setJSON;