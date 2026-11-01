(()=>{
  const dialog=document.createElement('dialog');dialog.className='course-dialog';dialog.innerHTML='<button type="button" aria-label="关闭">×</button><h2>课程复刻说明</h2><p role="status"></p><a href="https://www.jdl.com/" target="_blank" rel="noopener" data-course-source>前往京东物流官方网站 →</a>';
  document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
  window.courseMessage=text=>{dialog.querySelector('p').textContent=text;if(!dialog.open)dialog.showModal()};
  document.addEventListener('error',e=>{const media=e.target;if(media?.tagName==='VIDEO'&&/\/market-manager\/video\/(lyj|light-life|scj|xxj)\.mp4/.test(media.currentSrc||media.src||''))window.courseMessage('这条旧视频的原站链接返回 404，未能取得视频文件。')},true);
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
      area.innerHTML='<section class="course-unavailable"><h1></h1><p>此政策链接目前在官网显示“返回首页”，公开内容接口也没有返回正文。课程副本保留此入口并说明来源状态，不编造政策内容。</p><p><a href="/esg/">查看已收录的 ESG 内容 →</a></p></section>';
      area.querySelector('h1').textContent=policyTitle;document.title=policyTitle+'｜京东物流课程复刻';return true;
    };
    showUnavailable();const observer=new MutationObserver(showUnavailable);observer.observe(document.body,{childList:true,subtree:true});
  }
  // Preserve normal full-document navigation so every path also works after a
  // refresh, with static Nginx hosting and without a homepage catch-all route.
  document.querySelectorAll('a[href^="/vendor/"]').forEach(a=>{if(!/\.(pdf|mp4|mp3)(\?|$)/i.test(a.href))a.removeAttribute('target')});
  document.addEventListener('click',e=>{
    const button=e.target.closest('button,.el-button,.submit-btn,.query-btn');
    if(button&&/^(查[询件]?|查快递|立即查询|提交|提交订单|立即寄件|立即下单|登[录入])$/.test(button.innerText.trim())){e.preventDefault();e.stopImmediatePropagation();window.courseMessage('页面与操作入口已保留，实际物流结果、账号和订单需要京东业务系统，课程副本不提交这些业务请求。')}
  },true);
  const business=/^\/(network|unroute|aging-page|orderSearch|serve-range|serve-warehouse|send|tools)(\/|$)/.test(location.pathname);
  if(business){const note=document.createElement('div');note.className='course-business-note';note.textContent='课程展示：此页保留原界面与表单，实时物流、地图、运费和订单结果需由京东业务系统提供。';document.body.append(note)}
})();
