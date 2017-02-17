function(context, args) // t:""
{

	if(!args || !args.t) {
		return {
			ok: false,
			msg: "Usage: universe.ez21 {t:#s.target.here}"
		}
	}



	var target = args.t;
	var response = target.call({});
	var substring1 = "EZ_21";
	var substring2 = "UNLOCKED"
	var i = 0;

	if(response.indexOf(substring1) > -1) {
		while(response.indexOf(substring2) === -1) {
			var passwords = ["unlock", "open", "release"];
			var response = target.call({EZ_21: passwords[i]});
			if(!response.indexOf(substring2) > -1) {
				var correct = passwords[i];
			}
			i++;
		}
	}

	if(args.return === true) {
		return {
			password = correct;
		}
	} else {
		return {
			ok: true,
			msg: "Cracked Lock, see response for lock response.",
			response: response
		}
	}

}
