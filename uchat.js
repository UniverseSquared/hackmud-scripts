function(context, args) // color:"", channel:"", msg:"", mode:"channel", style:"new"
{

		// Thanks @KubeRoot
	var format
	{
		var regex1 = /`[a-zA-Z]/
		var regex2 = /`/

		var ccregex = /`([a-zA-Z])([^`]+)`/g

		format = function(s, w)
		{
			var output = []
			var ccode = ""
			var ccode2 = ""

			var str = ""
			var off = 0

			var lines = s.split("\n")

			for(s of lines)
			{
				while(s.length)
				{
					var r = (ccode!="")?regex2.exec(s):regex1.exec(s)
					var i = s.lastIndexOf(" ", w-off)
					var next = s.lastIndexOf(" ", 2*w-off)

					var raws = s.replace(ccregex, "$2")
					var testi = raws.lastIndexOf(" ", w-off)
					//console.log([ccode, str, s, i, next, r])

					if(r&&(r.index<=testi||i==next&&r.index<=w-off))
					{
						ccode = (ccode=="")?r[0]:""
						str += s.substr(0, r.index) + ccode + ccode2
						ccode2 = (ccode=="")?"":"`"
						off += r.index

						s = s.substr(r.index+1+ccode2.length)
					}
					else
					{
						if(raws.length<=w-off)
						{
							output.push(str+s)
							str = ""
							break
						}

						if(off>=w)
						{
							output.push(str)
							str = ""
							off = 0
							continue
						}

						if(i==-1||next==i&&raws.length>w)
						{
							output.push(str+s.substr(0, w-off)+ccode2)
							s = s.substr(w-off)
						}
						else
						{
							output.push(str+s.substr(0, i)+ccode2)
							s = s.substr(i+1)
						}

						str = ccode
						off = 0
					}
				}
				output.push(str)
			}
			return output
		}
	}

	if(!args || !args.color || !args.msg || !args.channel || !args.style) {
		return {
			ok: false,
			msg: "Usage: universe.uchat { color:\"<color>\", channel:\"<channel>\", msg:\"<message>\", mode:\"<channel or pm>\", style:\"<style>\" }\nNote: channel can also be a user, to chats.tell them something."
		}
	}

	if(!args.mode) {
		var mode = "channel"
	} else {
		var mode = args.mode
	}

	var color = args.color;
	var message = args.msg;
	var channel = args.channel;
    var style = args.style;
	var color_code = "`T";
    var name_color = "`P";
    var name = context.caller;
    var prefix;
    var suffix;
    var message_final;

	if(color === "red") {
		color_code = "`D";
	} else if(color === "purple") {
		color_code = "`T";
	} else if(color === "yellow") {
		color_code = "`H";
	} else if(color === "blue") {
		color_code = "`R";
	} else if(color === "lightblue") {
		color_code = "`N";
	} else if(color === "green") {
		color_code = "`L"
	} else {
		return {
			ok: false,
			msg: "Invalid Color. Currently implemented colors: red, purple, yellow, blue, lightblue and green. chats.tell me if I need to add more :)"
		}
	}

    if(message == ":)") {
        message = " :)"
    }

    if(style === "new") {
        prefix = "\n\n`L" + channel + "` " + name_color + name +"` >> ";
        suffix = "\n\n";
    } else if(style == "carrot") {
		prefix = "\n\n`5          ___`\n`2    -._\``5/a888d\'aa.,_`\n`2 ------>``5@@88888dd88c~~~||--.,_ `";
		suffix = "\n`2  _.-'/``5 '8bbbbb/d''~~'''' ` "
	}

    if(style != "normal") {
        message = color_code + message + "`";
        message_final = prefix + message + suffix;
    } else if(style === "normal") {
        message = color_code + message + "`";
        message_final = message;
	} else if(style === "carrot") {
		message = format(color_code + message + "`", 40);
		for(var i = 0; i < message.length; i++) {
			message_final = message_final + message[i];
		}
		message_final = message_final + suffix;
	} else {
        return {
            ok: false,
            msg: "Invalid Style. Currently implemented styles: new and normal."
        }
    }

	if(mode === "channel") {
		#s.chats.send({channel:channel, msg:message_final});
	} else if(mode === "pm" || mode === "tell") {
		#s.chats.tell({to:channel, msg:message_final});
	}

	return {
		ok: true,
		msg: "Msg Sent"
	}

}
