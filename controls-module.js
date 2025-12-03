// Load the ES module version of OrbitControls and expose it on window for legacy code
(async function(){
    try {
        const module = await import('https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js');
        if (module && (module.OrbitControls || module.default)) {
            window.OrbitControls = module.OrbitControls || module.default;
            console.log('controls-module: OrbitControls loaded');
        } else {
            console.warn('controls-module: OrbitControls not found in module');
        }
    } catch (e) {
        console.warn('controls-module failed to import OrbitControls:', e);
    }
})();
