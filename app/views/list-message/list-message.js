const observableModule = require("data/observable")
const obsArray = require("data/observable-array").ObservableArray;

let page;
exports.pageLoad = (args) => {
    fetch("http://surachai.rvc.ac.th/native/getMessage.php")
        .then( (r) => {
            return r.json();
        })
        .then( (r) => {
            //console.dump(r);
            //let num = Object.keys(r).length;
            var context = new observableModule.fromObject({
                list: new obsArray(r)
            });
            page = args.object
            page.bindingContext = context;
        })   
}
