'use client'

import { useLanguage } from './LanguageContext'

type Strings = {
  header: {
    siteTitle: string
    login: string
    home: string
    about: string
    products: string
    events: string
    experts: string
    membership: string
    contact: string
    language: string
  }
  profileMenu: {
    dashboard: string
    profile: string
    signOut: string
  }
  banner: {
    title: string
    subtitle: string
  }
  introduction: {
    title: string
    body: string
  }
  product: {
    title: string
    cardTitle: (id: number) => string
    cardBody: string
  }
  footer: {
    text: string
  }
  loginPage: {
    title: string
  }
  profilePage: {
    title: string
  }
  aboutPage: {
    title: string
    body: string
  }
}

const en: Strings = {
  header: {
    siteTitle: 'Site Title',
    login: 'Login',
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    events: 'Events',
    experts: 'Experts',
    membership: 'Membership',
    contact: 'Contact Us',
    language: 'cn',
  },
  profileMenu: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    signOut: 'Sign out',
  },
  banner: {
    title: 'Welcome',
    subtitle: 'This is a placeholder banner.',
  },
  introduction: {
    title: 'Introduction',
    body: 'Placeholder introduction content for the template.',
  },
  product: {
    title: 'Products',
    cardTitle: (id: number) => `Product ${id}`,
    cardBody: 'Placeholder product description.',
  },
  footer: {
    text: 'Footer placeholder',
  },
  loginPage: {
    title: 'Login',
  },
  profilePage: {
    title: 'Profile',
  },
  aboutPage: {
    title: 'About Us',
    body: 'This is a placeholder About page for the template.',
  },
}

const zh: Strings = {
  header: {
    siteTitle: '站点标题',
    login: '登录',
    home: '首页',
    about: '关于我们',
    products: '产品',
    events: '活动',
    experts: '专家',
    membership: '会员',
    contact: '联系我们',
    language: 'en',
  },
  profileMenu: {
    dashboard: '仪表盘',
    profile: '个人信息',
    signOut: '退出登录',
  },
  banner: {
    title: '欢迎',
    subtitle: '这是一个占位横幅。',
  },
  introduction: {
    title: '简介',
    body: '模板的占位介绍内容。',
  },
  product: {
    title: '产品',
    cardTitle: (id: number) => `产品 ${id}`,
    cardBody: '占位产品描述。',
  },
  footer: {
    text: '页脚占位符',
  },
  loginPage: {
    title: '登录',
  },
  profilePage: {
    title: '个人信息',
  },
  aboutPage: {
    title: '关于我们',
    body: '这是模板的关于我们占位页面。',
  },
}

export function useI18n() {
  const { language } = useLanguage()
  return language === 'zh' ? zh : en
}


