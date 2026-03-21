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

async function loadScripts(ids) {
    const visited = new Set();
    const loadedScripts = [];
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
        loadedScripts.push({ id: info.id, content: info.content });
        await Promise.all(info.deps.map(dep => fetchScript(dep)));
    }

    await Promise.all(ids.map(id => fetchScript(id)));

    return loadedScripts;
}


async function runTestTask() {
    const START_TIME = Date.now();
    console.log("Starting script load for 'app-root'...");

    try {
        const result = await loadScripts(['app-root']);
        const duration = ((Date.now() - START_TIME) / 1000).toFixed(2);

        console.log("\nTEST RESULTS");
        console.log(`Duration: ${duration}s`);
        console.log(`Total scripts loaded: ${result.length}`);

        if (result.length === 7) {
            console.log("PASS: All scripts loaded.");
            console.log("\nFinal Array Output:");
            console.log(result);
        } else {
            console.log(`FAIL: Expected 7 scripts, got ${result.length}`);
        }

    } catch (e) {
        console.error(`\nTEST CRASHED: ${e.message}`);
    }
}

runTestTask();