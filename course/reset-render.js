/* The reference server emits nested links. Rebuild its compiled public UI on
 * the client rather than hydrating browser-repaired markup. */
if(window.__NUXT__){window.__NUXT__.serverRendered=false;if(window.__COURSE_ARTICLE_ROUTE__)window.__NUXT__.data=[{TDK:{title:document.title,meta:[]}}];const root=document.getElementById('__nuxt');if(root){root.removeAttribute('data-server-rendered');root.innerHTML='';}}
