!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).app=e()}(this,(function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode&&t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let i;function l(t){i=t}const d=[],p=[];let h=[];const $=[],g=Promise.resolve();let m=!1;function y(t){h.push(t)}const b=new Set;let _=0;function x(){if(0!==_)return;const t=i;do{try{for(;_<d.length;){const t=d[_];_++,l(t),w(t.$$)}}catch(t){throw d.length=0,_=0,t}for(l(null),d.length=0,_=0;p.length;)p.pop()();for(let t=0;t<h.length;t+=1){const e=h[t];b.has(e)||(b.add(e),e())}h.length=0}while(d.length);for(;$.length;)$.pop()();m=!1,b.clear(),l(t)}function w(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(y)}}const k=new Set;let v;function E(t,e){t&&t.i&&(k.delete(t),t.i(e))}function j(t,n,c,u){const{fragment:s,after_update:a}=t.$$;s&&s.m(n,c),u||y((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(y)}function A(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];h.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),h=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function O(t,e){-1===t.$$.dirty[0]&&(d.push(t),m||(m=!0,g.then(x)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(e,r,c,u,a,f,d,p=[-1]){const h=i;l(e);const $=e.$$={fragment:null,ctx:[],props:f,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(h?h.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:r.target||h.$$.root};d&&d($.root);let g=!1;if($.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return $.ctx&&a($.ctx[t],$.ctx[t]=r)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](r),g&&O(e,t)),n})):[],$.update(),g=!0,o($.before_update),$.fragment=!!u&&u($.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);$.fragment&&$.fragment.l(t),t.forEach(s)}else $.fragment&&$.fragment.c();r.intro&&E(e.$$.fragment),j(e,r.target,r.anchor,r.customElement),x()}l(h)}class C{$destroy(){A(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function N(e){let n,o;return{c(){n=a("div"),o=a("p"),o.textContent="Frontend canister ID: rrkah-fqaaa-aaaaa-aaaaq-cai",f(o,"class","svelte-6whg0e"),f(n,"class","svelte-6whg0e")},m(t,e){u(t,n,e),function(t,e){t.appendChild(e)}(n,o)},p:t,i:t,o:t,d(t){t&&s(n)}}}class S extends C{constructor(t){super(),q(this,t,null,N,c,{})}}function T(e){let n,o,r;return o=new S({}),{c(){var t;n=a("main"),(t=o.$$.fragment)&&t.c(),f(n,"class","svelte-dbp6we")},m(t,e){u(t,n,e),j(o,n,null),r=!0},p:t,i(t){r||(E(o.$$.fragment,t),r=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(k.has(t))return;k.add(t),v.c.push((()=>{k.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}(o.$$.fragment,t),r=!1},d(t){t&&s(n),A(o)}}}return new class extends C{constructor(t){super(),q(this,t,null,T,c,{})}}({target:document.body})}));
//# sourceMappingURL=build.js.map
