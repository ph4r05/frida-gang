// Crashes app, maybe memory problem
Java.deoptimizeEverything()


Java.perform(function() {
    setTimeout(() => {
        let jLog = Java.use("android.util.Log");
        let lg3 = Java.use('com.thingclips.smart.android.common.utils.L');
        // console.log(`lg3 on: ${lg3.class.isLogOn}`);
        lg3.class.isLogOn = true;
        lg3.isLogOn = true;
        lg3.setLogSwitcher(true);
        console.log(`Logs hooked ${lg3.getLogStatus()}`);
        
        ['d', 'e', 'i', 'v', 'w', 'logInLocal', 'log2', 'logJson', 'mqtt'].forEach(function(fnc, i) {
            console.log(`Hooking 2string ${i}:${fnc}`);
            lg3[fnc].overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
                let rstr = `${fnc}: ${s1} ${s2}`
                // console.log(` - ${rstr}`)
                jLog.i(`tuya-log:${fnc}:${s1}`, s2);
                let cres = this[fnc].call(this, s1, s2);
                return cres;
            }
        });

        ['d', 'e', 'i', 'w'].forEach(function(fnc, i) {
            console.log(`Hooking 3string ${i}:${fnc}`);
            lg3[fnc].overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function(s1, s2, s3) {
                let rstr = `${fnc}: ${s1} ${s2} ${s3}`;
                // console.log(` - ${rstr}`)
                jLog.i(`tuya-log:${fnc}:${s1}`, s2, s3);
                let cres = this[fnc].call(this, s1, s2, s3);
                return cres;
            }
        });

        lg3.logServer.overload('java.lang.String', 'java.lang.Object').implementation = function(s1, s2){
            console.log(` - ${logServer}: ${s1} ${s2}`);
            let cres = this.logServer.call(this, s1, s2);
            jLog.i(`tuya-log:logServer:${s1}`, s2);
            return cres;
        }
        console.log('Logs hooked');
    }, 1000)
})

