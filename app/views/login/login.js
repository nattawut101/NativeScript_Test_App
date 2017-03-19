const frameModule = require("ui/frame");
const Observ = require("data/observable").Observable;
const http = require("http");

let page;
let user = new Observ({
    email: "",
    pwd: ""
});

exports.loaded = (args) => {
    page = args.object;
    page.bindingContext = user;
}

exports.signIn = () => {
    // http://192.168.40.132/native/

    fetch("http://surachai.rvc.ac.th/native/")
    .then( r => r.json())
    .then( (r) => {
        console.dump(r);
    }).catch( e => {
        console.log("Error.");
    });
    console.log("...TAP...");
}

exports.signUp = () => {
    let topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
}
