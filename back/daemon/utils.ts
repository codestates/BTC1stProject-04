export async function sleep(ms: number) {
    return new Promise(function(reslove, reject) {
        setTimeout(reslove, ms);
    });
}
