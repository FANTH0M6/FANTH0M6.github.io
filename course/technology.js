(()=>{
  const dialog=document.createElement('dialog');dialog.className='course-dialog';dialog.innerHTML='<button type="button" aria-label="关闭">×</button><h2>课程复刻说明</h2><p>账号、注册和真实业务由京东系统提供，课程副本不收集账号或密码。</p>';document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
  document.querySelectorAll('[data-course-account]').forEach(button=>button.addEventListener('click',e=>{e.preventDefault();dialog.showModal()}));
  const id=location.pathname.match(/product\/(\d+)/)?.[1];
  fetch('/course/technology-gallery.json').then(r=>r.json()).then(all=>{
    const data=all[id];if(!data)return;
    const thumbs=Array.from(document.querySelectorAll('.thumbnail-item'));let selected=0;
    const display=document.querySelector('.product-display');
    function showImage(index){const image=data.images[index];if(!image||!display)return;selected=index;display.replaceChildren();const img=document.createElement('img');img.className='product-image';img.src=image.src;img.alt=image.alt;display.append(img);thumbs.forEach((t,i)=>{t.classList.toggle('active',i===index);t.setAttribute('aria-pressed',String(i===index))});document.querySelectorAll('.tab-button').forEach(b=>b.classList.toggle('active',b.textContent.trim()==='产品图片'))}
    thumbs.forEach((t,i)=>t.addEventListener('click',()=>showImage(i)));
    document.querySelectorAll('.nav-arrow').forEach(arrow=>{arrow.setAttribute('role','button');arrow.tabIndex=0;arrow.setAttribute('aria-label',arrow.classList.contains('right')?'下一张产品图片':'上一张产品图片');const act=()=>{const length=data.images.length;if(length)showImage((selected+(arrow.classList.contains('right')?1:-1)+length)%length);thumbs[selected]?.scrollIntoView({block:'nearest',inline:'nearest'})};arrow.onclick=act;arrow.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();act()}}});
    document.querySelectorAll('.tab-button').forEach(button=>{
      if(button.textContent.trim()==='产品图片')button.onclick=()=>showImage(selected);
      if(button.textContent.trim()==='产品视频'&&data.video){button.disabled=false;button.classList.remove('disabled');button.onclick=()=>{if(!display)return;const video=document.createElement('video');video.src=data.video;video.controls=true;video.autoplay=true;video.playsInline=true;video.className='product-image';display.replaceChildren(video);document.querySelectorAll('.tab-button').forEach(b=>b.classList.toggle('active',b===button))}}
    });
  });
  document.querySelectorAll('[title="回到顶部"],.back-to-top,.backtop').forEach(button=>button.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})));
})();
