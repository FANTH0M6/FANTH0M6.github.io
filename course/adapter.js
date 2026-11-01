(()=>{
  if(/^\/cms\/?$/.test(location.pathname)&&!new URLSearchParams(location.search).has('resCode')){
    const addCmsMenu=()=>{const area=document.querySelector('.cms-wrap');if(!area||area.querySelector('.course-cms-menu'))return;area.innerHTML='<section class="course-unavailable course-cms-menu"><h1>京东物流服务入口</h1><p><a href="/cms/?projectCode=jdwl&resCode=pos00044&contentType=2&needContentInfo=1">京东服务 →</a></p><p><a href="/cms/?projectCode=jdwl&resCode=pos00034&contentType=2&needContentInfo=1">商家优惠通道 →</a></p><p><a href="/cms/?projectCode=jdwl&resCode=pos00045&contentType=2&needContentInfo=1">商家极速签约 →</a></p></section>'};
    addCmsMenu();new MutationObserver(addCmsMenu).observe(document.body,{childList:true,subtree:true});
  }
  const unavailablePolicies={'/AtHrmPol':'反骚扰政策','/EnvPol':'环境管理政策','/HmRtPol':'人权与劳工权益政策','/OccHSPol':'职业健康与安全政策','/RsAIPol':'负责任人工智能政策','/StHdPol':'利益相关方政策'};
  const policyTitle=unavailablePolicies[location.pathname.replace(/\/$/,'')];
  if(policyTitle){
    const showUnavailable=()=>{
      const area=document.querySelector('.route-container > div');
      if(!area||area.querySelector('.course-unavailable'))return false;
      if(area.innerText.trim()!=='返回首页'&&!(area.classList.contains('cms-wrap')&&!area.innerText.trim()))return false;
      area.innerHTML='<section class="course-unavailable"><h1></h1><p>此政策链接目前在官网显示“返回首页”，公开内容接口也没有返回正文，这里不编造政策内容。</p><p><a href="/esg/">查看已收录的 ESG 内容 →</a></p></section>';
      area.querySelector('h1').textContent=policyTitle;document.title=policyTitle;return true;
    };
    showUnavailable();const observer=new MutationObserver(showUnavailable);observer.observe(document.body,{childList:true,subtree:true});
  }
  // Preserve normal full-document navigation so every path also works after a
  // refresh, with static hosting and without a homepage catch-all route.
  document.querySelectorAll('a[href^="/vendor/"]').forEach(a=>{if(!/\.(pdf|mp4|mp3)(\?|$)/i.test(a.href))a.removeAttribute('target')});
})();
