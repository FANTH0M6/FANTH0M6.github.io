/* Course adapter: copied public UI never transmits to official business APIs. */
(()=>{
  const referenceAliases={'/esgreport':'/esg/','/transport':'/freight/','/unroute/map':'/network/'};
  const referenceAlias=referenceAliases[location.pathname.replace(/\/$/,'')];if(referenceAlias)location.replace(referenceAlias+location.search+location.hash);
  const legacy={services:'/express/',solutions:'/consumerGoods',about:'/profile/',contact:'/contactUs',green:'/green',network:'/network',news:'/news/list',login:'/profile/',express:'/express/',freight:'/freight/',supplyChain:'/supplyChain/',bulky:'/bulky/',coldChain:'/coldChain/',crossBorder:'/crossBorder/'};
  const old=location.hash.match(/^#\/([a-zA-Z]+)$/);if(old&&legacy[old[1]])location.replace(legacy[old[1]]);
  const oldArticle=location.pathname.match(/^\/news\/(\d+)\/(content\d+)\/?$/);if(oldArticle)location.replace('/news/'+oldArticle[1]+'-'+oldArticle[2]+'/');
  const nativeFetch=window.fetch.bind(window);
  const publicFile=url=>{try{const u=new URL(url,location.href);return u.origin===location.origin&&(/\.(js|css|json|png|jpe?g|svg|gif|webp|woff2?|ttf|ico|pdf|mp4|mp3)(\?|$)/i.test(u.pathname)||u.pathname.startsWith('/vendor/')||u.pathname.startsWith('/_nuxt/'))}catch{return false}};
  function snapshot(url,body){
    let q={};try{const parsed=typeof body==='string'?JSON.parse(body):body;q=Array.isArray(parsed)?parsed[0]||{}:parsed||{}}catch{}
    const index=window.__COURSE_SNAPSHOTS__||{};
    if(/\/product\//.test(url)){try{const payload=typeof body==='string'?JSON.parse(body):body;const params=payload?.[1]||{};const method=url.split('/').pop().split('?')[0];return index.product?.[method+':'+(params.productNo||params.productLineNo)]||'/offline-api.json'}catch{return '/offline-api.json'}}
    if(q.contentCode){const slug=(q.id?q.id+'-':'')+q.contentCode;return index.article?.[slug]||index.content?.[q.contentCode]||'/offline-api.json'}
    if(q.resCode){if(/\/config\//.test(url)&&index.config?.[(q.projectCode||'jdwl')+':'+q.resCode])return index.config[(q.projectCode||'jdwl')+':'+q.resCode];const size=String(q.pageSize||10),page=String(q.index||1);return index.lists?.[q.resCode]?.[size]?.[page]||index.lists?.[q.resCode]?.['10']?.[page]||'/offline-api.json'}
    return '/offline-api.json';
  }
  window.fetch=(input,init)=>{const url=typeof input==='string'?input:input.url;return publicFile(url)?nativeFetch(input,init):nativeFetch(snapshot(url,init?.body),{cache:'no-store'})};
  const open=XMLHttpRequest.prototype.open,send=XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open=function(method,url,...args){this.__courseLocal=!publicFile(String(url));this.__courseUrl=String(url);this.__courseArgs=args;return open.call(this,this.__courseLocal?'GET':method,this.__courseLocal?'/offline-api.json':url,...args)};
  XMLHttpRequest.prototype.send=function(data){if(this.__courseLocal){const kind=this.responseType;open.call(this,'GET',snapshot(this.__courseUrl,data),...this.__courseArgs);this.responseType=kind}return send.call(this,this.__courseLocal?null:data)};
  navigator.sendBeacon=()=>false;
  window.sgm={config(){},init(){},report(){},error(){},custom(){},tag(){},on(){}};
  window.getEid=()=>'';window.getJdEid=()=>'';
  document.addEventListener('submit',e=>{if(e.target.closest('form')){e.preventDefault();e.stopImmediatePropagation();window.courseMessage?.('课程副本保留表单展示，未连接京东真实订单、账号或物流数据系统。')}},true);
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');if(!a||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||a.hasAttribute('data-course-source'))return;
    const href=a.getAttribute('href');
    if(/\/market-manager\/video\/(lyj|light-life|scj|xxj)\.mp4/.test(href||'')){e.preventDefault();e.stopImmediatePropagation();window.courseMessage?.('这条旧视频的原站链接返回 404，未能取得视频文件。');return}
    if(href?.startsWith('javascript:')){
      const pages={'首页':'/','京东服务':'/servicePlus/','最新资讯':'/news/list/','新闻公告':'/news/list/','航空业务合作':'/news/3313-content01394/','商家优惠通道':'/cms/?projectCode=jdwl&resCode=pos00034&contentType=2&needContentInfo=1','寄快递':'/send/sendSingleEntry/','查快递':'/orderSearch/','服务范围查询':'/serve-range/','服务细则':'/serviceDetails/','物流合作':'/ecology/cooperation/','ESG':'/esg/','碳足迹计算':'/carbonFootprint/','公司介绍':'/profile/','联系我们':'/contactUs/'};
      const target=pages[a.innerText.trim()];if(target){e.preventDefault();e.stopImmediatePropagation();location.assign(target)}return;
    }
    if(!href||href.startsWith(('#','mailto:','tel:')))return;
    const u=new URL(href,location.href);
    if(u.hostname==='lang.jdl.com'){const product=u.pathname.match(/^\/product\/(\d+)/);const ids=['106','110','92','95','93','107','108','99','104','103','111','109'];if(product&&ids.includes(product[1])){e.preventDefault();e.stopImmediatePropagation();location.assign('/technology-catalog/product/'+product[1]+'/');return}}
    if(/sso\.|plogin\.|passport\./.test(u.hostname)){e.preventDefault();e.stopImmediatePropagation();window.courseMessage?.('账号登录属于京东真实业务系统；课程副本不会收集账号或密码。');return}
    if(u.origin===location.origin){e.preventDefault();e.stopImmediatePropagation();const path=u.pathname.replace(/^\/news\/(\d+)\/(content\d+)\/?$/,'/news/$1-$2/');if(/^\/(en|hk)(\/|$)/.test(path)){window.open('https://www.jdl.com'+path+u.search+u.hash,'_blank','noopener');return}if(window.__COURSE_ROUTES__&&!window.__COURSE_ROUTES__.includes(path.replace(/\/$/,'')||'/')&&!publicFile(path)){window.courseMessage?.('此入口依赖京东真实账户或业务服务，不属于可独立迁移的公开内容页。课程副本不会收集账号、订单或支付信息。');return}location.assign(path+u.search+u.hash)}
  },true);
})();
