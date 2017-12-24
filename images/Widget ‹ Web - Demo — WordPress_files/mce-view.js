!function(a,b,c,d){"use strict";var e={},f={};b.mce=b.mce||{},b.mce.views={register:function(a,c){e[a]=b.mce.View.extend(_.extend(c,{type:a}))},unregister:function(a){delete e[a]},get:function(a){return e[a]},unbind:function(){_.each(f,function(a){a.unbind()})},setMarkers:function(a,b){var c,d,f=[{content:a}],g=this;return _.each(e,function(a,e){d=f.slice(),f=[],_.each(d,function(d){var h,i,j=d.content;if(d.processed)return void f.push(d);for(;j&&(h=a.prototype.match(j));)h.index&&f.push({content:j.substring(0,h.index)}),h.options.editor=b,c=g.createInstance(e,h.content,h.options),i=c.loader?".":c.text,f.push({content:c.ignore?i:'<p data-wpview-marker="'+c.encodedText+'">'+i+"</p>",processed:!0}),j=j.slice(h.index+h.content.length);j&&f.push({content:j})})}),a=_.pluck(f,"content").join(""),a.replace(/<p>\s*<p data-wpview-marker=/g,"<p data-wpview-marker=").replace(/<\/p>\s*<\/p>/g,"</p>")},createInstance:function(a,b,c,d){var e,g,h=this.get(a);return b.indexOf("[")!==-1&&b.indexOf("]")!==-1&&(b=b.replace(/\[[^\]]+\]/g,function(a){return a.replace(/[\r\n]/g,"")})),!d&&(g=this.getInstance(b))?g:(e=encodeURIComponent(b),c=_.extend(c||{},{text:b,encodedText:e}),f[e]=new h(c))},getInstance:function(a){return"string"==typeof a?f[encodeURIComponent(a)]:f[d(a).attr("data-wpview-text")]},getText:function(a){return decodeURIComponent(d(a).attr("data-wpview-text")||"")},render:function(a){_.each(f,function(b){b.render(null,a)})},update:function(a,b,c,d){var e=this.getInstance(c);e&&e.update(a,b,c,d)},edit:function(a,b){var c=this.getInstance(b);c&&c.edit&&c.edit(c.text,function(d,e){c.update(d,a,b,e)})},remove:function(a,b){var c=this.getInstance(b);c&&c.remove(a,b)}},b.mce.View=function(a){_.extend(this,a),this.initialize()},b.mce.View.extend=Backbone.View.extend,_.extend(b.mce.View.prototype,{content:null,loader:!0,initialize:function(){},getContent:function(){return this.content},render:function(a,b){null!=a&&(this.content=a),a=this.getContent(),(this.loader||a)&&(b&&this.unbind(),this.replaceMarkers(),a?this.setContent(a,function(a,b){d(b).data("rendered",!0),this.bindNode.call(this,a,b)},!!b&&null):this.setLoader())},bindNode:function(){},unbindNode:function(){},unbind:function(){this.getNodes(function(a,b){this.unbindNode.call(this,a,b)},!0)},getEditors:function(a){_.each(tinymce.editors,function(b){b.plugins.wpview&&a.call(this,b)},this)},getNodes:function(a,b){this.getEditors(function(c){var e=this;d(c.getBody()).find('[data-wpview-text="'+e.encodedText+'"]').filter(function(){var a;return null==b||(a=d(this).data("rendered")===!0,b?a:!a)}).each(function(){a.call(e,c,this,this)})})},getMarkers:function(a){this.getEditors(function(b){var c=this;d(b.getBody()).find('[data-wpview-marker="'+this.encodedText+'"]').each(function(){a.call(c,b,this)})})},replaceMarkers:function(){this.getMarkers(function(a,b){var c,e=b===a.selection.getNode();return this.loader||d(b).text()===tinymce.DOM.decode(this.text)?(c=a.$('<div class="wpview wpview-wrap" data-wpview-text="'+this.encodedText+'" data-wpview-type="'+this.type+'" contenteditable="false"></div>'),a.$(b).replaceWith(c),void(e&&setTimeout(function(){a.selection.select(c[0]),a.selection.collapse()}))):void a.dom.setAttrib(b,"data-wpview-marker",null)})},removeMarkers:function(){this.getMarkers(function(a,b){a.dom.setAttrib(b,"data-wpview-marker",null)})},setContent:function(a,b,c){_.isObject(a)&&(a.sandbox||a.head||a.body.indexOf("<script")!==-1)?this.setIframes(a.head||"",a.body,b,c):_.isString(a)&&a.indexOf("<script")!==-1?this.setIframes("",a,b,c):this.getNodes(function(c,d){a=a.body||a,a.indexOf("<iframe")!==-1&&(a+='<span class="mce-shim"></span>'),c.undoManager.transact(function(){d.innerHTML="",d.appendChild(_.isString(a)?c.dom.createFragment(a):a),c.dom.add(d,"span",{"class":"wpview-end"})}),b&&b.call(this,c,d)},c)},setIframes:function(c,e,f,g){var h=this;if(e.indexOf("[")!==-1&&e.indexOf("]")!==-1){var i=new RegExp("\\[\\/?(?:"+a.mceViewL10n.shortcodes.join("|")+")[^\\]]*?\\]","g");e=e.replace(i,function(a){return a.replace(/</g,"&lt;").replace(/>/g,"&gt;")})}this.getNodes(function(a,g){function i(){var b;r||l.contentWindow&&(b=d(l),h.iframeHeight=d(n.body).height(),b.height()!==h.iframeHeight&&(b.height(h.iframeHeight),a.nodeChanged()))}function j(){a.isHidden()||(d(g).data("rendered",null),setTimeout(function(){b.mce.views.render()}))}function k(){p=new o(_.debounce(i,100)),p.observe(n.body,{attributes:!0,childList:!0,subtree:!0})}var l,m,n,o,p,q,r,s=a.dom,t="",u=a.getBody().className||"",v=a.getDoc().getElementsByTagName("head")[0];if(tinymce.each(s.$('link[rel="stylesheet"]',v),function(a){a.href&&a.href.indexOf("skins/lightgray/content.min.css")===-1&&a.href.indexOf("skins/wordpress/wp-content.css")===-1&&(t+=s.getOuterHTML(a))}),h.iframeHeight&&s.add(g,"span",{"data-mce-bogus":1,style:{display:"block",width:"100%",height:h.iframeHeight}},"\u200b"),a.undoManager.transact(function(){g.innerHTML="",l=s.add(g,"iframe",{src:tinymce.Env.ie?'javascript:""':"",frameBorder:"0",allowTransparency:"true",scrolling:"no","class":"wpview-sandbox",style:{width:"100%",display:"block"},height:h.iframeHeight}),s.add(g,"span",{"class":"mce-shim"}),s.add(g,"span",{"class":"wpview-end"})}),l.contentWindow){if(m=l.contentWindow,n=m.document,n.open(),n.write('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+c+t+'<style>html {background: transparent;padding: 0;margin: 0;}body#wpview-iframe-sandbox {background: transparent;padding: 1px 0 !important;margin: -1px 0 0 !important;}body#wpview-iframe-sandbox:before,body#wpview-iframe-sandbox:after {display: none;content: "";}iframe {max-width: 100%;}</style></head><body id="wpview-iframe-sandbox" class="'+u+'">'+e+"</body></html>"),n.close(),h.iframeHeight&&(r=!0,setTimeout(function(){r=!1,i()},3e3)),d(m).on("load",i).on("unload",j),o=m.MutationObserver||m.WebKitMutationObserver||m.MozMutationObserver)n.body?k():n.addEventListener("DOMContentLoaded",k,!1);else for(q=1;q<6;q++)setTimeout(i,700*q);f&&f.call(h,a,g)}},g)},setLoader:function(a){this.setContent('<div class="loading-placeholder"><div class="dashicons dashicons-'+(a||"admin-media")+'"></div><div class="wpview-loading"><ins></ins></div></div>')},setError:function(a,b){this.setContent('<div class="wpview-error"><div class="dashicons dashicons-'+(b||"no")+'"></div><p>'+a+"</p></div>")},match:function(a){var b=c.next(this.type,a);if(b)return{index:b.index,content:b.content,options:{shortcode:b.shortcode}}},update:function(a,c,f,g){_.find(e,function(e,h){var i=e.prototype.match(a);if(i)return d(f).data("rendered",!1),c.dom.setAttrib(f,"data-wpview-text",encodeURIComponent(a)),b.mce.views.createInstance(h,a,i.options,g).render(),c.selection.select(f),c.nodeChanged(),c.focus(),!0})},remove:function(a,b){this.unbindNode.call(this,a,b),a.dom.remove(b),a.focus()}})}(window,window.wp,window.wp.shortcode,window.jQuery),function(a,b,c,d){function e(b){var c={};return a.tinymce?!b||b.indexOf("<")===-1&&b.indexOf(">")===-1?b:(j=j||new a.tinymce.html.Schema(c),k=k||new a.tinymce.html.DomParser(c,j),l=l||new a.tinymce.html.Serializer(c,j),l.serialize(k.parse(b,{forced_root_block:!1}))):b.replace(/<[^>]+>/g,"")}var f,g,h,i,j,k,l;f={state:[],edit:function(a,b){var d=this.type,e=c[d].edit(a);this.pausePlayers&&this.pausePlayers(),_.each(this.state,function(a){e.state(a).on("update",function(a){b(c[d].shortcode(a).string(),"gallery"===d)})}),e.on("close",function(){e.detach()}),e.open()}},g=_.extend({},f,{state:["gallery-edit"],template:c.template("editor-gallery"),initialize:function(){var a=c.gallery.attachments(this.shortcode,c.view.settings.post.id),b=this.shortcode.attrs.named,d=this;a.more().done(function(){a=a.toJSON(),_.each(a,function(a){a.sizes&&(b.size&&a.sizes[b.size]?a.thumbnail=a.sizes[b.size]:a.sizes.thumbnail?a.thumbnail=a.sizes.thumbnail:a.sizes.full&&(a.thumbnail=a.sizes.full))}),d.render(d.template({verifyHTML:e,attachments:a,columns:b.columns?parseInt(b.columns,10):c.galleryDefaults.columns}))}).fail(function(a,b){d.setError(b)})}}),h=_.extend({},f,{action:"parse-media-shortcode",initialize:function(){var a=this,b=null;this.url&&(this.loader=!1,this.shortcode=c.embed.shortcode({url:this.text})),a.editor&&(b=a.editor.iframeElement.clientWidth-20),wp.ajax.post(this.action,{post_ID:c.view.settings.post.id,type:this.shortcode.tag,shortcode:this.shortcode.string(),maxwidth:b}).done(function(b){a.render(b)}).fail(function(b){a.url?(a.ignore=!0,a.removeMarkers()):a.setError(b.message||b.statusText,"admin-media")}),this.getEditors(function(b){b.on("wpview-selected",function(){a.pausePlayers()})})},pausePlayers:function(){this.getNodes(function(a,b,c){var e=d("iframe.wpview-sandbox",c).get(0);e&&(e=e.contentWindow)&&e.mejs&&_.each(e.mejs.players,function(a){try{a.pause()}catch(b){}})})}}),i=_.extend({},h,{action:"parse-embed",edit:function(a,b){var d=c.embed.edit(a,this.url),e=this;this.pausePlayers(),d.state("embed").props.on("change:url",function(a,b){b&&a.get("url")&&(d.state("embed").metadata=a.toJSON())}),d.state("embed").on("select",function(){var a=d.state("embed").metadata;b(e.url?a.url:c.embed.shortcode(a).string())}),d.on("close",function(){d.detach()}),d.open()}}),b.register("gallery",_.extend({},g)),b.register("audio",_.extend({},h,{state:["audio-details"]})),b.register("video",_.extend({},h,{state:["video-details"]})),b.register("playlist",_.extend({},h,{state:["playlist-edit","video-playlist-edit"]})),b.register("embed",_.extend({},i)),b.register("embedURL",_.extend({},i,{match:function(a){var b=/(^|<p>)(https?:\/\/[^\s"]+?)(<\/p>\s*|$)/gi,c=b.exec(a);if(c)return{index:c.index+c[1].length,content:c[2],options:{url:!0}}}}))}(window,window.wp.mce.views,window.wp.media,window.jQuery);