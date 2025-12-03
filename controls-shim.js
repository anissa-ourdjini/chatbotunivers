// Ensure OrbitControls is available on window in a variety of bundling scenarios
(function(){
    try {
        if (typeof window !== 'undefined' && typeof THREE !== 'undefined') {
            // prefer existing global
            if (!window.OrbitControls) {
                if (THREE.OrbitControls) window.OrbitControls = THREE.OrbitControls;
                else if (THREE.OrbitControls && THREE.OrbitControls.default) window.OrbitControls = THREE.OrbitControls.default;
            }
        }
    } catch (e) {
        console.warn('controls-shim failed', e);
    }
})();
