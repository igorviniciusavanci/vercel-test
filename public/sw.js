if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,a)=>{const c=s||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let t={};const r=s=>n(s,c),u={module:{uri:c},exports:t,require:r};e[c]=Promise.all(i.map((s=>u[s]||r(s)))).then((s=>(a(...s),t)))}}define(["./workbox-1846d813"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next//static/media/agrologo.7af95df0.png",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next//static/media/agrologoLight.6db4314f.png",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next//static/media/bg.f57fb7d2.jpg",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next//static/media/logodashbackgrounddark.40b42662.png",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next//static/media/logodashbackgroundlight.698dd154.png",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/0c428ae2-0525dacc5d00841f.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/1653-76f680bea0329794.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/1bfc9850-8e382ed40bfcc7cf.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/2130-ae0172ef2c56e8e3.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/252f366e-3f9c927ef8619402.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/2612-075a151a833c1570.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/4205-1b46e13e09ae2961.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/4231-5c5940cf6a9eab76.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/4895-34b32496db194906.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/545f34e4-ffb30c50ffb93157.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/6330-abde22f301a92c28.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/6653-a5b93e13100086ed.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/6855-7463f86e96389026.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/6999-5b5133be191fd46c.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/75fc9c18-0edeb0e157862525.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/7f0c75c1-077d40ebe71ff5ec.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/8373-3d8ed2c3ed4001f7.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/8662-29defdccc06c55f3.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/9651.fa928ee6b0abac46.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/ae51ba48-ceeac6ac1230312f.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/d64684d8-2542bceb61cb32f7.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/d7eeaac4-d35c7457e1b96e5d.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/framework-7d488969745094b0.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/main-a6e1bba9353736d9.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/_app-e2e4ac68a107b0c6.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/_error-33a2ab662331a682.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/admin-dash-f4d2376f443a4174.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/create-access-permissions-fab81e69cd955828.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/dashboard-4911428eb1b82863.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/edit-access-permissions-e91b363519e4f446.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/farm-data-b6aa8bc16ac095be.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/farm-list-d09d15a338619f97.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/farm-register-e6c6c469b6d48aba.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/farms-616d4e401a7a32c1.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/help-dash-07b95db878ee8675.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/index-e94d43b676342dea.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/maintenance-dash-16a85391529f5168.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/manufacturer-data-ef446ff595934cfc.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/manufacturer-list-b357eef4c6791489.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/manufacturer-register-e00943052733696a.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/operation-dash-cfd94898b130bf1a.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/password-edit-3cb869363cd493f8.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/password-forgot-b8b582370ebeb961.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-dash-1e4b032b5bdceb80.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-data-44850ce11991d4a6.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-group-data-e3816d80f44bfd8d.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-group-list-b5a86144a72f3563.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-group-register-8d5014f73f4b9b86.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-list-766dce1bc1ab8354.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-qrcode-ec1144ce95156f37.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/patrimony-register-aa570efa4622a9d7.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/report-dash-196bd92882892c3e.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/reset-password-66c5e2e6bd9a4ff3.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/settings-99471ff126dd7aba.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/settings-dash-c59c12ff3813d238.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/signin-471e348294e76a8e.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/user-data-83f9461cc6ae8cd8.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/user-list-b9969d25d19f5391.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/user-permissions-41bfde41de1b5e4e.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/user-register-80ab53e3ac486396.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/pages/user-register-address-d80ab28547cbb4b4.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/chunks/webpack-430c7b69a78b4766.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/duNG0p4z-qI5sn9jl5hFV/_buildManifest.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/duNG0p4z-qI5sn9jl5hFV/_middlewareManifest.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/_next/static/duNG0p4z-qI5sn9jl5hFV/_ssgManifest.js",revision:"duNG0p4z-qI5sn9jl5hFV"},{url:"/android-chrome-192x192.png",revision:"e24b5017eb923d2b5ca7e4a861ff9300"},{url:"/android-chrome-512x512.png",revision:"75354751afa22a35bf2d11eb0cb27d9b"},{url:"/apple-touch-icon.png",revision:"2ff90c6722eecf4e6238f78e565c9361"},{url:"/favicon-16x16.png",revision:"43ac22c0dcec10b28ef42d8bda8e8226"},{url:"/favicon-32x32.png",revision:"889f479a3adf5c9214551b93c423a7d0"},{url:"/favicon.ico",revision:"e1a9bad377a9d22f25e2d745195258e8"},{url:"/icons/icon-128x128.png",revision:"27eebe3f874da74a2952e3946d6c6760"},{url:"/icons/icon-144x144.png",revision:"67db8a2e80a8f3ead6aa75aad1e4734d"},{url:"/icons/icon-152x152.png",revision:"d8d2f7df1690dfb95bbc47200dd0d024"},{url:"/icons/icon-16x16.png",revision:"67ead56aa6d93ee8023792a8014486e7"},{url:"/icons/icon-192x192.png",revision:"390b1cfb54633dfaf098b3301c5b2a7a"},{url:"/icons/icon-32x32.png",revision:"8cf7efdfda2a232f312332799346002d"},{url:"/icons/icon-384x384.png",revision:"a313656f782a5b9d5a86b81506081d6a"},{url:"/icons/icon-512x512.png",revision:"a4f0e8372baab1c093b4fe9281e7a531"},{url:"/icons/icon-72x72.png",revision:"3ecf5cdb0ab721765a97614de8869717"},{url:"/icons/icon-96x96.png",revision:"c300deea1e4bc6250cbbc7156e6b47c0"},{url:"/icons/iconb-128x128.png",revision:"5791e18d3c8d1faadc454dfdf8cc4e7b"},{url:"/icons/iconb-144x144.png",revision:"a74b5c81eb4154e67efdf107fc1cbafd"},{url:"/icons/iconb-152x152.png",revision:"1e07fa27557e19bb784e325b10c3c20d"},{url:"/icons/iconb-16x16.png",revision:"a896bb706697ee0d2f4a5e805b59aa05"},{url:"/icons/iconb-192x192.png",revision:"434a1b1870f0adb37aaff26c7482bf6a"},{url:"/icons/iconb-32x32.png",revision:"00296db1eb2848b2914daa99817d2d66"},{url:"/icons/iconb-384x384.png",revision:"7ff6d289a9bf7e7ecc2c85f89445f020"},{url:"/icons/iconb-512x512.png",revision:"61623f0b25484d5facc2534e498e5058"},{url:"/icons/iconb-72x72.png",revision:"bef62544cd142589cef942142e74033b"},{url:"/icons/iconb-96x96.png",revision:"21409ed8ec6ff708190346f4390aa9b9"},{url:"/icons/splash.png",revision:"d9fe70264cc7020e7472db8be7f0525d"},{url:"/manifest.json",revision:"e6aac5a6f0781ad86ae819c8e14df67e"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:n,state:i})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
