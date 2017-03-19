const camera = require("nativescript-camera");
const imageModule = require("ui/image");
const bghttp = require("nativescript-background-http");

exports.pageLoaded = (args) => {
    page = args.object;
    //page.bindingContext = pageData;
}

exports.goCamera = () => {
    let options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: true };
    camera.takePicture(options).then((img) => {
        let photo = page.getViewById("pic");
        photo.src = img;
        //Dump เพื่อดูข้อมูล
        //console.dump(img);
        
        var session = bghttp.session("image-upload");
        
        var request = {
            url: "http://192.168.8.103:3000/upload",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": "bigpig.jpg",
                "X-Surachai": "Visesvoharn"
            },
            description: "{ 'uploading': 'bigpig.jpg' }"
        };

        //เปลี่ยนตาม platform (img.android, img.ios)
        var task = session.uploadFile(img.android, request);
        
        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);
        
        function logEvent(e) {
            console.log(e.eventName);
        }

    }).catch((e)=>{
        camera.requestPermissions(); //ขอ Permissions
        console.dump("Error");
        console.dump(e.message);
    })
}