Java.deoptimizeEverything()
Java.perform(function() {
	console.log();
    setTimeout(() => {
        let lg = Java.use('com.tuya.smart.api.b');
        lg.class.a = true;
        lg.a = true;

        let lg2 = Java.use('com.tuya.smart.api.a');
        lg2.class.b = true;
        lg2.b = true;

        let lg3 = Java.use('com.tuya.smart.android.common.utils.L');
        // console.log(`lg3 on: ${lg3.class.isLogOn}`);
        // lg3.class.isLogOn = true
        // lg3.isLogOn = true
        lg3.setLogSwitcher(true)
        // console.log(`lg3 on: ${lg3.class.isLogOn} ${lg3.isLogOn} ${JSON.stringify(lg3.isLogOn)} `);
        console.log(`Logs hooked`)

        let aes = Java.use('com.tuya.sdk.hardware.bbbbppp');
        aes.bdpdqbp.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
            let cres = this.bdpdqbp.call(this, s1, s2);
            console.log("[+] bbbbppp.bdpdqbp:\ts1", s1, " s1: ", s2, 'res', cres);
            return cres;
        }
        
    }, 1000)

    let secSt = Java.use('com.tuya.sdk.security.SecuredStore');
    secSt.getBitshiftingKey.overload().implementation = function() {
        let res = this.getBitshiftingKey.call(this);
        console.log("[+] SecuredStore.getBitshiftingKey:\t", res);
        return res
    }

    // secSt.securityUserKey.overload('java.lang.String').implementation = function(s1) {
	// 	let cres = this.securityUserKey.call(this, s1);
	// 	console.log("[+] SecuredStore.securityUserKey:\ts1", s1, ', res', cres);
	// 	return cres;
	// }

    // let secPrefs = Java.use('com.tuya.sdk.security.SecuredPreferenceStore');
    // secPrefs.getString.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
	// 	let cres = this.getString.call(this, s1, s2);
	// 	console.log("[+] SecuredPreferenceStore.getString:\ts1", s1, ', res', cres);
	// 	return cres;
	// }

    // let secPrefsEdit = Java.use('com.tuya.sdk.security.SecuredPreferenceStore$Editor');
    // secPrefsEdit.putString.overload('java.lang.String', 'java.lang.String').implementation = function(s1, s2) {
	// 	let cres = this.putString.call(this, s1, s2);
	// 	console.log("[+] SecuredPreferenceStore.putString:\ts1", s1, ', s2 ', s2, ', res', cres);
	// 	return cres;
	// }

    setTimeout(() => {
        console.log(`Hooking encrypteddb`)
        let dbHelper = Java.use('com.tuya.smart.encrypteddb.a');
        dbHelper.a.overload('java.lang.String').implementation = function(s1) {
            let cres = this.putString.call(this, s1);
            console.log("[+] encrypteddb.a:\t", s1);
            return cres;
        }

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

    // SQLCipher 
    // let netcip = Java.use('net.sqlcipher.database.SQLiteOpenHelper');
    // netcip.getWritableDatabase.overload('java.lang.String').implementation = function(s1) {
    //     let cres = this.getWritableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
	// 	return cres;
    // }
    // netcip.getWritableDatabase.overload('[C').implementation = function(s1) {
    //     let cres = this.getWritableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
	// 	return cres;
    // }
    // netcip.getWritableDatabase.overload('[B').implementation = function(s1) {
    //     let cres = this.getWritableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getWritableDatabase:\t", s1);
	// 	return cres;
    // }

    // netcip.getReadableDatabase.overload('java.lang.String').implementation = function(s1) {
    //     let cres = this.getReadableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
	// 	return cres;
    // }
    // netcip.getReadableDatabase.overload('[C').implementation = function(s1) {
    //     let cres = this.getReadableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
	// 	return cres;
    // }
    // netcip.getReadableDatabase.overload('[B').implementation = function(s1) {
    //     let cres = this.getReadableDatabase.call(this, s1);
	// 	console.log("[+] SQLiteOpenHelper.getReadableDatabase:\t", s1);
	// 	return cres;
    // }

});
