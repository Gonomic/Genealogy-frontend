import { analyzeAndValidateNgModules } from '@angular/compiler';

export const SYNOSSO = (function() {
    function g() {
        return (Math.random() + 1).toString(36).substring(2);
    }

    const n = 'Parameter is missing, need to pass an object.';
    const u = ' is missing, it is a required key.';
    const j = window.document;
    // const i = window.encodeURIComponent;
    // const i = window.encodeURIComponent;
    const i = encodeURIComponent;
    let d;
    let z;
    let E;
    let o = false;
    let f;
    const A = g();
    const x = g();
    let D;
    let l = '';
    let m = '';
    if (i) {}

    function e() {
        const G = navigator.userAgent;
        let F, H = G.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(H[1])) {
            F = /\brv[ :]+(\d+)/g.exec(G) || [];
            return { name: 'MSIE', version: (F[1] || '') };
        }
        if (H[1] === 'Chrome') {
            F = G.match(/\bOPR\/(\d+)/);
            if (F !== null && undefined !== F) {
                return { name: 'Opera', version: F[1] };
            }
        }

        H = H[2] ? [H[1], H[2]] : [navigator.appName, navigator.appVersion, '-?'];
        F = G.match(/version\/(\d+)/i);
        if (null !== F && undefined !== F) {
            H.splice(1, 1, F[1]);
        }
        return { name: H[0], version: H[1] };
    }

    const C = e();

    let p;

    if ('Safari' === C.name) {
        p = 460;
    } else {
        p = 420;
    }

    const c = 500;

    const q = (function() {
        if ('MSIE' === C.name || !window.postMessage || !window.addEventListener) {
            return function(I, H) {
                let G = 20;
                const F = setInterval(function() {
                    G--;
                    a(I, G, F, H);
                }, 50);
            };
        } else {
            return function(G, F) {
                window.addEventListener('message', k(G, F));
            };
        }
    }());

    function w(G, H) {
        const F = G[H];
        if (!F) {
            o = true;
            f = H + u;
        }
        return F;
    }

    function y(G) {
        o = false;
        if (!G) {
            console.log(n);
            return false;
        }

        d = w(G, 'oauthserver_url');

        z = w(G, 'app_id');

        E = w(G, 'redirect_uri');

        E = E.split('#')[0];

        E = encodeURIComponent(E);

        D = w(G, 'callback');

        if (o) {
            console.log(f);
            return false;
        }

        if (G.hasOwnProperty('domain_name')) {
            l = G.domain_name;
        }

        if (G.hasOwnProperty('ldap_baseDN')) {
            m = G.ldap_baseDN;
        }

        const F = document.getElementById('syno-sso-login-button');

        if (undefined !== F && null !== F) {
            let I = new HTMLHeadElement;
            I = I || document.getElementsByTagName('head')[0];
            if (!I) {
                console.log('There is no <head> tag in this page.synoSSO.js need <head> tag to work properly.');
                return false;
            }
            const H = document.createElement('link');
            H.rel = 'stylesheet';
            H.type = 'text/css';
            H.href = d + '/webman/sso/synoSSO-1.0.0.css';
            H.media = 'all';
            I.appendChild(H);
            F.addEventListener('click', r);
        }

        b();
        return true;
    }

    function B(G) {
        if (G) {
            D = G;
        }
        const F = d + '/webman/sso/SSOOauth.cgi?scope=user_id&redirect_uri=' + E + '&inframe_id=' + x + '&synossoJSSDK=true&app_id=' + z + '&method=logout';
        t(D, F, false);
    }

    function r() {
        const G = function(I) {
            const J = s(I);
            delete J.state;
            if ('success' === J.status) {
                b();
            } else {
                D(J);
            }
        };
        const H = g();
        const F = d + '/webman/sso/SSOOauth.cgi?scope=user_id&redirect_uri=' + E + '&inframe_id=' + x + '&synossoJSSDK=true&app_id=' + z + '&state=' + H;
        t(G, F, true);
    }

    function t(K, F, G) {
        if (G) {
            const J = (screen.width / 2) - c / 2;
            const I = (screen.height / 2) - p / 2;
            const H = window.open(F, 'SSO', 'width=' + c + ',height=' + p + ',left=' + J + ',top=' + I);
            q(K, H);
        } else {
            const J = (screen.width / 2) - c / 2; // 6-6-20 Added
            const I = (screen.height / 2) - p / 2; // 6-6-20 Added
            const H = window.open(F, 'SSO', 'width=' + c + ',height=' + p + ',left=' + J + ',top=' + I); // 6-6-20 Added
            q(K, H); // 6-6-20 Added H
            h(F);
        }
    }

    function b() {
        const H = g();
        let F = d + '/webman/sso/SSOOauth.cgi?app_id=' + z + '&scope=user_id&redirect_uri=' + E + '&synossoJSSDK=true&synossoJSSDKQuery=true&state=' + H + '&inframe_id=' + x;
        if ('' !== l) {
            F = F + '&domain_name=' + l;
        } else {
            if ('' !== m) {
                F = F + '&ldap_baseDN=' + m;
            }
        }
        const G = (function() {
            const I = H;
            return function(J) {
                const K = s(J);
                if (K.state !== I) {
                    D({ status: 'state_error' });
                    return;
                }
                D(K);
            };
        }());
        t(G, F, false);
    }

    function a(L, J, F, I) {
        let K, H;
        if (0 === J && (undefined === I || null === I)) {
            clearInterval(F);
            L('status=unknown_error');
            return;
        }
        try {
            if (undefined !== I && null !== I) {
                K = I.frames[x];
            } else {
                H = j.getElementById(A);
                K = H.contentWindow.frames[x];
            }
        } catch (G) {
            console.log('error 1');
            return;
        }

        if (undefined !== K || null !== K) {
            let M = '';
            try {
                M = K.location.hash;
            } catch (G) {
                console.log('error 2');
                return;
            }

            clearInterval(F);

            if (undefined !== I && null !== I) {
                I.close();
            } else {
                v();
            }

            L(M.substring(1));
        }
    }

    function k(G, F) {
        const H = function(I) {
            window.removeEventListener('message', H);
            if (d !== I.origin) {
                return;
            }

            const J = I.data.substring(I.data.indexOf('#')).substring(1);

            if (undefined !== F && null !== F) {
                F.close();
            } else {
                v();
            }

            G(J);

        };

        return H;
    }

    function h(G) {
        const F = j.createElement('iframe');
        F.style.display = 'none';
        F.src = G;
        F.id = A;
        j.body.appendChild(F);
    }

    function v() {
        const F = j.getElementById(A);
        F.parentNode.removeChild(F);
    }

    function s(I) {
        const J = <any>{};
        const H = I.split('&');
        for (let G = 0; G < H.length; G++) {
            const F = H[G].split('=');
            J[F[0]] = F[1];
        }
        return J;
    }

    return { init: y, login: r, logout: B };
}());
