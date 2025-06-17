import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const sidebarCollapsed = ref(false)
  const showTagsView = ref(true)
  const theme = ref('light')
  const language = ref('zh-cn')

  // Actions
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebar_collapsed', String(sidebarCollapsed.value))
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed
    localStorage.setItem('sidebar_collapsed', String(collapsed))
  }

  const toggleTagsView = () => {
    showTagsView.value = !showTagsView.value
    localStorage.setItem('show_tags_view', String(showTagsView.value))
  }

  const setTagsView = (show: boolean) => {
    showTagsView.value = show
    localStorage.setItem('show_tags_view', String(show))
  }

  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const setLanguage = (lang: string) => {
    language.value = lang
    localStorage.setItem('language', lang)
  }

  const initAppSettings = () => {
    // 从本地存储恢复设置
    const storedCollapsed = localStorage.getItem('sidebar_collapsed')
    const storedTagsView = localStorage.getItem('show_tags_view')
    const storedTheme = localStorage.getItem('theme')
    const storedLanguage = localStorage.getItem('language')

    if (storedCollapsed !== null) {
      sidebarCollapsed.value = storedCollapsed === 'true'
    }
    if (storedTagsView !== null) {
      showTagsView.value = storedTagsView === 'true'
    }
    if (storedTheme) {
      theme.value = storedTheme
    }
    if (storedLanguage) {
      language.value = storedLanguage
    }
  }

  return {
    // 状态
    sidebarCollapsed,
    showTagsView,
    theme,
    language,

    // 方法
    toggleSidebar,
    setSidebarCollapsed,
    toggleTagsView,
    setTagsView,
    setTheme,
    setLanguage,
    initAppSettings
  }
}) 