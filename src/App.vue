<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/"
        ><span class="brand-mark">剪</span>
        <div><strong>中国剪纸</strong><small>非遗数字文化可视化平台</small></div></RouterLink
      >
      <nav>
        <RouterLink to="/">全国总览</RouterLink><RouterLink to="/region">地域探索</RouterLink
        ><RouterLink to="/heritage">传承与流派</RouterLink
        ><RouterLink to="/creator"> 数字实验室 </RouterLink
        ><RouterLink to="/data-source">数据来源</RouterLink>
      </nav>
    </header>
    <RouterView />
    <footer class="site-footer">
      <span>Paper Cutting · Digital Heritage</span
      ><span>Vue 3 × TypeScript × ECharts × GeoJSON</span>
    </footer>
  </div>
</template>
