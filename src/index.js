exports.errify = async function (promise) {
    try {
        const res = await promise;
        return [res, null];
    } catch (err) {
        return [null, err];
    }
}

exports.errifyAll = async function (promises) {
    const results = await Promise.allSettled(promises);
    return results.map(res =>
        res.status === "fulfilled" ? [res.value, null] : [null, res.reason]
    );
}