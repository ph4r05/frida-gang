Java.perform(function() {
  ['java.lang.StringBuilder', 'java.lang.StringBuffer'].forEach(function(clazz, i) {
    console.log('[?] ' + i + ' = ' + clazz);
    var func = 'toString';
    Java.use(clazz)[func].implementation = function() {
      var ret = this[func]();
      if (ret.indexOf('') != -1) {
        // print stacktrace if return value contains specific string
        Java.perform(function() {
          var jAndroidLog = Java.use("android.util.Log"), jException = Java.use("java.lang.Exception");
          console.log( jAndroidLog.getStackTraceString( jException.$new() ) );
        }); 
      }   
      send('[' + i + '] ' + ret);
      return ret;
    }   
  }); 
});



Java.perform(function() {
	console.log();
	let StringBuilder = Java.use('java.lang.StringBuilder');
	let StringBuffer = Java.use('java.lang.StringBuffer');

	StringBuilder.toString.overload().implementation = function() {
		let StringBuilderResult = this.toString.call(this);
		console.log("[+] StringBuilder:\t", StringBuilderResult);

		return StringBuilderResult;
	}

	StringBuffer.toString.overload().implementation = function() {
		let StringBufferResult = this.toString.call(this);
		console.log("[+] StringBuffer:\t", StringBufferResult);

		return StringBufferResult;
	}
});

// Akuvox - smart door app
Java.deoptimizeEverything()
Java.perform(function() {
	console.log();
	let aes = Java.use('com.akuvox.mobile.libcommon.utils.AESUtil');

	aes.decryptCsgate.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
		let cres = this.decryptCsgate.call(this, s1, s2);
		console.log("[+] AESUtil.decryptCsgate:\t", cres, " key: ", s2);
		return cres;
	}

  aes.encryptCsgate.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
		let cres = this.encryptCsgate.call(this, s1, s2);
		console.log("[+] AESUtil.encryptCsgate:\t", s1, " key: ", s2);
		return cres;
	}
});

// ------------------------------------------------

Java.enumerateLoadedClasses({
    onMatch: function(className) {
        if (className.startsWith("com.thingclips.smart.android.common.utils")) {
            console.log(className);
        }
    },
    onComplete: function() {}
});  


// ------------------------------------------------

Java.deoptimizeEverything()
Java.perform(function() {
	console.log();
	let lg = Java.use('com.tuya.smart.api.b');
	lg.class.a = true;
	lg.a = true;

	let lg2 = Java.use('com.tuya.smart.api.a');
	lg2.class.b = true;
	lg2.b = true;

	let lg3 = Java.use('com.tuya.smart.android.common.utils.L');
	console.log(`lg3 on: ${lg3.class.isLogOn}`);
	// lg3.class.isLogOn = true
	lg3.setLogSwitcher(true)
	console.log(`lg3 on: ${lg3.class.isLogOn} ${lg3.isLogOn} `);

	let aes = Java.use('com.tuya.sdk.hardware.bbbbppp');
	aes.bdpdqbp.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
		let cres = this.bdpdqbp.call(this, s1, s2);
		console.log("[+] bbbbppp.bdpdqbp:\ts1", s1, " s1: ", s2, 'res', cres);
		return cres;
	}
  
});



