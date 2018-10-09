/// jaksdjf
// fjdk
/// fjsdkalfjd

(async function(){

    // 这5个写法应该都支持
    (await import("./module")).test();
    (await import  ("./module")).test();
    (await import(  "./module")).test();
    (await import("./module"  )).test();
    import("./module").then(mod=>{
        mod.test();
    });
    // 这个是不支持的写法
    const name = "module";
    (await import("./" + name)).test();

})();