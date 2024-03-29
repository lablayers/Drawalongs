//
// showdown.js -- A javascript port of Markdown.
//
// Copyright (c) 2007 John Fraser.
//
// Original Markdown Copyright (c) 2004-2005 John Gruber
//   <http://daringfireball.net/projects/markdown/>
//
// Redistributable under a BSD-style open source license.
// See license.txt for more information.
//
// The full source distribution is at:
//
//              A A L
//              T C A
//              T K B
//
//   <http://www.attacklab.net/>
//
//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//
//
// Showdown usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//
//
// Showdown namespace
//
var Showdown={extensions:{}},forEach=Showdown.forEach=function(e,t){if(typeof e.forEach=="function")e.forEach(t);else{var n,r=e.length;for(n=0;n<r;n++)t(e[n],n,e)}},stdExtName=function(e){return e.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(e){var t,n,r,i=0,s=[],o=[];if(typeof module!="undefind"&&typeof exports!="undefined"&&typeof require!="undefind"){var u=require("fs");if(u){var a=u.readdirSync((__dirname||".")+"/extensions").filter(function(e){return~e.indexOf(".js")}).map(function(e){return e.replace(/\.js$/,"")});Showdown.forEach(a,function(e){var t=stdExtName(e);Showdown.extensions[t]=require("./extensions/"+e)})}}this.makeHtml=function(e){t={};n={};r=[];e=e.replace(/~/g,"~T");e=e.replace(/\$/g,"~D");e=e.replace(/\r\n/g,"\n");e=e.replace(/\r/g,"\n");e="\n\n"+e+"\n\n";e=F(e);e=e.replace(/^[ \t]+$/mg,"");Showdown.forEach(s,function(t){e=l(t,e)});e=N(e);e=h(e);e=c(e);e=d(e);e=B(e);e=e.replace(/~D/g,"$$");e=e.replace(/~T/g,"~");Showdown.forEach(o,function(t){e=l(t,e)});return e};if(e&&e.extensions){var f=this;Showdown.forEach(e.extensions,function(e){typeof e=="string"&&(e=Showdown.extensions[stdExtName(e)]);if(typeof e!="function")throw"Extension '"+e+"' could not be loaded.  It was either not found or is not a valid extension.";Showdown.forEach(e(f),function(e){e.type?e.type==="language"||e.type==="lang"?s.push(e):(e.type==="output"||e.type==="html")&&o.push(e):o.push(e)})})}var l=function(e,t){if(e.regex){var n=new RegExp(e.regex,"g");return t.replace(n,e.replace)}if(e.filter)return e.filter(t)},c=function(e){e+="~0";e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(e,r,i,s,o){r=r.toLowerCase();t[r]=_(i);if(s)return s+o;o&&(n[r]=o.replace(/"/g,"&quot;"));return""});e=e.replace(/~0/,"");return e},h=function(e){e=e.replace(/\n/g,"\n\n");var t="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,p);e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,p);e=e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,p);e=e.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,p);e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,p);e=e.replace(/\n\n/g,"\n");return e},p=function(e,t){var n=t;n=n.replace(/\n\n/g,"\n");n=n.replace(/^\n/,"");n=n.replace(/\n+$/g,"");n="\n\n~K"+(r.push(n)-1)+"K\n\n";return n},d=function(e){e=E(e);var t=C("<hr />");e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,t);e=e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,t);e=e.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,t);e=x(e);e=T(e);e=O(e);e=h(e);e=M(e);return e},v=function(e){e=k(e);e=m(e);e=D(e);e=b(e);e=g(e);e=P(e);e=_(e);e=A(e);e=e.replace(/  +\n/g," <br />\n");return e},m=function(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");t=I(t,"\\`*_");return t});return e},g=function(e){e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,y);e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,y);e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,y);return e},y=function(e,r,i,s,o,u,a,f){f==undefined&&(f="");var l=r,c=i,h=s.toLowerCase(),p=o,d=f;if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," "));p="#"+h;if(t[h]!=undefined){p=t[h];n[h]!=undefined&&(d=n[h])}else{if(!(l.search(/\(\s*\)$/m)>-1))return l;p=""}}p=I(p,"*_");var v='<a href="'+p+'"';if(d!=""){d=d.replace(/"/g,"&quot;");d=I(d,"*_");v+=' title="'+d+'"'}v+=">"+c+"</a>";return v},b=function(e){e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,w);e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,w);return e},w=function(e,r,i,s,o,u,a,f){var l=r,c=i,h=s.toLowerCase(),p=o,d=f;d||(d="");if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," "));p="#"+h;if(t[h]==undefined)return l;p=t[h];n[h]!=undefined&&(d=n[h])}c=c.replace(/"/g,"&quot;");p=I(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';d=d.replace(/"/g,"&quot;");d=I(d,"*_");v+=' title="'+d+'"';v+=" />";return v},E=function(e){function t(e){return e.replace(/[^\w]/g,"").toLowerCase()}e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,n){return C('<h1 id="'+t(n)+'">'+v(n)+"</h1>")});e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,n){return C('<h2 id="'+t(n)+'">'+v(n)+"</h2>")});e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,n,r){var i=n.length;return C("<h"+i+' id="'+t(r)+'">'+v(r)+"</h"+i+">")});return e},S,x=function(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(i)e=e.replace(t,function(e,t,n){var r=t,i=n.search(/[*+-]/g)>-1?"ul":"ol";r=r.replace(/\n{2,}/g,"\n\n\n");var s=S(r);s=s.replace(/\s+$/,"");s="<"+i+">"+s+"</"+i+">\n";return s});else{t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;e=e.replace(t,function(e,t,n,r){var i=t,s=n,o=r.search(/[*+-]/g)>-1?"ul":"ol",s=s.replace(/\n{2,}/g,"\n\n\n"),u=S(s);u=i+"<"+o+">\n"+u+"</"+o+">\n";return u})}e=e.replace(/~0/,"");return e};S=function(e){i++;e=e.replace(/\n{2,}$/,"\n");e+="~0";e=e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(e,t,n,r,i){var s=i,o=t,u=n;if(o||s.search(/\n{2,}/)>-1)s=d(j(s));else{s=x(j(s));s=s.replace(/\n$/,"");s=v(s)}return"<li>"+s+"</li>\n"});e=e.replace(/~0/g,"");i--;return e};var T=function(e){e+="~0";e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,i=n;r=L(j(r));r=F(r);r=r.replace(/^\n+/g,"");r=r.replace(/\n+$/g,"");r="<pre><code>"+r+"\n</code></pre>";return C(r)+i});e=e.replace(/~0/,"");return e},N=function(e){e+="~0";e=e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(e,t,n){var r=t,i=n;i=L(i);i=F(i);i=i.replace(/^\n+/g,"");i=i.replace(/\n+$/g,"");i="<pre><code"+(r?' class="'+r+'"':"")+">"+i+"\n</code></pre>";return C(i)});e=e.replace(/~0/,"");return e},C=function(e){e=e.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(r.push(e)-1)+"K\n\n"},k=function(e){e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;s=s.replace(/^([ \t]*)/g,"");s=s.replace(/[ \t]*$/g,"");s=L(s);return t+"<code>"+s+"</code>"});return e},L=function(e){e=e.replace(/&/g,"&amp;");e=e.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;");e=I(e,"*_{}[]\\",!1);return e},A=function(e){e=e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>");e=e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>");return e},O=function(e){e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;n=n.replace(/^[ \t]*>[ \t]?/gm,"~0");n=n.replace(/~0/g,"");n=n.replace(/^[ \t]+$/gm,"");n=d(n);n=n.replace(/(^|\n)/g,"$1  ");n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;n=n.replace(/^  /mg,"~0");n=n.replace(/~0/g,"");return n});return C("<blockquote>\n"+n+"\n</blockquote>")});return e},M=function(e){e=e.replace(/^\n+/g,"");e=e.replace(/\n+$/g,"");var t=e.split(/\n{2,}/g),n=[],i=t.length;for(var s=0;s<i;s++){var o=t[s];if(o.search(/~K(\d+)K/g)>=0)n.push(o);else if(o.search(/\S/)>=0){o=v(o);o=o.replace(/^([ \t]*)/g,"<p>");o+="</p>";n.push(o)}}i=n.length;for(var s=0;s<i;s++)while(n[s].search(/~K(\d+)K/)>=0){var u=r[RegExp.$1];u=u.replace(/\$/g,"$$$$");n[s]=n[s].replace(/~K\d+K/,u)}return n.join("\n\n")},_=function(e){e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;");return e},D=function(e){e=e.replace(/\\(\\)/g,q);e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,q);return e},P=function(e){e=e.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>');e=e.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(e,t){return H(B(t))});return e},H=function(e){var t=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+e.charCodeAt(0).toString(16)+";"},function(e){return e}];e="mailto:"+e;e=e.replace(/./g,function(e){if(e=="@")e=t[Math.floor(Math.random()*2)](e);else if(e!=":"){var n=Math.random();e=n>.9?t[2](e):n>.45?t[1](e):t[0](e)}return e});e='<a href="'+e+'">'+e+"</a>";e=e.replace(/">.+:/g,'">');return e},B=function(e){e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)});return e},j=function(e){e=e.replace(/^(\t|[ ]{1,4})/gm,"~0");e=e.replace(/~0/g,"");return e},F=function(e){e=e.replace(/\t(?=\t)/g,"    ");e=e.replace(/\t/g,"~A~B");e=e.replace(/~B(.+?)~A/g,function(e,t,n){var r=t,i=4-r.length%4;for(var s=0;s<i;s++)r+=" ";return r});e=e.replace(/~A/g,"    ");e=e.replace(/~B/g,"");return e},I=function(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var i=new RegExp(r,"g");e=e.replace(i,q);return e},q=function(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}};typeof module!="undefined"&&(module.exports=Showdown);typeof define=="function"&&define.amd&&define("showdown",function(){return Showdown});