Java.perform(function() {
    setTimeout(() => {
        let jLog = Java.use("android.util.Log");
        let aesUtil = Java.use("com.thingclips.smart.android.common.utils.AESUtil");
        aesUtil.decrypt.overload('[B').implementation = function(s1) { 
            let cres = this.decrypt.call(this, s1);
            let rstr = `[+] decrypt: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.decrypt.overload('java.lang.String').implementation = function(s1) { 
            let cres = this.decrypt.call(this, s1);
            let rstr = `[+] decrypt: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.decryptWithBase64.overload('java.lang.String').implementation = function(s1) { 
            let cres = this.decryptWithBase64.call(this, s1);
            let rstr = `[+] decrypt: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.decryptWithBytes.overload('[B').implementation = function(s1) { 
            let cres = this.decryptWithBytes.call(this, s1);
            let rstr = `[+] decrypt: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.encrypt.overload('java.lang.String').implementation = function(s1) { 
            let cres = this.encrypt.call(this, s1);
            let rstr = `[+] encrypt: ${s1}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.encryptWithBase64.overload('java.lang.String').implementation = function(s1) { 
            let cres = this.encryptWithBase64.call(this, s1);
            let rstr = `[+] encrypt: ${s1}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }
        aesUtil.encryptWithBytes.overload('java.lang.String').implementation = function(s1) { 
            let cres = this.encryptWithBytes.call(this, s1);
            let rstr = `[+] encrypt: ${s1}`;
            console.log(rstr);
            jLog.i('tuya-enc', rstr);
            return cres
        }

        // let aes = Java.use('com.tuya.sdk.hardware.bbbbppp');
        // aes.bdpdqbp.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
        //     let cres = this.bdpdqbp.call(this, s1, s2);
        //     console.log("[+] bbbbppp.bdpdqbp:\ts1", s1, " s1: ", s2, 'res', cres);
        //     return cres;
        // }
        console.log('Enc hooked')
    }, 1000)
})

Java.perform(function() {
    setTimeout(() => {
        let jLog = Java.use("android.util.Log");
        let rb = Java.use("com.thingclips.smart.android.network.request.OKHttpBusinessRequest");
        let reqs = Java.use("com.thingclips.smart.android.network.Business");
        reqs.asyncRequest.overload('com.thingclips.smart.android.network.ThingApiParams', 'java.lang.Class', 'java.lang.String', 'com.thingclips.smart.android.network.Business$ResultListener').implementation = function(s1, s2, s3, s4) {
            let cres = this.asyncRequest.call(this, s1, s2, s3, s4);
            let rstr = `[+] req: ${s1}, ${s1.getUrlParams()}, ${s2}, ${s3}, ${s4}, ${cres}, log: ${rb.businessLog(s1)}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return cres;
        }

        let rtask = Java.use("com.thingclips.smart.android.network.Business$RequestTask")
        rtask.onSuccessResult.overload('com.thingclips.smart.android.network.http.BusinessResponse').implementation = function(s1) {
            let cres = this.onSuccessResult.call(this, s1);
            let rstr = `[+] onSuccessResult: ${s1}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return cres;
        }
        
        rb.newOKHttpRequest.overload('com.thingclips.smart.android.network.ThingApiParams', 'java.util.Map', 'java.lang.String').implementation = function(s1, s2, s3) {
            let cres = this.newOKHttpRequest.call(this, s1, s2, s3);
            let rstr = `[+] req: ${s1}, ${s2}, ${s3}, ${cres}, log: ${rb.businessLog(s1)}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return cres;
        }

        let bresp = Java.use("com.thingclips.smart.android.network.http.BusinessResponse");
        bresp.Builder.overload('[B').implementation = function(s1) {
            let r = this.Builder.call(this, s1);
            let rstr = `[+] bresp: ${r}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return r;
        }

        let ph = Java.use("com.thingclips.smart.android.network.util.ParseHelper");
        ph.parser.overload('com.thingclips.smart.android.network.http.BusinessResponse').implementation = function(s1) {
            let r = this.parser.call(this, s1);
            let rstr = `[+] parser: ${r}, ${s1}, ${s1.api}, ${s1.result}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return r;
        }
        ph.parser.overload('com.thingclips.smart.android.network.http.BusinessResponse', 'java.lang.Class').implementation = function(s1, s2) {
            let r = this.parser.call(this, s1, s2);
            let rstr = `[+] parser: ${r}, ${s1}, ${s1.api}, ${s1.result}, ${s2}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return r;
        }
        ph.parser.overload('com.thingclips.smart.android.network.http.BusinessResponse', 'java.lang.Class', 'java.lang.String').implementation = function(s1, s2, s3) {
            let r = this.parser.call(this, s1, s2, s3);
            let rstr = `[+] parser: ${r}, ${s1}, ${s1.getApi()}, ${s1.getResult()}, ${s2}, ${s3}`;
            console.log(rstr);
            jLog.i('tuya-net', rstr);
            return r;
        }
        console.log('Network hooked');
    }, 1000)
})


Java.perform(function() {
    setTimeout(() => {
        let jLog = Java.use("android.util.Log");
        let secSt = Java.use('com.thingclips.sdk.security.SecuredStore');
        secSt.getBitshiftingKey.overload().implementation = function() {
            let res = this.getBitshiftingKey.call(this);
            let rstr = `"[+] SecuredStore.getBitshiftingKey:\t${res}`;
            console.log(rstr);
            jLog.i('tuya-storage:ss', rstr);
            // console.log("[+] SecuredStore.getBitshiftingKey:\t", res);
            return res
        }
        secSt.securityUserKey.overload('java.lang.String').implementation = function(s1) {
            let cres = this.securityUserKey.call(this, s1);
            let rstr = `"[+] SecuredStore.securityUserKey:\t${s1}, res: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-storage:ss', rstr);
            // console.log("[+] SecuredStore.securityUserKey:\ts1", s1, ', cres', cres);
            return cres;
        }
    
        let secPrefs = Java.use('com.thingclips.sdk.security.SecuredPreferenceStore');
        secPrefs.getString.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
            let cres = this.getString.call(this, s1, s2);
            let rstr = `[+] SecuredPreferenceStore.getString:\t${s1}, res: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-storage:ss', rstr);
            // console.log("[+] SecuredPreferenceStore.getString:\ts1", s1, ', cres', cres);
            return cres;
        }
    
        let secPrefsEdit = Java.use('com.thingclips.sdk.security.SecuredPreferenceStore$Editor');
        secPrefsEdit.putString.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
            let cres = this.putString.call(this, s1, s2);
            let rstr = `[+] SecuredPreferenceStore.putString:\t${s1}, ${s2}, res: ${cres}`;
            console.log(rstr);
            jLog.i('tuya-storage:ss', rstr);
            // console.log("[+] SecuredPreferenceStore.putString:\ts1", s1, ', s2 ', s2, ', cres', cres);
            return cres;
        }
        console.log('Storage hooked')
    }, 100)
})

Java.perform(function() {
    setTimeout(() => {
        // SQLCipher 
        let jLog = Java.use("android.util.Log");
        let netcip = Java.use('net.sqlcipher.database.SQLiteOpenHelper');
        netcip.getWritableDatabase.overload('java.lang.String').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getWritableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
            let cres = this.getWritableDatabase.call(this, s1);
            return cres;
        }
        netcip.getWritableDatabase.overload('[C').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getWritableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
            let cres = this.getWritableDatabase.call(this, s1);
            return cres;
        }
        netcip.getWritableDatabase.overload('[B').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getWritableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
            let cres = this.getWritableDatabase.call(this, s1);
            return cres;
        }

        netcip.getReadableDatabase.overload('java.lang.String').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getReadableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
            let cres = this.getReadableDatabase.call(this, s1);
            return cres;
        }
        netcip.getReadableDatabase.overload('[C').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getReadableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
            let cres = this.getReadableDatabase.call(this, s1);
            return cres;
        }
        netcip.getReadableDatabase.overload('[B').implementation = function(s1) {
            let rstr = `[+] SQLiteOpenHelper.getReadableDatabase:\t${s1}`;
            console.log(rstr);
            jLog.i('tuya-db', rstr);
            // console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
            let cres = this.getReadableDatabase.call(this, s1);
            return cres;
        }
        console.log('SQLCipher hooked');
    }, 1000)
});

