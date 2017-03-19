const frameModule = require("ui/frame");
const dialog = require("ui/dialogs");
const camera = require("nativescript-camera");
const imageModule = require("ui/image");
const bghttp = require("nativescript-background-http");

const obs = require("data/observable").Observable;

let page;

let str = new obs({
    name: "",
    message: ""
});

exports.setMessage = function() {
    fetch('http://surachai.rvc.ac.th/native/setMessage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: str.name,
            message: str.message
            // name: 'surachai',
            // message: 'message',
        })
    })
    .then ( res => res.json() )
    .then ( (data) => {
        if (data.success == true) {
            let obj1 = page.getViewById("name");
            let obj2 = page.getViewById("message");

            obj1.text = "";
            obj2.text = "";
            obj1.focus();
        } else {
            console.log("Error on save.");
        }
    })
    .catch( (err) => {
        console.log("error..");
    })
} //exports.setMessage

exports.getMessage = () => {
    fetch("http://surachai.rvc.ac.th/native/getMessage.php")
    .then( (r) => {
        return r.json();
    })
    .then( (r) => {
        console.dump(r);
    })
    .catch( (e) => {
        dialog.alert({
            title: "เกิดข้อผิดพลาด",
            message: "ไฟล์ json มีปัญหา !!",
            okButtonText: " OK "
        });        
    })
}

exports.load = (args) => {
    page = args.object;
    page.bindingContext = str;

  //App Settings
  //1. ประกาศตัวแปร
//   let settings = {
//       email: '',
//       remember: true,
//       color: '#000'
//   }
  //2. กำหนดค่าให้ App (ทางเลือก 1)
//   appSettings.setString('email', settings.email);
//   appSettings.setBoolean('remember', settings.remember);
//   appSettings.setString('color', settings.color);

  //2. กำหนดค่าให้ App (ทางเลือก 2)
//   appSettings.setString('settings', JSON.stringify(settings));
//   let obj = JSON.parse(appSettings.getString('settings', '{}'));
  //อ่านค่า obj.email


}

exports.goList = () => {
    const topmost = frameModule.topmost()

    //เดิม
    //topmost.navigate("views/list/list");

    //หากต้องการส่งตัวแแปรไป page ใหม่
    topmost.navigate({
        moduleName: 'views/list/list',
        context: {
            author: 'surachai visesvoharn'
        }
    })
    // return; //หากใส่ตรงนี้จะหยุดการประมวลผล
}

exports.goMap = () => {
    const topmost = frameModule.topmost()
    topmost.navigate("views/maps/maps");
}

exports.takePhoto = () => {
 let opt = {
    width: 300,
    height: 300,
    keepAspectRatio: true,
    saveToGallery: true,
  }
  camera.takePicture(opt).then((img) => {
    let photo = page.getViewById('photo')
    photo.src = img
    console.dump(img)

    var session = bghttp.session("image-upload");
 
    var request = {
        url: "http://192.168.8.103:3000/upload",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "bigpig.jpg",
            'X-code': '59010001',
            'X-name': 'XXXX',
        },
        description: "{ 'uploading': 'bigpig.jpg' }"
    };
    
    var task = session.uploadFile(img.android || img.ios, request);
    
    task.on("progress", logEvent);
    task.on("error", () => {
//      dialogs.alert({})
    });
    task.on("complete", () => {
      console.log('UPLOAD DONE')
    });
    
    function logEvent(e) {
        console.log(e.eventName);
    }


  }).catch((e) => {
    camera.requestPermissions()
    console.log('error')
  })    
}

exports.showMessage = () => {
    const topmost = frameModule.topmost()
    topmost.navigate("views/list-message/list-message");  
}

// exports.goMap = () => {
//     const topmost = frameModule.topmost()
//     topmost.navigate("views/maps/maps");
// }