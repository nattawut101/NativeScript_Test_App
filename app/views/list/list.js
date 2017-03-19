const observableModule = require("data/observable")
const ObservableArray = require("data/observable-array").ObservableArray;
const moment = require("moment");

let page;

var context = new observableModule.fromObject({
    // today: moment().date()
    next30day: moment().add(30, 'days').format('DD MMMM YYYY'),
    author: '',
    list: new ObservableArray([
        { name: 'book', qty: 2},
        { name: 'pen', qty: 3},
        { name: 'pencil', qty: 5},
        { name: 'mouse', qty: 50},
        { name: 'RAM', qty: 7}
    ])
});

exports.pageLoad = (args) => {
    page = args.object
    page.bindingContext = context;
    // setTimeout( () => {
        //เพิ่มรายการลงใน list
        // context.list.push({name: 'PC', qty: 20});

        //เปลี่ยนค่าในแถวแรก
        //context.list.setItem(0, {name: 'gold', qty: 10});
    // }, 5000);
}

exports.navigatingTo = (args) => {
    let page = args.object;
    var data = page.navigationContext;
    console.log("....nagigationTo....");
    console.dump(data);
}