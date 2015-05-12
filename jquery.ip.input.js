function ip_isNumerical(keyCode)
{
	return (keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57)
}
jQuery.fn.extend({

	formatIP: function () {
		this.attr('autocomplete', 'off');
		var octet = 0;
		this.on('input', function(e) {
			var octets = this.value.split('.');
			var lastOctet = octets[octets.length - 1];

			if(octets.length < 4 && lastOctet.length == 3)
			{
				octet++;
				var output = this.value + "."
				this.value = output;
			}
			if(lastOctet.length > 3)
			{
				octets[octets.length-1] = lastOctet.substring(0,3);
				this.value = octets.join('.');
				return;
			}
		});
		
		this.on('keydown', function(e) {
			  var keyCode = e.keyCode || e.which;
			  var octets = this.value.split('.');
			  if(keyCode == 8) { //backspace
			  	if(this.value.slice(-1) == ".")
			  		this.value = this.value.substring(0, this.value.length -1);
			  	return;
			  }
			  else if(keyCode == 110) { //dot
			  	if(octets[octets.length - 1].length == 0)
			  		e.preventDefault();
			  }
			  else if (keyCode == 9) { //tab
			    if(octets.length != 4) {
			    	this.value = this.value + ".";
			    	e.preventDefault();
			    }
			  }
			  else if(ip_isNumerical(e.keyCode)) {}
			  else {
			  	e.preventDefault();
			  	return;
			  }
		});
	}
});