// --------------------------------------------------------------------------------

Java.perform(function() {
    let jLog = Java.use("android.util.Log");
    let str = Java.use('java.lang.String')
    let rtest = str.$new('test')
    console.log(`TESTSTR ${rtest} ${JSON.stringify(rtest)} ${rtest.contains(str.$new('test'))}`)
    jLog.e('TTTTTTTTTTTTT', rtest)
})

Java.perform(function() {
    let jLog = Java.use("android.util.Log");
	let StringBuilder = Java.use('java.lang.StringBuilder');
	let StringBuffer = Java.use('java.lang.StringBuffer');

	StringBuilder.toString.overload().implementation = function() {
		let r = this.toString.call(this);
		// console.log("[+] StringBuilder:\t", r);
        if (r.length >= 40 && (r.includes('{"') || r.includes('http'))){
            jLog.d('tuya-str-build1', r);
        }
		return r;
	}

	// StringBuffer.toString.overload().implementation = function() {
	// 	let r = this.toString.call(this);
	// 	//console.log("[+] StringBuffer:\t", r);
    //     if (r.length >= 40 && r.includes('{"'))
    //         jLog.d('tuya-str-buff', r);
	// 	return r;
	// }
});

Java.perform(function() {
    setTimeout(() => {
        console.log(`Hooking encrypteddb`)
        // let dbHelper = Java.use('com.tuya.smart.encrypteddb.a');
        // dbHelper.a.overload('java.lang.String').implementation = function(s1) {
        //     let cres = this.putString.call(this, s1);
        //     console.log("[+] encrypteddb.a:\t", s1);
        //     return cres;
        // }

        // // MQTT store
        // let mqtti = Java.use('com.tuya.sdk.mqtt.dppdpbd$bdpdqbp');
        // mqtti.next.overload().implementation = function() {
        //     let cres = this.next.call(this);
        //     console.log("[+] mqtt.next():\t", cres);
        //     return cres;
        // }

        // let mqtt = Java.use('com.tuya.sdk.mqtt.dppdpbd');
        // mqtt.bdpdqbp.overload('java.lang.String', 'java.lang.String', 'com.tuya.smart.mqttclient.mqttv3.MqttMessage').implementation = function(s1, s2, s3) {
        //     let cres = this.bdpdqbp.call(this, s1, s2, s3);
        //     console.log(`[+] mqtt.insert(${s1}, ${s2}, ${s3})`, cres);
        //     return cres;
        // }    
	}, 1000)
})








