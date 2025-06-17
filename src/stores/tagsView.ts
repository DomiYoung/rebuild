import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export interface TagView {
  path: string
  name?: string | symbol
  title?: string
  meta: {
    title: string
    affix?: boolean
    [key: string]: any
  }
}

export const useTagsViewStore = defineStore('tagsView', () => {
  // 状态
  const visitedViews = ref<TagView[]>([])
  const cachedViews = ref<string[]>([])

  // 计算属性
  const affixTags = computed(() => {
    return visitedViews.value.filter(tag => tag.meta.affix)
  })

  // 添加标签
  const addView = (route: RouteLocationNormalized) => {
    addVisitedView(route)
    addCachedView(route)
  }

  const addVisitedView = (route: RouteLocationNormalized) => {
    if (visitedViews.value.some(v => v.path === route.path)) return
    
    const tag: TagView = {
      path: route.path,
      name: route.name,
      title: route.meta?.title || 'Untitled',
      meta: {
        title: route.meta?.title || 'Untitled',
        affix: route.meta?.affix || false,
        ...route.meta
      }
    }

    visitedViews.value.push(tag)
  }

  const addCachedView = (route: RouteLocationNormalized) => {
    if (route.name && typeof route.name === 'string') {
      if (cachedViews.value.includes(route.name)) return
      
      if (route.meta?.keepAlive !== false) {
        cachedViews.value.push(route.name)
      }
    }
  }

  // 删除标签
  const delView = (targetTag: TagView) => {
    delVisitedView(targetTag)
    delCachedView(targetTag)
  }

  const delVisitedView = (targetTag: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === targetTag.path)
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
  }

  const delCachedView = (targetTag: TagView) => {
    if (targetTag.name && typeof targetTag.name === 'string') {
      const index = cachedViews.value.indexOf(targetTag.name)
      if (index > -1) {
        cachedViews.value.splice(index, 1)
      }
    }
  }

  // 删除其他标签
  const delOthersViews = (targetTag: TagView) => {
    delOthersVisitedViews(targetTag)
    delOthersCachedViews(targetTag)
  }

  const delOthersVisitedViews = (targetTag: TagView) => {
    visitedViews.value = visitedViews.value.filter(v => {
      return v.meta.affix || v.path === targetTag.path
    })
  }

  const delOthersCachedViews = (targetTag: TagView) => {
    if (targetTag.name && typeof targetTag.name === 'string') {
      cachedViews.value = cachedViews.value.filter(name => name === targetTag.name)
    }
  }

  // 删除所有标签
  const delAllViews = () => {
    delAllVisitedViews()
    delAllCachedViews()
  }

  const delAllVisitedViews = () => {
    visitedViews.value = visitedViews.value.filter(tag => tag.meta.affix)
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
  }

  // 更新标签
  const updateVisitedView = (targetTag: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === targetTag.path)
    if (index > -1) {
      visitedViews.value[index] = { ...visitedViews.value[index], ...targetTag }
    }
  }

  // 初始化固定标签
  const initAffixTags = (routes: any[]) => {
    const affixRoutes = filterAffixTags(routes)
    affixRoutes.forEach(route => {
      if (route.name) {
        addVisitedView(route)
      }
    })
  }

  const filterAffixTags = (routes: any[], basePath = '/'): any[] => {
    let tags: any[] = []
    
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = basePath + route.path
        tags.push({
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      
      if (route.children) {
        const childTags = filterAffixTags(route.children, route.path + '/')
        tags = tags.concat(childTags)
      }
    })
    
    return tags
  }

  return {
    // 状态
    visitedViews,
    cachedViews,
    
    // 计算属性
    affixTags,
    
    // 方法
    addView,
    addVisitedView,
    addCachedView,
    delView,
    delVisitedView,
    delCachedView,
    delOthersViews,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView,
    initAffixTags
  }
}) 