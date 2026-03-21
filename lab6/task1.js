/**
 * REPOSITORY SIMULATOR
 */
const Repository = (function () {
    const _db = {
        'app-root': { id: 'app-root', size: 100, content: '111', deps: ['auth-mod', 'ui-lib'] },
        'auth-mod': { id: 'auth-mod', size: 50, content: '222', deps: ['crypto-utils'] },
        'ui-lib': { id: 'ui-lib', size: 200, content: '333', deps: ['icon-set', 'canvas-api'] },
        'crypto-utils': { id: 'crypto-utils', size: 30, content: '444', deps: ['wasm-core'] },
        'canvas-api': { id: 'canvas-api', size: 80, content: '555', deps: ['wasm-core'] },
        'icon-set': { id: 'icon-set', size: 20, content: '666', deps: [] },
        'wasm-core': { id: 'wasm-core', size: 500, content: '777', deps: [] },
    };

    return {
        getScriptInfo: (id) => new Promise((resolve, reject) => {
            console.log(`API Request: ${id}`);
            const isServerDown = Math.random() < 0.01;
            setTimeout(() => {
                if (isServerDown) return reject(new Error('Server is unavailable'));
                _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
            }, 1000 + Math.random() * 3000);
        })
    };
})();


/**
 * TASK: Implement getBuildSize
 * Goal: Calculate the total build size for a given script ID.
 */
/**
 * TASK 1: Implement getBuildSize
 * Goal: Calculate the total build size for a given script ID.
 */
async function getBuildSize(scriptId) {
    const visited = new Set();
    let totalSize = 0;
    async function fetchScript(id) {
        if (visited.has(id)) return;
        visited.add(id);
        let info;
        while (true) {
            try {
                info = await Repository.getScriptInfo(id);
                break;
            } catch (error) {
                if (error.message !== 'Server is unavailable') throw error;
            }
        }
        totalSize += info.size;
        await Promise.all(info.deps.map(dep => fetchScript(dep)));
    }
    await fetchScript(scriptId);
    return totalSize;
}

/**
 * TEST RUNNER
 */
async function runTest() {
    const EXPECTED_SIZE = 980;
    const START_TIME = Date.now();

    console.log("Starting calculation for 'app-root'...");

    try {
        const result = await getBuildSize('app-root');
        const duration = ((Date.now() - START_TIME) / 1000).toFixed(2);

        console.log("\n--- TEST RESULTS ---");
        console.log(`Result: ${result}kb`);
        console.log(`Duration: ${duration}s`);

        if (result === EXPECTED_SIZE) {
            console.log("PASS");
        } else if (result === 1480) {
            console.log("SEMI-PASS");
        } else {
            console.log(`FAIL: Expected ${EXPECTED_SIZE}kb but got ${result}kb.`);
        }

    } catch (e) {
        console.error(`\nTEST CRASHED: ${e.message}`);
    }
}

runTest();