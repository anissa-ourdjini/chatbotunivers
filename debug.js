// Simple client-side debug overlay to show errors and key states
(function(){
    function createOverlay(){
        const box = document.createElement('div');
        box.id = '__client_debug_overlay';
        box.style.position = 'fixed';
        box.style.right = '12px';
        box.style.top = '12px';
        box.style.zIndex = 99999;
        box.style.minWidth = '260px';
        box.style.maxWidth = '420px';
        box.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        box.style.fontSize = '12px';
        box.style.color = '#0b1220';
        box.style.background = 'rgba(255,255,255,0.92)';
        box.style.border = '1px solid rgba(0,0,0,0.15)';
        box.style.borderRadius = '8px';
        box.style.padding = '8px';
        box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
        box.innerHTML = '<strong>Debug client</strong><div id="__client_debug_msgs" style="margin-top:6px;line-height:1.25;max-height:240px;overflow:auto;color:#0b1220"></div>';
        const close = document.createElement('button');
        close.textContent = '×';
        close.title = 'Fermer';
        close.style.position = 'absolute';
        close.style.right = '6px';
        close.style.top = '6px';
        close.style.border = 'none';
        close.style.background = 'transparent';
        close.style.cursor = 'pointer';
        close.style.fontSize = '14px';
        close.style.lineHeight = '1';
        close.addEventListener('click', () => box.style.display = 'none');
        box.appendChild(close);
        document.body.appendChild(box);
    }

    function log(msg){
        const container = document.getElementById('__client_debug_msgs');
        if (!container) return;
        const el = document.createElement('div');
        el.style.marginBottom = '6px';
        el.textContent = `${new Date().toLocaleTimeString()} — ${msg}`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    function safeRun(){
        try {
            if (!document.body) return setTimeout(safeRun, 50);
            createOverlay();
            log('DOM ready');

            // Check important globals and elements
            log('Three.js present: ' + (typeof THREE !== 'undefined'));
            log('OrbitControls present: ' + (typeof THREE !== 'undefined' && !!THREE.OrbitControls));
            log('astronomyKnowledge present: ' + (typeof astronomyKnowledge !== 'undefined'));
            const solar = document.getElementById('solar3d');
            log('container #solar3d found: ' + !!solar + (solar ? ` (w:${solar.clientWidth}px h:${solar.clientHeight}px)` : ''));

            // capture runtime errors
            window.addEventListener('error', function(e){
                log('ERROR: ' + (e && e.message ? e.message : String(e)) + (e && e.filename ? ' @'+e.filename+':'+e.lineno : ''));
            });
            window.addEventListener('unhandledrejection', function(ev){
                log('Promise rejection: ' + (ev.reason && ev.reason.message ? ev.reason.message : JSON.stringify(ev.reason)));
            });

            // small heartbeat so user sees that the overlay is alive
            setInterval(() => {
                const tm = new Date().toLocaleTimeString();
                log('heartbeat ' + tm);
                // keep only last 20 messages
                const container = document.getElementById('__client_debug_msgs');
                if (container && container.childNodes.length > 20) {
                    while (container.childNodes.length > 20) container.removeChild(container.firstChild);
                }
            }, 8000);
        } catch (err) {
            console.warn('debug overlay failed', err);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') safeRun();
    else document.addEventListener('DOMContentLoaded', safeRun);
})();
